# Express + yamlcraft Demo

A simple Express server demonstrating the [`yamlcraft`](https://www.npmjs.com/package/yamlcraft) YAML parser library.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the server:**
   ```bash
   npm start
   ```

The server will start at `http://localhost:3000`.

---

## Endpoints

### 1. `GET /`
Returns the server configuration read directly from `config.yaml` using `parseFile()`.

```bash
curl http://localhost:3000/
```

### 2. `POST /parse`
Parses raw YAML text sent in the request body using `parse()` and returns JSON.

```bash
curl -X POST http://localhost:3000/parse \
  -H "Content-Type: text/yaml" \
  -d "name: John Doe
age: 30
skills:
  - JavaScript
  - Node.js"
```
