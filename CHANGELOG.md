# Changelog

All notable changes to this project will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

- Optional support for custom flattening behavior in `toCSV`.
- Options for customizing YAML output (indentation, quoting styles, etc).
- Options for customizing Markdown table generation (alignment, style).
- Support for custom root element name in XML generation.

## [1.1.3] - 2025-04-27

### Added

- **JSON Schema Validation**: New `validateJsonSchema` function to validate JSON objects against provided schemas using AJV.
- **Batch Processing**: New `batchProcess` function to divide and process large JSON arrays in batches asynchronously.
- **Pretty-Print for XML**: XML output now supports customizable pretty formatting through the `prettyPrint` option.
- **Flatten Helpers**: New modular helpers `flattenObject` and `flattenJson` to standardize object flattening across converters.
- **Custom CSV Header Mapping**: `customCSVFieldGenerator` added for precise header customization in `toCSV`.
- **Automatic Flattening in toCSV**: Nested JSON objects are automatically flattened in CSV output.
- **Error Handling Improvements**: Better error messages and stricter input validation across all main converters.
- **Improved Test Coverage**: Full unit test coverage for converters and internal helpers.

### Changed

- Internal refactor: Splitted converters and helpers into modular architecture (`@helpers`, `@converters`, etc).
- Aliases introduced in tsconfig (`@converters`, `@utils`, `@types`) to improve import management and code clarity.
- Updated internal types for stronger validation (`JsonArray`, `JsonObject`, etc).

### Fixed

- Correct flattening of deeply nested objects in CSV generation.
- Proper handling of empty objects across all converters (returning safe outputs).
- Small bug fixes and improvements for JSONLines stream generation.

## [1.1.2] - 2025-04-19

### Added

- Updated package.json to support both ESM and CJS using exports field and type: module.
- Updated Jest config to support ESM with --experimental-vm-modules.
- Adjusted tsconfig.json for compatibility with new build setup.
- Migrated build system to tsup for faster and modern bundling.
- Improved GitHub Actions workflow for release publishing.
- Refactored core imports to use import type syntax.
- New tsup.config.ts file.

## [1.1.1] - 2025-01-10

### Added

- Automation using GitHub Actions to automatically publish to npm when a new release is created.
- Validates package version to prevent publishing duplicate versions.
- Executes automated tests (`npm test`) to ensure package stability.
- Adds dependency caching to improve CI/CD performance.
- Configures npm authentication automatically via `.npmrc`.

## [1.1.0] - 2025-01-09

### Added

- JSON to YAML Conversion: Added support for converting JSON to YAML for configurations like Kubernetes and Ansible.
- JSON to JSONLines (NDJSON): Transform JSON arrays into JSONLines, ideal for incremental processing and data pipelines.
- JSONLines Stream: Generate readable streams of JSONLines to handle large volumes of data efficiently.

### Fixed

- General improvements in input validation for existing functions.
- Memory optimizations for large conversions.

## [1.0.2] - 2025-01-06

### Added

- Custom header labels for CSV: Allows specifying friendly column names instead of using raw JSON keys.
- Nested object flattening in CSV: Transforms nested fields (e.g. `details.age`) into separate columns.
- Type-based CSV output: Numbers are unquoted, strings are quoted, and `null/undefined` fields are left empty.
- Large dataset test coverage: Ensures performance and correctness for bigger JSON arrays.

### Fixed

- Incorrectly quoted numeric fields in CSV outputs.
- Inconsistent handling of empty or null fields when generating CSV.

## [1.0.1] - 2025-01-04

### Added

- Improved XML conversion with options for maximum depth and array handling (`wrap` or `index`).
- Enhanced Markdown table generation with dynamic header extraction.
- Better error handling for empty JSON arrays in `toMarkdownTable` and invalid inputs in `toXML`.
- New file structure: Organized modules into dedicated files for better maintainability and scalability.

### Fixed

- Corrected edge cases in CSV output when handling missing keys.

## [1.0.0] - 2025-01-03

### Added

- 🚀 Convert JSON to **CSV**, **XML**, and Markdown tables.
- 📄 Easy-to-use API: `toCSV`, `toXML`, `toMarkdownTable`.

### Fixed

- Minor bugs in XML formatting.

### Notes

- Minimum Node.js version: 14.0.0.
- Compatible with JavaScript and TypeScript.

## [0.1.0] - 2024-12-25

### Added

- Initial prototype for JSON to CSV conversion.
