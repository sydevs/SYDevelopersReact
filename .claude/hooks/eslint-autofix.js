#!/usr/bin/env node

/**
 * ESLint Auto-fix Hook (PostToolUse)
 *
 * Automatically runs ESLint with --fix on edited files to maintain code quality.
 * - Runs after Write/Edit operations
 * - Auto-fixes linting issues when possible
 * - Reports unfixable issues to Claude for correction
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Read hook input from stdin
let input = ''
process.stdin.on('data', (chunk) => {
  input += chunk
})

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input)
    const { toolName, parameters } = data

    // Only process Write and Edit tools
    if (!['Write', 'Edit'].includes(toolName)) {
      process.stdout.write(
        JSON.stringify({
          continue: true,
          suppressOutput: true,
        }),
      )
      return
    }

    const filePath = parameters.file_path
    if (!filePath) {
      process.stdout.write(
        JSON.stringify({
          continue: true,
          suppressOutput: true,
        }),
      )
      return
    }

    // Only lint supported file types
    const ext = path.extname(filePath)
    const supportedExtensions = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']
    if (!supportedExtensions.includes(ext)) {
      process.stdout.write(
        JSON.stringify({
          continue: true,
          suppressOutput: true,
        }),
      )
      return
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      process.stdout.write(
        JSON.stringify({
          continue: true,
          suppressOutput: true,
        }),
      )
      return
    }

    try {
      // Run ESLint with --fix
      execSync(`pnpm eslint --fix "${filePath}"`, {
        cwd: process.env.CLAUDE_PROJECT_DIR,
        stdio: 'pipe',
        encoding: 'utf-8',
      })

      // Success - file was linted and auto-fixed
      process.stdout.write(
        JSON.stringify({
          continue: true,
          suppressOutput: true,
        }),
      )
    } catch (error) {
      // ESLint found unfixable issues
      const output = error.stdout || error.stderr || error.message

      if (output.includes('error') || output.includes('warning')) {
        // Parse and report linting errors to Claude
        process.stdout.write(
          JSON.stringify({
            continue: true,
            additionalContext: `ESLint found issues in ${path.basename(filePath)}:\n\n${output}\n\nPlease review and fix these linting errors.`,
          }),
        )
      } else {
        // Silent success for warnings only
        process.stdout.write(
          JSON.stringify({
            continue: true,
            suppressOutput: true,
          }),
        )
      }
    }
  } catch (error) {
    // JSON parsing or other errors - don't block
    process.stdout.write(
      JSON.stringify({
        continue: true,
        suppressOutput: true,
      }),
    )
  }
})
