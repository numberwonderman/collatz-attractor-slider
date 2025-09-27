Spec Kit: Part 3 - The Visualizer (Gilbert Curve)
This specification defines the contract for the final function that turns your mapped coordinates into p5.js drawing commands, including proper attribution.

1. Primary Goal
To convert the stream of [X, Y] coordinates (Part 2 output) into a list of p5.js rendering commands necessary to draw the Attractor curve using the space-filling Gilbert Curve algorithm.

2. Core Function Signature
The function MUST be exposed as:
function drawAttractorCurve(mappedCoords, scale, segments)

Parameter	Type	Required Constraint
mappedCoords	Number[][]	The array of [X, Y] coordinate pairs from the Mapper (Part 2).
scale	Number	The factor used to expand the visualization to fit the screen (e.g., 10).
segments	Number	The depth of the Gilbert Curve recursion.

Export to Sheets
3. Core Logic Requirements
The function MUST iterate through the mappedCoords and apply the Gilbert Curve's recursive logic to each point.

The function MUST return a final array of simple JavaScript objects, where each object represents a rendering command (e.g., drawing a line segment).

The coordinates MUST be multiplied by the scale factor to be ready for the p5.js canvas.

4. TDD Requirements (Non-Negotiable)
The output MUST be an array of simple JavaScript objects (e.g., { x: 10, y: 20 }), not drawing commands themselves.

The tests MUST verify the Gilbert Curve's initial mapping: a simple set of coordinates must be correctly translated by the Gilbert curve logic into a sequence of points.

5. Attribution Requirements (Non-Negotiable)
The final drawAttractorCurve function file MUST include a comment block citing the original authors/creators of the Gilbert Curve implementation used.

The main README.md for the Collatz Attractor Slider repository MUST include a "References" section with a citation for the Gilbert Curve algorithm.