# SentinelHeaders - HTTP Security Headers Scanner

A professional-grade, Python-based CLI tool for assessing HTTP security headers. SentinelHeaders is designed for red teams, defenders, and compliance auditors — delivering deep visibility into HTTP header configurations with severity ratings, security scoring, and remediation guidance.

---

## 📸 Screenshot

Here's an example output from SentinelHeaders:

![SentinelHeaders Sample Output](https://github.com/sneckey0day/SentinelHeaders/blob/main/images/FILE.png?raw=true)

---

## 🔐 Features

- Comprehensive security header scanning with severity levels (**CRITICAL** to **LOW**)
- Automatic security scoring (**0–100**) based on header presence and quality
- Multi-threaded scanning for high-performance bulk assessments
- Verbose mode provides detailed explanations and actionable recommendations
- CSV export support for compliance documentation and audits
- Fully configurable (timeouts, threading, proxy, User-Agent, etc.)
- Colorized terminal output with optional `--no-color` switch
- Built-in header reference guide using `--help-headers`

---

## ⚙️ Installation

```bash
git clone https://github.com/sneckey0day/SentinelHeaders.git
cd SentinelHeaders
pip install -r requirements.txt
````

---

## 🚀 Usage

### 🔍 Scan a Single URL

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

### 🌐 Use Proxy & Custom User-Agent

```bash
python3 sentinelheaders.py -u https://example.com --proxy http://127.0.0.1:8080 --user-agent "Mozilla/5.0"
```

### 🧾 Show Headers Reference

```bash
python3 sentinelheaders.py --help-headers
```

---

## 🆘 Help Menu

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

## 🛡️ Headers Checked

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

## 🤝 Contributing

We welcome community contributions.

* Fork the repository
* Create a feature branch (`feature/xyz` or `fix/issue123`)
* Follow PEP8 guidelines
* Submit a clean and well-documented pull request

Ideas, bug reports, header suggestions — all are appreciated.

---

## 🪪 License

This project is licensed under the **MIT License**.

You are free to use, distribute, and modify the tool with proper attribution.

---

## 🧠 Credits & Palette

> **Core Developers**
>
> * [Sneckey0Day](https://github.com/sneckey0day)
> * [prash0xd](https://github.com/prash0xd)

Proudly built by professionals passionate about cybersecurity, red teaming, and offensive tooling.

---

**Built for red teams, defenders, and auditors. Use responsibly.**

```
