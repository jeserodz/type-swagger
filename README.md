# Type-Swagger 

JavaScript/TypeScript HTTP client generator from a Swagger/OpenAPI spec.

## Installation

You can install the CLI tool locally or run it directly from NPM using `npx`.

### With `NPX`
`$ npx type-swagger generate <name> <specUrl>`

### Local Installation
`$ npm install -g type-swagger`

## Usage

### Generate

Generate a new client SDK.

`type-swagger generate <name> <specUrl>`

- **name:** Name of the package to be used.
- **specUrl:** URL of the Swagger spec in JSON format.

### Update

Update an existing client SDK.

`type-swagger update <specUrl>`

- **specUrl:** URL of the Swagger spec in JSON format.
