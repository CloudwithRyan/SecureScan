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

-------------------------------------------------------------------------------------------------

## Security Tool Choices

| Tool | Purpose | Reason for Selection |
|---|---|---|

| Semgrep | Static Application Security Testing (SAST) | Detects insecure code patterns, including potentially dangerous functions and injection risks. |

| npm audit | Software Composition Analysis (SCA) | Identifies known vulnerabilities in npm dependencies and reports available fixes. |

| OSV-Scanner | Software Composition Analysis (SCA) | Checks dependencies against the Open Source Vulnerabilities database, providing an additional vulnerability detection source. |

| GitHub Actions | Continuous Integration (CI) | Automates security checks whenever a pull request targets `main`. |

| GitHub branch protection | Merge enforcement | Requires pull requests and successful security checks before changes can be merged. |

These tools were selected because they support automated security testing using the project's existing GitHub and Node.js workflow.

## Lessons Learned

Testing demonstrated the importance of integrating security checks into the pull request process rather than relying solely on manual review.

- **Dependency vulnerabilities:** The intentionally vulnerable Lodash dependency was identified by `npm audit`, demonstrating how an outdated package can introduce known security risks.
- **Insecure application code:** The intentionally unsafe `eval()` endpoint triggered Semgrep findings, demonstrating the value of static analysis.
- **Remediation:** Removing the vulnerable dependency and unsafe endpoint allowed the clean pull request to pass the security checks.
- **Merge enforcement:** A failing workflow alone does not prevent merging. Repository branch protection must require the appropriate status checks.
- **Multiple scanners:** Using both npm audit and OSV-Scanner provides complementary checks, although their findings and results may differ.

## False-Positive Review

Security scanner findings require review before a developer decides how to respond. A finding may be a false positive when a tool flags a pattern that appears risky but is not exploitable in the application's actual context.

For example, a scanner may flag a potentially unsafe operation even when the relevant input is constrained or the flagged code path cannot be reached with attacker-controlled data. The developer should examine the source code, trace the input, and assess exploitability before deciding whether the alert is a false positive.

For this project, the intentionally unsafe `eval()` endpoint was a genuine security concern because request input was executed as code. It should not be dismissed as a false positive. Any claimed false positive must be supported by evidence and documented before an exception is considered.