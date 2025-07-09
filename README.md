# SentinelHeaders - HTTP Security Headers Scanner

A professional Python-based CLI tool for assessing HTTP security headers. Scans single or multiple targets, calculates security scores, identifies misconfigurations, and provides actionable recommendations.

## Features
- Comprehensive security header scanning with severity ratings (CRITICAL to LOW)
- Automatic security scoring (0-100) with letter grade (A+ to F)
- Multi-threaded scanning for bulk operations
- Detailed verbose mode with remediation advice
- CSV export for easy reporting
- Customizable scanning parameters (timeout, delay, threads, proxy)
- Color-coded terminal output (with disable option)
- Built-in security headers reference (`--help-headers`)

## Installation
```bash
git clone https://github.com/yourusername/SentinelHeaders.git
cd SentinelHeaders
pip install -r requirements.txt
```

## Usage
### Single URL scan
```
python3 sentinelheaders.py -u https://example.com
```
### Bulk scan from file
```
python3 sentinelheaders.py -f targets.txt --threads 10
```
### Verbose mode with recommendations
```
python3 sentinelheaders.py -u https://example.com -v
```
### Export results to CSV
```
python3 sentinelheaders.py -f targets.txt -o scan_results --threads 5
```
### Custom thread count
```
python3 sentinelheaders.py -f targets.txt --threads 15
```
### With proxy and custom user agent
```
python3 sentinelheaders.py -u https://example.com --proxy http://127.0.0.1:8080 --user-agent "Mozilla/5.0"
```
### Show headers reference
```
python3 sentinelheaders.py --help-headers
```
