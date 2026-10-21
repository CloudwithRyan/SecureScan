# SecureScan — FinForge Security Scanner

SecureScan is a Node.js application developed as a cloud security portfolio project. It demonstrates how automated security scanning can identify vulnerable dependencies and insecure application code before changes are merged into the main branch.

## Technology Stack

* Node.js and Express
* Helmet for HTTP security headers
* Joi for request validation
* Express Rate Limit for request throttling
* GitHub Actions for automated security checks
* Semgrep for Static Application Security Testing (SAST)
* npm audit and OSV-Scanner for Software Composition Analysis (SCA)

## Run Locally

Requirements: Node.js and npm.

1. Clone the repository.

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Start the application:

   ```bash
   node server.js
   ```

4. Open `http://localhost:3000` in your browser.

## Available Endpoints

| Method | Endpoint               | Purpose                     |
| ------ | ---------------------- | --------------------------- |
| GET    | `/`                    | Application welcome message |
| GET    | `/health`              | Health check                |
| GET    | `/api/security/status` | Security status             |
| GET    | `/api/projects`        | List projects               |
| POST   | `/api/projects`        | Create a validated project  |

## Security Testing

The GitHub Actions workflow runs security checks on pull requests targeting `main`.

* **SAST:** Semgrep checks application code for security weaknesses.
* **SCA:** npm audit and OSV-Scanner check dependencies for known vulnerabilities.

Intentionally vulnerable examples are maintained on separate test branches for demonstration. They must not be merged into `main`.

## Project Goals

* Demonstrate automated security scanning in CI/CD.
* Detect vulnerabilities before code is merged.
* Document findings and remediation.
* Enforce security checks through GitHub branch protection.
