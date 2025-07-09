# 🛡️ Claud 2 - HTTP Security Headers Scanner v3.0

**Claud 2** is a professional-grade tool built for security assessments and red teamers. It performs a comprehensive analysis of HTTP response headers to identify missing or misconfigured security controls. This scanner focuses on critical to low-priority headers and provides actionable recommendations where applicable.

---

## 📌 Features

- ✅ Scans a single URL or bulk URLs from a file
- ✅ Checks for a wide range of HTTP security headers
- ✅ Outputs results in CSV format
- ✅ Supports threading, timeouts, and delays for large-scale scans
- ✅ Proxy support for tunneled assessments
- ✅ Custom User-Agent injection
- ✅ Option to disable color for CI pipeline use
- ✅ Verbose mode for detailed header recommendations
- ✅ Built-in header reference guide

---

## 🚀 Installation

```bash
git clone https://github.com/yourusername/claud_2.git
cd claud_2
python3 -m pip install -r requirements.txt
````

> Requirements file should contain:
>
> * `requests`
> * `argparse`
> * `colorama` (optional for color support)

---

## 🛠️ Usage

```bash
python3 claud_2.py -u https://example.com
```

### Available Arguments

| Flag             | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| `-u, --url`      | Target URL to scan                                         |
| `-f, --file`     | File containing URLs (one per line)                        |
| `--help-headers` | Display detailed explanation of each header                |
| `-o, --output`   | Output results to a CSV file                               |
| `-v, --verbose`  | Show recommendations for each missing/misconfigured header |
| `--timeout`      | Set request timeout (default: `10` sec)                    |
| `--delay`        | Delay between requests (default: `0.5` sec)                |
| `--threads`      | Number of concurrent threads (default: `1`)                |
| `--proxy`        | Use HTTP proxy (e.g., `http://127.0.0.1:8080`)             |
| `--user-agent`   | Inject custom User-Agent string                            |
| `--no-color`     | Disable color output for cleaner logs or automation        |
| `-h, --help`     | Show help message and exit                                 |

---

## 🔍 Header Severity Levels

| Severity    | Headers Checked                                          |
| ----------- | -------------------------------------------------------- |
| 🔴 Critical | `Strict-Transport-Security`, `Content-Security-Policy`   |
| 🟠 High     | `X-Frame-Options`, `X-Content-Type-Options`              |
| 🟡 Medium   | `Referrer-Policy`, `Permissions-Policy`, `Cache-Control` |
| 🟢 Low      | `X-XSS-Protection`                                       |

---

## 📄 Example Usage

```bash
# Scan a single URL
python3 claud_2.py -u https://example.com

# Verbose scan with custom delay
python3 claud_2.py -u https://target.com -v --delay 2

# Bulk scan with multithreading and CSV output
python3 claud_2.py -f urls.txt -o results --threads 5

# Use a proxy during scanning
python3 claud_2.py -f urls.txt -v --proxy http://127.0.0.1:8080

# Display detailed reference of headers
python3 claud_2.py --help-headers
```

---

## 🧠 Notes

* Ensure all target URLs include the scheme (`http://` or `https://`) to avoid resolution issues.
* Results are saved in CSV format for further processing or reporting.

---

## 📜 License

MIT License – feel free to use, modify, and share with proper credit.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change or improve.

---

## 👤 Author

**Sneckey0Day**
Cyber Security Enthusiast | VAPT | Red Teaming | CTF Solver
