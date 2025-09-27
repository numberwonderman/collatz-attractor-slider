// --- drawAttractorCurve.test.js ---
const { deepEqual } = require('assert');
const drawAttractorCurve = require('./drawAttractorCurve'); 

console.log("--- Running TDD Visualizer Tests (Part 3) ---");

// Helper to check the array content is identical (will fail if output isn't simple objects)
function assertRenderingOutput(actual, expected, message) {
    try {
        deepEqual(actual, expected);
        console.log(`✅ Test Passed: ${message}`);
    } catch (e) {
        console.error(`❌ Test Failed: ${message}`);
        console.error("    Error Details:", e.message);
        console.error("    The output structure or scaling is incorrect.");
    }
}

// ----------------------------------------------------------------------
// TDD Requirement 4: Test Cases

// Input: A simple 3-point sequence from the Mapper
const inputCoords = [[0, 0], [1, 1], [2, 0]]; 
const testScale = 10;
const testSegments = 2; // Low recursion depth for simple test

// Expected Output (Simplified Gilbert/Hilbert-style mapping logic):
// This verifies that the function processes the coordinates and applies the scale.
// The complexity of the full fractal is abstracted, but the TDD confirms the API contract.
const expectedOutput = [
    { x: 0, y: 0 },
    { x: 10, y: 10 },
    { x: 20, y: 0 }
    // A full Gilbert curve would generate many more points, 
    // but this verifies the core loop, mapping, and scaling.
];

assertRenderingOutput(
    drawAttractorCurve(inputCoords, testScale, testSegments),
    expectedOutput,
    "Gilbert Curve mapping correctly applies scale and outputs objects"
);

console.log("------------------------------------------");