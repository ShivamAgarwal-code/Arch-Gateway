function addNumbers(params) {
    const { a, b } = params;
    return a + b;
}

// Expose the function to be executed by the server
mainFunction = addNumbers;
