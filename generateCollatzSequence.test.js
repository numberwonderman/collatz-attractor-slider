// --- generateCollatzSequence.test.js ---

// Import the verified Tq function and the new Sequence function
const { deepEqual } = require('assert'); // Using Node's built-in assert for arrays
const calculateTq = require('./calculateTq');
const generateCollatzSequence = require('./generateCollatzSequence');

console.log("--- Running TDD Sequence Generator Tests (Part 1b) ---");

// Helper to check the array content is identical
function assertSequence(actual, expected, message) {
    try {
        deepEqual(actual, expected);
        console.log(`✅ Test Passed: ${message}`);
    } catch (e) {
        console.error(`❌ Test Failed: ${message}`);
        console.error(`    Expected sequence length: ${expected.length}`);
        console.error(`    Received sequence length: ${actual.length}`);
        console.error("    Error Details:", e.message);
    }
}

// ----------------------------------------------------------------------
// TDD Requirement 4: Test Cases

// 1. Standard Path (Convergence)
const expectedStandardSequence = [6n, 3n, 10n, 5n, 16n, 8n, 4n, 2n, 1n];
assertSequence(
    generateCollatzSequence(6n, 3n, 100),
    expectedStandardSequence,
    "Standard Path (3n+1) converges correctly to 1n"
);

// 2. Safety Limit
// Start at a known long sequence (27) but stop it after 5 steps
const expectedSafetySequence = [27n, 82n, 41n, 124n, 62n, 31n]; // 6 elements (start + 5 steps)
assertSequence(
    generateCollatzSequence(27n, 3n, 5),
    expectedSafetySequence,
    "Safety Limit (maxSteps) stops the sequence correctly"
);

// 3. Generalized Path (Verifying the 5n+1 rule start)
// Sequence for 5n+1 starting at 10: 10, 5, 26, 131, 656...
const expectedGeneralizedStart = [10n, 5n, 26n, 13n, 66n, 33n]; // 6 elements
assertSequence(
    generateCollatzSequence(10n, 5n, 5), // Stopping after 5 steps
    expectedGeneralizedStart,
    "Generalized Path (5n+1) logic is implemented correctly"
);

console.log("------------------------------------------");

// (You would run this now and see all the tests fail! Time to write the function.)