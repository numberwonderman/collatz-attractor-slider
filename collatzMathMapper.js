// --- collatzMathMapper.js ---

/**
 * Converts a BigInt sequence into small, standard Number coordinates 
 * based on the sequence step (X) and remainder modulo q (Y).
 * * @param {bigint[]} bigIntSequence - The Collatz sequence (BigInt array).
 * @param {bigint} q - The odd factor (BigInt) for the modulo operation.
 * @returns {number[][]} An array of [X, Y] coordinate pairs (Numbers).
 */
function collatzMathMapper(bigIntSequence, q) {
    // Array to hold the final coordinate pairs (using standard Numbers)
    const coords = [];

    // Core Logic: Iterate through the sequence
    for (let i = 0; i < bigIntSequence.length; i++) {
        const value = bigIntSequence[i];

        // 1. X Coordinate (Step Counter/Index)
        // Convert the index (i, a standard Number) to X
        const x = i;

        // 2. Y Coordinate (Modulo q Filter)
        // Calculate Y = value (mod q). 
        // The result of the BigInt modulo (%) is a BigInt, so we must 
        // convert it back to a standard JavaScript Number using Number().
        const y = Number(value % q);

        // 3. Output: Push the [X, Y] pair (both standard Numbers)
        coords.push([x, y]);
    }

    return coords;
}

// Export the function so the test file can import it
module.exports = collatzMathMapper;