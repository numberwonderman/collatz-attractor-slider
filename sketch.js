// --- FINAL DEFINITIVE sketch.js ---

// =================================================================
// PART 1, 2, 3: ENGINE, MAPPER, VISUALIZER LOGIC (Top for Correct Scope)
// =================================================================

// 1. ENGINE LOGIC (calculateTq - TDD Verified)
function calculateTq(n, q) {
    if (typeof n !== 'bigint' || typeof q !== 'bigint') {
        throw new TypeError("Inputs 'n' and 'q' must be BigInt types for precision.");
    }
    return (n % 2n === 0n) ? (n / 2n) : ((q * n) + 1n);
}

// 2. ENGINE LOGIC (generateCollatzSequence - TDD Verified)
function generateCollatzSequence(startN, q, maxSteps) {
    const sequence = [startN];
    let n = startN;
    let steps = 0;
    while (n !== 1n && steps < maxSteps) {
        try {
            n = calculateTq(n, q);
        } catch (e) {
            break; 
        }
        sequence.push(n);
        steps++;
    }
    return sequence;
}

// 3. MAPPER LOGIC (collatzMathMapper - TDD Verified)
function collatzMathMapper(bigIntSequence, q) {
    const coords = [];
    for (let i = 0; i < bigIntSequence.length; i++) {
        const value = bigIntSequence[i];
        const x = i;
        const y = Number(value % q);
        coords.push([x, y]);
    }
    return coords;
}

// 4. VISUALIZER LOGIC (Gilbert Curve and Helpers)

// Helper: Rotates and flips coordinates
function rot(n, x, y, rx, ry) {
    if (ry == 0) {
        if (rx == 1) {
            x = n - 1 - x;
            y = n - 1 - y;
        }
        [x, y] = [y, x];
    }
    return [x, y];
}

// Helper: Maps 1D index (d) to 2D Hilbert/Gilbert coordinates (x, y)
function d2xy(m, d) {
    let x = 0;
    let y = 0;
    let s = 1;
    let t = d;
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

/**
 * =========================================================================
 * 5. Attribution Requirements (Non-Negotiable)
 * * This implementation uses the d2xy function based on the Generalized Hilbert/
 * Gilbert space-filling curve mapping.
 * * Please ensure the final README.md includes a formal citation for the Gilbert 
 * Curve algorithm as per the project specification.
 * =========================================================================
 */

/** Converts mapped coordinates into a sequence of scaled points for drawing. (Part 3) */
function drawAttractorCurve(mappedCoords, scale, segments) {
    const finalRenderPoints = [];
    
    const N = 1 << segments; 
    const max_d = N * N; // Max number of points that can fit in the fractal grid
    const m = N; // Set the segment size m to the fixed grid size N
    
    for (const [x_collatz, y_modulo] of mappedCoords) {
        
        // FINAL CRITICAL FIX: The index 'd' MUST be constrained by the size of the fractal grid (N*N)
        const d = x_collatz % max_d; 

        // Map the point onto the Hilbert curve grid
        const [x_grid, y_grid] = d2xy(m, d);

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


// =================================================================
// PART 4: INTERFACE VARIABLES AND CORE PIPELINE FUNCTION
// =================================================================

let qSlider;
let qValueDisplay;
let updateButton; 
let renderPoints = [];
let currentQ = 3; 

// Final Parameters
const START_N = 1000n; 
const MAX_STEPS = 5000;
const SCALE_FACTOR = 15; 
const SEGMENT_DEPTH = 8; // FINAL OPTIMIZATION: Set for optimal screen-fill (2^8 = 256x256 grid)
const CANVAS_SIZE = 800; 

// The Full Pipeline Execution
function runFullPipeline() {
    console.log("PIPELINE RUNNING...");
    
    currentQ = parseInt(qSlider.value());
    qValueDisplay.html(`Q=${currentQ}`);

    const qBigInt = BigInt(qSlider.value());
    
    // EXECUTE THE PIPELINE:
    const sequence = generateCollatzSequence(START_N, qBigInt, MAX_STEPS);
    console.log(`Pipeline Step 1 (Engine): Sequence length: ${sequence.length}`);
    
    const coords = collatzMathMapper(sequence, qBigInt);
    
    renderPoints = drawAttractorCurve(coords, SCALE_FACTOR, SEGMENT_DEPTH);

    console.log(`Pipeline Complete. Rendering Q=${currentQ} with ${renderPoints.length} points.`);
    redraw(); 
}

// =================================================================
// P5.JS SETUP AND DRAW FUNCTIONS (Bottom of File)
// =================================================================

function setup() {
    const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    canvas.parent('canvas-container'); 

    qSlider = select('#q-slider');
    qValueDisplay = select('#q-value');
    updateButton = select('#update-button'); 

    // Robust event listeners (Slider and Button)
    qSlider.elt.addEventListener('input', qSliderChanged);
    updateButton.elt.addEventListener('click', qSliderChanged); 
    
    console.log("SETUP COMPLETE: Initializing pipeline.");
    runFullPipeline(); 
}

function draw() {
    background(26); 
    stroke(255, 150); 
    strokeWeight(1); 
    noFill();

    if (renderPoints.length > 1) {
        beginShape();
        for (const point of renderPoints) {
            vertex(point.x + width / 2, point.y + height / 2); 
        }
        endShape();
    }
}

// Helper Function: Triggered by the slider input or button click
function qSliderChanged() {
    console.log("EVENT TRIGGERED: Slider or Button activated. Re-running pipeline.");
    runFullPipeline();
}