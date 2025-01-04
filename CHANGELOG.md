# Changelog

All notable changes to this project will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

- JSON to YAML Conversion.
- Option to specify header labels in CSV output.

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
