function calculateCircleArea(params) {
    const { radius } = params;
    const area = Math.PI * Math.pow(radius, 2);
    return area;
}

// Expose the function to be executed by the server
mainFunction = calculateCircleArea;
