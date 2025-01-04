# jsonweaver

**jsonweaver** is a powerful and easy-to-use library for transforming JSON data into popular formats such as CSV, XML, and Markdown tables.

## Features

- 🚀 Convert to CSV: Easily transform JSON arrays into CSV files.
- 📄 Generate Markdown tables: Convert JSON arrays into neatly formatted Markdown tables.
- 📂 Convert to XML: Transform JSON objects into well-structured XML.
- 🔧 Compatible with JavaScript and TypeScript: Ideal for modern projects.

## Installation

Install using npm:

```bash
npm install jsonweaver
```

Or using Yarn:

```bash
yarn add jsonweaver
```

## Usage

### Importing

Javascript

```javascript
const { jsonweaver } = require("jsonweaver");
```

TypeScript

```typescript
import { jsonweaver } from "jsonweaver";
```

### Examples

JSON to CSV

```javascript
const json = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];

const csv = jsonweaver.toCSV(json);
console.log(csv);
```

JSON to XML

```javascript
const json = { name: "Alice", age: 25, city: "Wonderland" };

const xml = jsonweaver.toXML(json);
console.log(xml);
```

JSON to Markdown Table

```javascript
const json = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];

const markdownTable = jsonweaver.toMarkdownTable(json);
console.log(markdownTable);
```

### API

| Function                          | Description                                                        |
| --------------------------------- | ------------------------------------------------------------------ |
| `toCSV(json: object[])`           | Converts an array of JSON objects into a CSV string.               |
| `toXML(json: object)`             | Converts a JSON object into an XML string.                         |
| `toMarkdownTable(json: object[])` | Converts an array of JSON objects into a formatted Markdown table. |

### Requirements

- Node.js version 14.0.0 or higher.

### Contribution

Feel free to open issues or submit pull requests to improve jsonweaver. All contributions are welcome! 🌟

1. Fork the repository.
2. Create a branch for your feature: git checkout -b my-feature.
3. Make your changes and commit: git commit -m 'My awesome feature'.
4. Push to the repository: git push origin my-feature.
5. Open a pull request on GitHub.

### License

This project is licensed under the terms of the MIT License.
