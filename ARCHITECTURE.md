# SecureScan Architecture

## Security Scanning Pipeline

The SecureScan pipeline automatically checks code changes before they can be merged into the `main` branch.

flowchart TD
    A[Developer] --> B[Create Pull Request to main]
    B --> C[GitHub Actions Workflow]
    C --> D[Semgrep SAST]
    C --> E[npm audit SCA]
    C --> F[OSV-Scanner SCA]
    D --> G{Required Checks Pass?}
    E --> G
    F --> G
    G -->|Yes| H[Merge Allowed]
    G -->|No| I[Merge Blocked]
    I --> J[Investigate and Fix Findings]
    J --> B
```

## Workflow Components

* **GitHub pull requests:** Trigger security checks when changes target `main`.
* **Semgrep:** Performs Static Application Security Testing (SAST) to identify insecure application code.
* **npm audit:** Checks npm dependencies against known vulnerability advisories.
* **OSV-Scanner:** Checks dependencies against the Open Source Vulnerabilities database.
* **Branch protection:** Requires the configured security status checks to pass before merging.

## Merge Decision

A pull request should only be merged after all required security checks pass. High and critical findings must be addressed before merging. Medium and low findings are reported for review without automatically blocking the merge.

Intentionally vulnerable test branches demonstrate that the pipeline detects security issues. They must remain separate from `main`.
