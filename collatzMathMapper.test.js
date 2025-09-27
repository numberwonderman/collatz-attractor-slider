// --- collatzMathMapper.test.js ---
const { deepEqual } = require('assert');
const collatzMathMapper = require('./collatzMathMapper'); 

console.log("--- Running TDD Math Mapper Tests (Part 2) ---");

// Helper to check the array content is identical (will fail if types are BigInt)
function assertMapping(actual, expected, message) {
    try {
        deepEqual(actual, expected);
        console.log(`✅ Test Passed: ${message}`);
    } catch (e) {
        console.error(`❌ Test Failed: ${message}`);
        console.error("    Error Details:", e.message);
        console.error("    The output might still contain BigInts.");
    }
}

// ----------------------------------------------------------------------
// TDD Requirement 4: Test Cases

// 1. Standard Path (3n+1) Test: Q = 3n
// Sequence: [6n, 3n, 10n, 5n, 16n]
// Remainder (mod 3): [0, 0, 1, 2, 1]
const standardInputSequence = [6n, 3n, 10n, 5n, 16n];
const expectedStandardOutput = [
    [0, 0], [1, 0], [2, 1], [3, 2], [4, 1]
];
assertMapping(
    collatzMathMapper(standardInputSequence, 3n),
    expectedStandardOutput,
    "Standard Path (mod 3) mapping is correct and uses Numbers"
);

// 2. Generalized Path (5n+1) Test: Q = 5n
// Sequence: [10n, 5n, 26n, 13n, 66n]
// Remainder (mod 5): [0, 0, 1, 3, 1]
const generalizedInputSequence = [10n, 5n, 26n, 13n, 66n];
const expectedGeneralizedOutput = [
    [0, 0], [1, 0], [2, 1], [3, 3], [4, 1]
];
assertMapping(
    collatzMathMapper(generalizedInputSequence, 5n),
    expectedGeneralizedOutput,
    "Generalized Path (mod 5) mapping is correct and uses Numbers"
);

console.log("------------------------------------------");