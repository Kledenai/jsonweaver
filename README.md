[![npm version](https://img.shields.io/npm/v/jsonweaver)](https://www.npmjs.com/package/jsonweaver)

# jsonweaver

**jsonweaver** is a powerful and easy-to-use library for transforming JSON data into popular formats such as CSV, XML, Markdown tables, YAML, and JSONLines (NDJSON).

## Features

- 🚀 **Convert to CSV**: Easily transform JSON arrays into CSV files, with optional header mapping and nested object flattening.
- 📄 **Generate Markdown tables**: Convert JSON arrays into neatly formatted Markdown tables.
- 📂 **Convert to XML**: Transform JSON objects into well-structured XML.
- 📜 **Convert to YAML**: Seamlessly transform JSON into YAML format for configuration files and more.
- 📦 **Convert to JSONLines (NDJSON)**: Convert JSON arrays to JSONLines format for large-scale data processing and streaming.
- 🛠️ **Batch processing**: Process large datasets in customizable batches.
- 🔍 **Validate JSON with JSON Schema**: Ensure your JSON conforms to specified schemas.
- 🔧 **Compatible with JavaScript and TypeScript**: Ideal for modern projects.

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

Javascript:

```javascript
const { jsonweaver } = require("jsonweaver");
```

TypeScript:

```typescript
import { jsonweaver } from "jsonweaver";
```

### Examples

#### JSON to CSV (Basic usage)

```javascript
const json = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];

const csv = jsonweaver.toCSV(json);
console.log(csv);
```

Using custom headers (renaming keys):

```javascript
const headerMapping = {
  name: "Full Name",
  age: "Years",
};

const csvWithHeaders = jsonweaver.toCSV(
  json,
  jsonweaver.customCSVFieldGenerator(headerMapping)
);
console.log(csvWithHeaders);
```

Handling nested objects (automatic flattening):

```javascript
const nestedJson = [
  { name: "Alice", details: { age: 25, city: "Wonderland" } },
  { name: "Bob", details: { age: 30, city: "Gotham" } },
];

const csvFlattened = jsonweaver.toCSV(nestedJson);
console.log(csvFlattened);
```

#### JSON to XML

```javascript
const json = { name: "Alice", age: 25, city: "Wonderland" };
const xml = jsonweaver.toXML(json);
console.log(xml);
```

#### JSON to Markdown Table

```javascript
const json = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];
const markdownTable = jsonweaver.toMarkdownTable(json);
console.log(markdownTable);
```

#### JSON to YAML

```javascript
const json = { name: "Alice", age: 25, city: "Wonderland" };
const yaml = jsonweaver.toYaml(json);
console.log(yaml);
```

#### JSON to JSONLines (NDJSON)

```javascript
const json = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];
const jsonLines = jsonweaver.toJsonLines(json);
console.log(jsonLines);
```

JSON to JSONLines Stream:

```javascript
const stream = jsonweaver.toJsonLinesStream(json);
stream.on("data", (chunk) => {
  console.log(chunk.toString());
});
stream.on("end", () => {
  console.log("Stream ended.");
});
```

#### Validate JSON Schema

```javascript
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
  },
  required: ["name", "age"],
};

const data = { name: "Alice", age: 25 };
jsonweaver.validateJsonSchema(data, schema);
```

#### Batch Processing

```javascript
const largeArray = Array.from({ length: 1000 }, (_, i) => ({ id: i }));

await jsonweaver.batchProcess(largeArray, 100, async (batch, batchIndex) => {
  console.log(`Processing batch ${batchIndex}`, batch);
});
```

### API

| Function                                                                                     | Description                                                  |
| :------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| `toCSV(json: object[], fieldGenerator?)`                                                     | Converts an array of JSON objects into a CSV string.         |
| `toXML(json: object, options?)`                                                              | Converts a JSON object into an XML string.                   |
| `toMarkdownTable(json: object[])`                                                            | Converts an array of JSON objects into a Markdown table.     |
| `toYaml(json: object)`                                                                       | Converts a JSON object into a YAML string.                   |
| `toJsonLines(json: object[], options?)`                                                      | Converts an array of JSON objects into JSONLines format.     |
| `toJsonLinesStream(json: object[])`                                                          | Creates a stream of JSONLines from an array of JSON objects. |
| `validateJsonSchema(json: object, schema: object)`                                           | Validates a JSON object against a schema.                    |
| `batchProcess(data: object[], batchSize: number, processor: (batch, index) => Promise<any>)` | Processes data in batches asynchronously.                    |

### Requirements

- Node.js version 14.0.0 or higher.

### Contribution

Feel free to open issues or submit pull requests to improve jsonweaver. All contributions are welcome! 🌟

1. Fork the repository.
2. Create a branch for your feature: `git checkout -b my-feature`.
3. Make your changes and commit: `git commit -m 'My awesome feature'`.
4. Push to the repository: `git push origin my-feature`.
5. Open a pull request on GitHub.

### License

This project is licensed under the terms of the MIT License.
