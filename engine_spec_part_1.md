# Spec Kit: Part 1 - TDD and BigInt Enhanced Engine

## 1. Primary Goal
To create a single, pure JavaScript function that calculates the next term in the Generalized Collatz sequence, ensuring mathematical accuracy for numbers exceeding 2^53.

## 2. Core Function Signature
The function MUST be exposed as:
`function calculateTq(n, q)`

| Parameter | Type | Required Constraint |
| :--- | :--- | :--- |
| `n` | BigInt | The current term in the sequence. |
| `q` | BigInt | The odd factor in the rule (e.g., 3n for the standard 3n+1). |

## 3. Core Logic (The Collatz Rule)
The function MUST return the result of the following:

- IF `n` is **even**: return `n / 2n`
- IF `n` is **odd**: return `q * n + 1n`

## 4. TDD Requirements (Non-Negotiable)
1.  All input and output must be treated as **BigInt** primitives (`n` suffix).
2.  MUST include a test suite that verifies the logic using **BigInt** literals.
3.  The tests MUST cover:
    - **Standard Path:** `calculateTq(6n, 3n)` MUST return `3n`
    - **Large Number:** `calculateTq(9007199254740992n, 3n)` MUST return `4503599627370496n`
    - **Odd Path (Standard):** `calculateTq(5n, 3n)` MUST return `16n`
    - **Odd Path (Generalized Example):** `calculateTq(5n, 5n)` MUST return `26n`

## 5. Output Type
MUST throw a **TypeError** if inputs are standard `Number` types instead of `BigInt` (due to the safety constraint).
