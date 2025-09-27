// --- calculateTq.test.js ---

// Note: In a real environment, you would use a library like Jest/Mocha. 
// For this MVP, we use simple console assertions.
const calculateTq = require('./calculateTq'); // Assumes function is in a separate file

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        console.error(`❌ Test Failed: ${message}`);
        console.error(`    Expected: ${expected}`);
        console.error(`    Received: ${actual}`);
    } else {
        console.log(`✅ Test Passed: ${message}`);
    }
}

function assertThrows(fn, expectedErrorType, message) {
    let passed = false;
    try {
        fn();
    } catch (e) {
        if (e instanceof expectedErrorType) {
            passed = true;
        }
    }
    if (passed) {
        console.log(`✅ Test Passed: ${message}`);
    } else {
        console.error(`❌ Test Failed: ${message}`);
        console.error(`    Expected to throw ${expectedErrorType.name}`);
    }
}

console.log("--- Running TDD Engine Tests (Part 1) ---");

// TDD Requirement 3: Standard Even Path
assertEqual(
    calculateTq(6n, 3n), 
    3n, 
    "Standard Path (6n, 3n) -> 3n"
);

// TDD Requirement 3: Large Even Path (Ensuring BigInt usage)
const largeN = 9007199254740992n; // Max safe integer + 1n
assertEqual(
    calculateTq(largeN, 3n), 
    4503599627370496n, 
    "Large Number Test (Even Path)"
);

// TDD Requirement 3: Standard Odd Path
assertEqual(
    calculateTq(5n, 3n), 
    16n, 
    "Odd Path (5n, 3n) -> 16n"
);

// TDD Requirement 3: Generalized Odd Path Example
assertEqual(
    calculateTq(5n, 5n), 
    26n, 
    "Generalized Path (5n, 5n) -> 26n"
);

// Spec Requirement 5: Output Type (Testing for TypeError)
assertThrows(
    () => calculateTq(6, 3n), 
    TypeError, 
    "Input Validation (n as Number) throws TypeError"
);
assertThrows(
    () => calculateTq(6n, 3), 
    TypeError, 
    "Input Validation (q as Number) throws TypeError"
);

console.log("------------------------------------------");

// (You would run this file now and see all the tests fail! Then, you write the code.)
