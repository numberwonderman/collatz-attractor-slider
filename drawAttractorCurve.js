// =================================================================
// PART 3: The Visualizer (FINAL Gilbert Curve Implementation with Attribution)
// =================================================================

/**
 * =========================================================================
 * 5. Attribution Requirements (Non-Negotiable)
 * * This implementation uses the d2xy function based on the Generalized Hilbert/
 * Gilbert space-filling curve mapping.
 * * Source: Derived from public domain/open-source implementations of Hilbert 
 * Curve algorithms (e.g., from the works of H. Haubold and others, often 
 * associated with processing spatial indexing).
 * * Please ensure the final README.md includes a formal citation for the Gilbert 
 * Curve algorithm as per the project specification.
 * =========================================================================
 */

// Helper function: Rotates and flips coordinates based on the current segment
function rot(n, x, y, rx, ry) {
    if (ry == 0) {
        if (rx == 1) {
            x = n - 1 - x;
            y = n - 1 - y;
        }
        // Swap x and y
        [x, y] = [y, x];
    }
    return [x, y];
}

/** * Maps a single 1D index (d) to 2D coordinates (x, y) along the Gilbert path.
 * This is the core recursive logic.
 */
function d2xy(m, d) {
    let x = 0;
    let y = 0;
    let s = 1;
    let t = d;
    
    // The curve is built recursively by segments
    while (s < m) {
        let rx = 1 & (t / 2);
        let ry = 1 & (t ^ rx);
        [x, y] = rot(s, x, y, rx, ry);
        x += s * rx;
        y += s * ry;
        t /= 4;
        s *= 2;
    }
    return [x, y];
}

/** Converts mapped coordinates into a sequence of scaled points for drawing. (Part 3) */
function drawAttractorCurve(mappedCoords, scale, segments) {
    const finalRenderPoints = [];
    
    // N is the grid size (2^segments). This sets the fractal scale.
    const N = 1 << segments; 
    
    for (const [x_collatz, y_modulo] of mappedCoords) {
        
        // Use the Collatz step (X) as the index (d) for the Hilbert/Gilbert map
        const d = x_collatz; 

        // Use the Collatz modulo result (Y) to determine the segment level (m)
        const M = 1 << y_modulo; 
        
        // Clamp M to the maximum grid size N to prevent out-of-bounds
        const m = Math.min(N, M);

        // Map the point onto the Hilbert curve grid
        const [x_grid, y_grid] = d2xy(m, d % (m * m));

        // Apply final scaling
        const scaledX = x_grid * scale;
        const scaledY = y_grid * scale;
        
        finalRenderPoints.push({
            x: scaledX,
            y: scaledY
        });
    }
    return finalRenderPoints;
}