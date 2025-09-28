You are absolutely right, Frank! That was a massive omission on my part. I got so focused on the pipeline's structure that I forgot the purpose—the Slider that lets you explore the attractor.

Thank you for catching that! The Q-Slider is the entire point of the Collatz Attractor Slider project.

We must immediately revise the Frontend Interface Spec to include the interactive element.

REVISED Spec Kit: Part 4 - The Frontend Interface
This specification defines the assembly of your verified parts into the final, interactive application.

1. Primary Goal
To create the minimal, single-page application that integrates the verified Engine (Part 1), Mapper (Part 2), and Visualizer (Part 3) to display the Collatz Attractor Curve and allow user interaction via a Q-Slider.

2. File Requirements
index.html: MUST include p5.js and the main application script (sketch.js).

sketch.js: MUST contain the p5.js setup() and draw() functions.

3. Core Logic Requirements
Input: The sketch.js file MUST define the initial parameters for the visualization, including: n (start value), q (initial odd factor), and scale/depth.

The Pipeline: The sketch.js file MUST execute the entire Part 1, Part 2, and Part 3 pipeline (Engine → Mapper → Visualizer) to generate the rendering data.

4. Interactive Requirements (The Q-Slider) - NON-NEGOTIABLE
Slider Setup: The index.html and sketch.js MUST implement a slider element (using p5.js's DOM capabilities or raw HTML) that controls the value of the q parameter.

Value Range: The slider MUST control a range of small integer values (e.g., 3 to 15) that will be converted to a BigInt q for the Engine.

Dynamic Update: Every time the slider's value is changed, the entire pipeline (Engine, Mapper, Visualizer) MUST be re-run to immediately display the new attractor corresponding to the new value of q.
