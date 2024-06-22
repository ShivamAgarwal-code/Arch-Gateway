const { queryPromise } = require('./maria');

async function createTable(connection) {
    const createRequestsTableSql = `
        CREATE TABLE
            IF NOT EXISTS requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                uri TEXT NOT NULL,
                params TEXT NOT NULL,
                timestamp BIGINT NOT NULL,
                deadline BIGINT NOT NULL,
                seed VARCHAR(64) NOT NULL,
                max_retries INT DEFAULT 10,
                tx TEXT
            );
    `;
    const createNodesTableSql = `
    CREATE TABLE
        IF NOT EXISTS nodes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            public_key TEXT NOT NULL
        );
    `;
    const createResultsTableSql = `
    CREATE TABLE
        IF NOT EXISTS results (
            id INT AUTO_INCREMENT PRIMARY KEY,
            request_id INT,
            node_id INT,
            timestamp BIGINT NOT NULL,
            hash TEXT NOT NULL,
            proof TEXT NOT NULL,
            result TEXT NOT NULL,
            sig TEXT NOT NULL,
            FOREIGN KEY (request_id) REFERENCES requests(id),
            FOREIGN KEY (node_id) REFERENCES nodes(id),
            tx TEXT,
            success BOOLEAN DEFAULT FALSE
        );
    `;

    try {
        await queryPromise(connection, createRequestsTableSql);
        await queryPromise(connection, createNodesTableSql);
        await queryPromise(connection, createResultsTableSql);
    } catch (error) {
        console.error(error);
        throw error;
    }
    // console.log('Table checked/created');
}

async function saveRequest(connection, state) {
    const sql = `
        INSERT INTO requests
            (
                uri,
                params,
                timestamp,
                deadline,
                seed,
                tx,
                max_retries
            )
        VALUES
            (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        state.uri,
        state.params,
        state.timestamp,
        state.deadline,
        state.seed,
        state.tx || null,
        state.max_retries || 10,
    ];

    try {
        const { results, fields } = await queryPromise(connection, sql, values);
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
    // console.log('Row inserted');
}

async function saveNodes(connection, state) {
    const sql = `
        INSERT INTO nodes
            (
                public_key
            )
        VALUES
            (?)
    `;

    const values = [
        state.public_key
    ];

    try {
        const { results, fields } = await queryPromise(connection, sql, values);
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
    // console.log('Row inserted');
}

async function saveResults(connection, state) {
    const sql = `
        INSERT INTO results
            (
                request_id,
                node_id,
                timestamp,
                hash,
                proof,
                result,
                sig,
                tx,
                success
            )
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        state.request_id,
        state.node_id,
        state.timestamp,
        state.hash,
        state.proof,
        state.result,
        state.sig,
        state.tx || null,
        state.success || false
    ];

    try {
        const { results, fields } = await queryPromise(connection, sql, values);
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
    // console.log('Row inserted');
}

async function reduceRetries(connection, id) {
    const sql = `
        UPDATE requests
        SET max_retries = max_retries - 1
        WHERE id = ?;
    `;

    const values = [id];

    try {
        const { results, fields } = await queryPromise(connection, sql, values);
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getRequestsToRun(connection, nodeId) {
    const sql = `
        SELECT r.* 
        FROM requests r
        WHERE r.deadline > UNIX_TIMESTAMP() AND r.max_retries > 0
        AND NOT EXISTS (
            SELECT 1
            FROM results
            WHERE results.request_id = r.id
        );
    `;

    // TODO: tasks for a specific node
    const values = [nodeId];

    try {
        const { results, fields } = await queryPromise(connection, sql, values);
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getRequestStatus(connection, id) {
    // const successSql = `
    //     SELECT COUNT(*) AS success_count
    //     FROM results
    //     WHERE results.request_id = ?    
    // `;
    // const successValues = [id];

    // const pendingSql = `
    //     SELECT r.id
    //     FROM requests r
    //     WHERE r.id = ?
    //     AND r.max_retries > 0
    //     AND NOT EXISTS (
    //         SELECT 1
    //         FROM results
    //         WHERE results.request_id = r.id
    //     );    
    // `;
    // const pendingValues = [id];

    // const failSql = `
    //     SELECT r.id
    //     FROM requests r
    //     WHERE r.id = ?
    //     AND r.max_retries = 0
    //     AND NOT EXISTS (
    //         SELECT 1
    //         FROM results
    //         WHERE results.request_id = r.id
    //     );
    // `;
    // const failValues = [id];

    const sql = `
        SELECT 
            r.id,
            CASE
                WHEN r.max_retries > 0 AND NOT EXISTS (SELECT 1 FROM results WHERE results.request_id = r.id) THEN 'pending'
                WHEN r.max_retries = 0 AND NOT EXISTS (SELECT 1 FROM results WHERE results.request_id = r.id) THEN 'fail'
                WHEN EXISTS (SELECT 1 FROM results WHERE results.request_id = r.id) THEN 'success'
            END AS status
        FROM requests r
        WHERE r.id = ?
    `;

    const values = [id];

    try {
        const { results, fields } = await queryPromise(connection, sql, values);
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getIdsToPublish(connection, quorum) {
    // const sql = `
    //     SELECT id
    //     FROM requests
    //     WHERE tx IS NULL AND id IN (
    //         SELECT request_id
    //         FROM results
    //         WHERE (
    //             SELECT
    //                 COUNT(DISTINCT node_id)
    //             FROM
    //                 results AS inner_results
    //             WHERE
    //                 inner_results.request_id = results.request_id
    //         ) > ?
    //         AND EXISTS (
    //             SELECT 1
    //             FROM nodes
    //             WHERE
    //                 nodes.id = results.node_id
    //         )
    //         GROUP BY request_id
    //         HAVING
    //             MAX(timestamp) <= (
    //                 SELECT
    //                     deadline
    //                 FROM
    //                     requests AS inner_requests
    //                 WHERE
    //                     inner_requests.id = results.request_id
    //             )
    //     );
    // `;
    const sql = `
        SELECT r.id
        FROM requests r
        LEFT JOIN (
            SELECT 
                request_id, 
                MAX(timestamp) AS max_timestamp
            FROM results
            GROUP BY request_id
        ) AS res_max ON r.id = res_max.request_id
        LEFT JOIN (
            SELECT 
                request_id, 
                COUNT(DISTINCT node_id) AS distinct_nodes
            FROM results
            GROUP BY request_id
        ) AS res_count ON r.id = res_count.request_id
        WHERE r.tx IS NULL 
        AND r.max_retries > 0 
        AND res_count.distinct_nodes >= ?
        AND res_max.max_timestamp <= r.deadline
        AND EXISTS (
            SELECT 1
            FROM results
            JOIN nodes ON results.node_id = nodes.id
            WHERE results.request_id = r.id
        );
    `;

    const values = [quorum];

    try {
        const { results, fields } = await queryPromise(connection, sql, values);
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getResultsById(connection, id) {
    const sql = `
        SELECT results.*, nodes.public_key, requests.seed
        FROM results
        JOIN nodes ON results.node_id = nodes.id
        JOIN requests ON results.request_id = requests.id
        WHERE results.request_id = ?;
    `;

    const values = [id];

    try {
        const { results, fields } = await queryPromise(connection, sql, values);
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function setRequestTxById(connection, tx, id) {
    const sql = `
        UPDATE requests
        SET tx = ?
        WHERE id = ?;
    `;

    const values = [tx, id];

    try {
        const { results, fields } = await queryPromise(connection, sql, values);
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function setResultTxById(connection, tx, id) {
    const sql = `
        UPDATE results
        SET tx = ?
        WHERE id = ?;
    `;

    const values = [tx, id];

    try {
        const { results, fields } = await queryPromise(connection, sql, values);
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function setSuccessTxById(connection, success, id) {
    const sql = `
        UPDATE results
        SET success = ?
        WHERE id = ?;
    `;

    const values = [success, id];

    try {
        const { results, fields } = await queryPromise(connection, sql, values);
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

module.exports = {
    createTable,
    saveRequest,
    saveNodes,
    saveResults,
    getRequestsToRun,
    getIdsToPublish,
    getResultsById,
    setRequestTxById,
    setResultTxById,
    setSuccessTxById,
    reduceRetries,
    getRequestStatus
};
