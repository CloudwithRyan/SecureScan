# FinForge Security Policy

**Purpose**

FinForge uses automated security checks to identify vulnerabilities before application code is merged into the main branch. This policy defines the minimum security requirements for code changes.

## 1. Secure Development

* All code changes must be submitted through a pull request targeting `main`.
* Developers must not commit passwords, API keys, access tokens, or other secrets to the repository.
* Application code must validate user input and avoid unsafe operations such as executing untrusted input.
* Dependencies must be selected carefully and kept up to date.

## 2. Automated Security Checks

Every pull request targeting `main` must pass the required GitHub Actions security checks.

* **Static Application Security Testing (SAST):** Semgrep scans application code for security weaknesses.
* **Software Composition Analysis (SCA):** `npm audit` and OSV-Scanner identify dependencies with known vulnerabilities.
* **Severity handling:** High and critical findings must be resolved before merging. Medium and low findings must be reviewed and documented but do not automatically block merging.

## 3. Vulnerability Remediation

Developers must investigate reported findings and apply appropriate fixes before merging. Where an alert is a false positive, the reasoning must be documented and the finding reviewed rather than ignored without justification.

Intentionally vulnerable code and dependencies used for security testing must remain on separate test branches and must not be merged into `main`.

## 4. Branch Protection

The `main` branch must be protected by repository rules requiring pull requests and successful completion of the designated security status checks. Changes must not bypass these controls.

## 5. Responsibilities

Developers are responsible for reviewing scan results, correcting vulnerabilities, and keeping dependencies secure. The project maintainer is responsible for maintaining the scanning workflow, reviewing exceptions, and ensuring that branch protection remains enabled.

## 6. Continuous Improvement

Security findings and lessons learned from testing must be documented. The security workflow and this policy should be reviewed as the application and its dependencies evolve.
