#!/usr/bin/env node

/**
 * Build Validation Hook (PostToolUse)
 *
 * Validates that changes don't break the build.
 * - Runs after significant file changes
 * - Catches TypeScript type errors via build
 * - Reports build errors to Claude for correction
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read hook input from stdin
let input = '';
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const { toolName, parameters } = data;

    // Only process Write and Edit tools
    if (!['Write', 'Edit'].includes(toolName)) {
      process.stdout.write(JSON.stringify({
        continue: true,
        suppressOutput: true
      }));
      return;
    }

    const filePath = parameters.file_path;
    if (!filePath) {
      process.stdout.write(JSON.stringify({
        continue: true,
        suppressOutput: true
      }));
      return;
    }

    // Only validate for source code files
    const ext = path.extname(filePath);
    const sourceExtensions = ['.ts', '.tsx', '.js', '.jsx'];
    if (!sourceExtensions.includes(ext)) {
      process.stdout.write(JSON.stringify({
        continue: true,
        suppressOutput: true
      }));
      return;
    }

    // Skip validation for test files and config files
    const fileName = path.basename(filePath);
    if (fileName.includes('.test.') ||
        fileName.includes('.spec.') ||
        fileName.includes('.config.') ||
        filePath.includes('/scripts/')) {
      process.stdout.write(JSON.stringify({
        continue: true,
        suppressOutput: true
      }));
      return;
    }

    try {
      // Run build to check for type errors
      execSync('pnpm build', {
        cwd: process.env.CLAUDE_PROJECT_DIR,
        stdio: 'pipe',
        encoding: 'utf-8',
        timeout: 30000 // 30 second timeout
      });

      // Build succeeded
      process.stdout.write(JSON.stringify({
        continue: true,
        suppressOutput: true
      }));

    } catch (error) {
      // Build failed - parse and report errors
      const output = error.stdout || error.stderr || error.message;

      // Extract relevant error messages
      const errors = output.split('\n')
        .filter(line =>
          line.includes('error') ||
          line.includes('Error') ||
          line.includes('TS') ||
          line.includes('✘')
        )
        .slice(0, 15) // Limit to first 15 error lines
        .join('\n');

      if (errors) {
        process.stdout.write(JSON.stringify({
          continue: true,
          additionalContext: `Build failed after editing ${path.basename(filePath)}:\n\n${errors}\n\nPlease fix these build errors.`
        }));
      } else {
        // Generic build failure
        process.stdout.write(JSON.stringify({
          continue: true,
          additionalContext: `Build failed after editing ${path.basename(filePath)}. Please check for type errors or syntax issues.`
        }));
      }
    }

  } catch (error) {
    // JSON parsing or other errors - don't block
    process.stdout.write(JSON.stringify({
      continue: true,
      suppressOutput: true
    }));
  }
});
