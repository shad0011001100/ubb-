---
name: code-efficiency-optimizer
version: 1.1.0
description: A comprehensive automated skill that scans workspace files, evaluates time and space complexity, identifies execution bottlenecks, and executes safe, non-breaking performance refactorings.
commands:
  - analyze performance
  - optimize code
  - profile workspace
parameters:
  - name: target_path
    type: string
    description: The specific file or directory to analyze. Defaults to the current working directory.
  - name: strict_api_preservation
    type: boolean
    description: If true, absolutely no changes will be made to public function signatures or exported modules. Defaults to true.
---

# Code Efficiency & Performance Protocol

When this skill is activated, you must strictly adhere to the following execution phases. Do not skip any steps.

## Phase 1: Discovery & Profiling
1. **Environment Assessment:** Identify the primary programming languages and frameworks used in the target directory.
2. **Dynamic Profiling:** Execute language-appropriate local profiling tools in the workspace terminal (e.g., `cProfile` for Python, `node --prof` for JavaScript, `pprof` for Go) to capture baseline CPU and memory usage.
3. **Static Analysis:** Scan the codebase for common performance pitfalls, including:
   - Deeply nested loops resulting in O(N^2) or worse time complexity.
   - Suboptimal data structure choices (e.g., using arrays for frequent lookups instead of hash maps).
   - Redundant API calls, repeated database queries (N+1 problem), or excessive file I/O.
   - Memory leaks or unreleased resources.

## Phase 2: Analysis & Planning
1. **Draft Implementation Plan:** Before modifying any code, output a brief markdown report detailing the findings. 
2. **Categorize Bottlenecks:** Label each found issue with its severity (High, Medium, Low) and its current vs. expected Big-O complexity.
3. **Propose Solutions:** Outline the specific refactoring strategy for each bottleneck (e.g., "Implement memoization", "Switch from List to Set", "Implement lazy loading").
4. **Wait for Approval (Optional):** If the environment permits user interaction, pause for the user to approve the plan. If running fully autonomously, proceed to Phase 3.

## Phase 3: Execution & Refactoring
1. **Strict Contract Adherence:** Apply the performance adjustments without altering any public-facing APIs, class signatures, or return types.
2. **Atomic Commits/Changes:** Apply changes module by module to isolate variables.
3. **Inline Documentation:** Add brief comments explaining *why* a complex optimization was made (e.g., `// Optimized to O(1) lookup using HashMap to prevent bottleneck on large datasets`).

## Phase 4: Validation & Regression
1. **Test Execution:** Auto-execute the existing test suite using the workspace terminal (e.g., `npm test`, `pytest`, `cargo test`). 
2. **Regression Check:** Ensure 100% of previously passing tests still pass. If any test fails, automatically revert the specific change that caused the failure and document the conflict.
3. **Benchmark Comparison:** Run the profiler a second time on the optimized code.
4. **Final Report:** Generate a final summary comparing the initial performance metrics against the post-optimization metrics, highlighting execution time saved and memory reduced.

## Constraints & Fallbacks
- **Never** sacrifice code readability for micro-optimizations (e.g., saving milliseconds at the cost of highly unreadable bitwise operations), unless explicitly requested.
- **Never** modify database schemas automatically; only optimize the query logic within the application code.
- If no profiling tools are available in the environment, fallback to static Big-O complexity analysis and output a warning.
