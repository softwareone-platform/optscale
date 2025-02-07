## Development

### Prerequisites

Ensure you have pnpm installed globally on your machine. You can install it using the following command:

```
npm install -g pnpm
```

### Server

To launch the server in development mode, follow these steps:

#### 1. Install Dependencies:

```
pnpm install
```

#### 2. Define Environment Variables:

See the Environment section below for more details.

#### 3. Update GraphQL Schema Types (if needed):

If you make changes to the GraphQL schema, update the types definition by running:

```
pnpm codegen
```

#### 4. Run the Server:

```
pnpm start
```

### Serving the UI from the Server

The server can also serve the built UI version. If you only need to develop the server part, follow these steps:

#### 1. Build the UI:

Navigate to the UI project directory (ngui/ui) and run:

```
pnpm build
```

#### 2. Set the Environment Variable:

Define the `UI_BUILD_PATH` environment variable to point to the UI app build directory.

Example in your .env file for the Server:

```
UI_BUILD_PATH=/path/to/ui/build
```

#### 3. Run the Server:

```
pnpm start
```

### UI

To start the UI part in development mode, follow these steps:

#### 1. Define Environment Variables:

See the Environment section below for more details.

#### 2. Start the Application with Dependencies Installation:

This command will install all required dependencies and start the application:

```
pnpm start:ci
```

#### 2.1 Alternatively, Start the Application (if dependencies are already installed):

If you have already installed all dependencies (e.g., by running `pnpm install --frozen-lockfile`), you can start the application with:

```
pnpm start
```

## Environment

### Node and npm

Actual versions:

- nodejs: 20.10.0
- npm: 10.2.3
- pnpm: 8.11.0

Source: https://nodejs.org/en/download/releases/

### Environment variables

Samples could be found here:

- ui/.env.sample
- server/.env.sample

Set all the variables and save without `.sample`

Take a note, that at production or dockerized version server starts with `prepare-and-run.sh` script, which creates /ui/build/config.js, where **all** `VITE_` variables (even unused in code!) will be listed **with** their names. At this stage, do not use `ui/.env` to store any sensitive information in `VITE_` variables.

### Fixing npm module vulnerabilities

To check and fix npm module vulnerabilities using pnpm, follow these steps:

#### 1. Basic vulnerability check:

```
pnpm audit
```

#### 2. Simple fixes:

To automatically fix direct vulnerabilities where possible:

```
pnpm audit --fix
```

#### 3. Handling indirect dependencies:

For vulnerabilities in packages that are not directly installed:

1. Identify the vulnerable package and its dependencies:

```
pnpm audit
pnpm why <package_name>
```

2. Examine the package.json files of projects using the vulnerable package to determine acceptable version ranges according to semver rules

3. Run the fix command to generate an override:

```
pnpm audit --fix
```

4. Verify that the generated override in package.json follows the required semver rules

5. Install dependencies with the override:

```
pnpm install
```

6. After verifying the fix works, remove the override from package.json
