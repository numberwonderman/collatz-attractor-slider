// --- calculateTq.js ---

/**
 * Calculates the next term in the Generalized Collatz sequence (T_f_q).
 * Adheres strictly to BigInt usage for precision.
 * * @param {bigint} n - The current term in the sequence.
 * @param {bigint} q - The multiplier for the odd case (e.g., 3n).
 * @returns {bigint} The next term in the sequence.
 * @throws {TypeError} If either n or q is not a BigInt.
 */
function calculateTq(n, q) {
    // Spec Requirement 5: Output Type - Input Validation
    if (typeof n !== 'bigint' || typeof q !== 'bigint') {
        throw new TypeError("Inputs 'n' and 'q' must be BigInt types for precision.");
    }

    // Spec Requirement 3: Core Logic (The Collatz Rule)
    // Check if n is even (using BigInt's modulo operator)
    if (n % 2n === 0n) {
        // IF n is even: return n / 2n
        return n / 2n;
    } else {
        // IF n is odd: return q * n + 1n
        return (q * n) + 1n;
    }
}

// Export the function so the test file can import it
module.exports = calculateTq;
