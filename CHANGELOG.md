# Changelog

All notable changes to this project will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

- JSON to YAML Conversion.

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
