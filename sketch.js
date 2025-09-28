// --- sketch.js ---

// Import all verified modules (assuming they are in the same directory)
const { generateCollatzSequence } = require('./generateCollatzSequence');
const { collatzMathMapper } = require('./collatzMathMapper');
const { drawAttractorCurve } = require('./drawAttractorCurve');


// =================================================================
// 3. Core Logic Requirements: Initial Parameters
// =================================================================
let qSlider;
let qValueDisplay;
let renderPoints = [];
let currentQ = 3; 

// Parameters for the visualization
const START_N = 1000n; // Use a reasonable starting BigInt
const MAX_STEPS = 5000;
const SCALE_FACTOR = 15;
const SEGMENT_DEPTH = 3; // For the Gilbert Curve complexity


// =================================================================
// P5.js Setup
// =================================================================
function setup() {
    // 2. File Requirements: setup() function
    const canvas = createCanvas(800, 800);
    canvas.parent('canvas-container'); // Attach canvas to the container

    // 4. Interactive Requirements: Slider Setup
    qSlider = select('#q-slider');
    qValueDisplay = select('#q-value');

    // Attach the dynamic update function to the slider's input event
    qSlider.input(runFullPipeline);
    
    // Run the pipeline once to draw the initial state
    runFullPipeline(); 
}

// P5.js Draw Loop (renders the pre-calculated points)
function draw() {
    background(26); // Dark background
    noFill();
    stroke(255, 150); // White stroke

    // 3. Core Logic: Rendering
    if (renderPoints.length > 1) {
        beginShape();
        for (const point of renderPoints) {
            // Draw the line segments based on the rendered points
            vertex(point.x + width / 2, point.y + height / 2); // Center the visualization
        }
        endShape();
    }
}

// =================================================================
// The Full Pipeline Execution
// =================================================================
function runFullPipeline() {
    // 4. Interactive Requirements: Dynamic Update (Get new Q value)
    currentQ = parseInt(qSlider.value());
    qValueDisplay.html(`Q=${currentQ}`);

    // Convert the slider Number to a BigInt Q for the engine
    const qBigInt = BigInt(currentQ);
    
    console.log(`Running pipeline for Q=${currentQ}`);

    // Step 1: Engine (Part 1)
    const sequence = generateCollatzSequence(START_N, qBigInt, MAX_STEPS);
    
    // Step 2: Mapper (Part 2)
    const coords = collatzMathMapper(sequence, qBigInt);

    // Step 3: Visualizer (Part 3)
    // NOTE: The Visualizer needs the full Gilbert logic implemented
    // The current version only does scaling.
    renderPoints = drawAttractorCurve(coords, SCALE_FACTOR, SEGMENT_DEPTH);

    // Redraw the canvas immediately with the new data
    redraw(); 
}

// NOTE: We need these placeholder functions to avoid errors when importing
// the modules via `require` in the Node environment. 
// For a simple browser use case, these may need adjustment if you aren't using 
// a module bundler like Webpack (e.g., using <script type="module">).
// For simplicity in a Codespace, we assume the Node module system is used.
