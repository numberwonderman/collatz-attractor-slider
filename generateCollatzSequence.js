// --- generateCollatzSequence.js ---

// Import the function from the previously verified file
const calculateTq = require('./calculateTq');

/**
 * Generates the full sequence of BigInts for the generalized Collatz map.
 * @param {bigint} startN - The starting value.
 * @param {bigint} q - The odd factor.
 * @param {number} maxSteps - Safety limit (stops after maxSteps iterations).
 * @returns {bigint[]} The full sequence as an array of BigInts.
 */
function generateCollatzSequence(startN, q, maxSteps) {
    // 1. Initialize sequence with the starting value (BigInt array output)
    const sequence = [startN];
    let n = startN;
    let steps = 0;

    // 2. Main loop logic
    // Loop continues as long as n has not converged to 1n
    // AND the safety limit has not been hit.
    while (n !== 1n && steps < maxSteps) {
        
        // 3. Call the verified engine
        try {
            n = calculateTq(n, q);
        } catch (e) {
            // Handle TypeErrors from the engine (shouldn't happen here, but safe)
            console.error("Engine calculation failed:", e.message);
            break;
        }

        // Add the new number and increment step count
        sequence.push(n);
        steps++;
    }

    // Return the final array of BigInts
    return sequence;
}

// Export the function so the test file can import it
module.exports = generateCollatzSequence;