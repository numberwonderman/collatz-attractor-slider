
Spec Kit: Part 1b - The Sequence Generator
This specification defines the function that uses your verified calculateTq function to generate the entire Collatz sequence.

1. Primary Goal
To generate the full sequence of BigInts for the generalized Collatz map until the sequence converges (or hits a defined safety limit), using the stable calculateTq engine.

2. Core Function Signature
The function MUST be exposed as:
function generateCollatzSequence(startN, q, maxSteps)

Parameter	Type	Required Constraint
startN	BigInt	The starting value for the sequence.
q	BigInt	The odd factor in the rule (e.g., 3n).
maxSteps	Number	A safety limit to prevent infinite loops (e.g., 1000).

Export to Sheets
3. Core Logic Requirements
The function MUST use a loop that calls the verified calculateTq(n, q) function on each iteration.

The sequence MUST stop when the current term n equals 1n (convergence to the trivial cycle).

The sequence MUST stop if the number of steps exceeds maxSteps.

4. TDD Requirements (Non-Negotiable)
The output MUST be an array of BigInts.

MUST include a test suite that verifies the sequence is correct.

The tests MUST cover:

Standard Path (Convergence): generateCollatzSequence(6n, 3n, 100) MUST return [6n, 3n, 10n, 5n, 16n, 8n, 4n, 2n, 1n]

Generalized Path: generateCollatzSequence(10n, 5n, 100) MUST stop at the known cycle for 5n+1.

Safety Limit: A test to confirm the function stops and returns a partial sequence when maxSteps is exceeded.