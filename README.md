# SentinelHeaders - HTTP Security Headers Scanner

A professional Python-based CLI tool for assessing HTTP security headers. Scans single or multiple targets, calculates security scores, identifies misconfigurations, and provides actionable recommendations.

---

## Features

- Comprehensive security header scanning with severity ratings (**CRITICAL** to **LOW**)
- Automatic security scoring (**0–100**) with letter grading (**A+ to F**)
- Multi-threaded scanning for high-performance bulk assessments
- Verbose mode with detailed explanations and remediation guidance
- CSV export for compliance reporting and documentation
- Fully configurable: timeouts, delays, threading, proxy, User-Agent
- Colorized terminal output for better readability (with `--no-color` option)
- Built-in security headers reference with `--help-headers`

---

## Installation

```bash
git clone https://github.com/sneckey0day/SentinelHeaders.git
cd SentinelHeaders
pip install -r requirements.txt
````

---

## Usage

### 🔍 Single URL Scan

```bash
python3 sentinelheaders.py -u https://example.com
```

### 📂 Bulk Scan from File

```bash
python3 sentinelheaders.py -f targets.txt --threads 10
```

### 📢 Verbose Mode with Recommendations

```bash
python3 sentinelheaders.py -u https://example.com -v
```

### 📊 Export Results to CSV

```bash
python3 sentinelheaders.py -f targets.txt -o scan_results --threads 5
```

### ⚙️ Custom Thread Count

```bash
python3 sentinelheaders.py -f targets.txt --threads 15
```

### 🌐 Proxy and Custom User-Agent

```bash
python3 sentinelheaders.py -u https://example.com --proxy http://127.0.0.1:8080 --user-agent "Mozilla/5.0"
```

### 🧾 Show Headers Reference

```bash
python3 sentinelheaders.py --help-headers
```

---

## Help Menu

```text
usage: sentinelheaders.py [-h] (-u URL | -f FILE | --help-headers) [-o OUTPUT] [-v] [--timeout TIMEOUT] [--delay DELAY] [--threads THREADS] [--proxy PROXY]
                          [--user-agent USER_AGENT] [--no-color]

HTTP Security Headers Scanner v3.0 - Professional security assessment tool

options:
  -h, --help            Show this help message and exit
  -u, --url URL         Single URL to scan
  -f, --file FILE       File containing URLs (one per line)
  --help-headers        Show detailed security headers reference
  -o, --output OUTPUT   Save results to CSV file (auto-adds .csv)
  -v, --verbose         Show detailed output with recommendations
  --timeout TIMEOUT     Request timeout in seconds (default: 10)
  --delay DELAY         Delay between requests in seconds (default: 0.5)
  --threads THREADS     Number of threads for concurrent scanning (default: 1)
  --proxy PROXY         HTTP proxy (e.g., http://127.0.0.1:8080)
  --user-agent USER_AGENT Custom User-Agent string
  --no-color            Disable colored output
```

---

## Headers Checked

| Header Name                   | Severity | Description                                                    |
| ----------------------------- | -------- | -------------------------------------------------------------- |
| **Strict-Transport-Security** | CRITICAL | Enforces HTTPS and protects against MITM attacks               |
| **Content-Security-Policy**   | CRITICAL | Defends against XSS and data injection                         |
| **X-Frame-Options**           | HIGH     | Prevents clickjacking by restricting iframe embedding          |
| **X-Content-Type-Options**    | HIGH     | Prevents MIME type sniffing attacks                            |
| **Referrer-Policy**           | MEDIUM   | Controls information sent in the Referer header                |
| **Permissions-Policy**        | MEDIUM   | Manages access to browser APIs and features                    |
| **Cache-Control**             | MEDIUM   | Prevents caching of sensitive information                      |
| **X-XSS-Protection**          | LOW      | Legacy XSS protection (mostly deprecated but sometimes useful) |

---

## Scoring & Grading Logic

Each scanned header contributes to a cumulative **security score (0–100)**. The tool evaluates presence and correctness, weighted by severity:

### Weighting by Severity

* **CRITICAL** → 25 points
* **HIGH** → 15 points
* **MEDIUM** → 10 points
* **LOW** → 5 points

Misconfigured or missing headers result in partial or full deductions based on impact.

### Grading Scale

| Grade | Score Range |
| ----- | ----------- |
| A+    | 95–100      |
| A     | 90–94       |
| B     | 80–89       |
| C     | 70–79       |
| D     | 60–69       |
| F     | < 60        |

Verbose mode (`-v`) includes detailed scoring, header status, and recommendations.

---

## Screenshots

> *Screenshots showcasing scan results, grades, and CSV outputs will be added soon.*

---

## Contributing

We welcome contributions from the security and open-source community.

* Fork the repository
* Create a feature branch (`feature/xyz` or `fix/issue123`)
* Follow PEP8 coding guidelines
* Submit a well-documented pull request

Open issues, suggest enhancements, or contribute new header checks — all contributions are valued.

---

## License

This project is licensed under the **MIT License**.
You are free to use, distribute, and modify it with proper attribution.

---

**Built for red teams, defenders, and auditors. Use responsibly.**
