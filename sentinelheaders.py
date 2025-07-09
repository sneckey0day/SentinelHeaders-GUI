#!/usr/bin/env python3

#### AI CODER HERE ####
#### SNECKEY0DAY ####


"""
HTTP Security Headers Scanner v3.0
A professional-grade security assessment tool for web applications.
Copyright (c) 2025 Security Headers Scanner. All rights reserved.
"""

import argparse
import csv
import json
import os
import sys
import time
import random
import threading
from datetime import datetime
from typing import Dict, List, Optional, Tuple
from urllib.parse import urlparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Color codes for terminal output
class Colors:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'
    WHITE = '\033[97m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    DIM = '\033[2m'
    RESET = '\033[0m'

def print_banner():
    """Print the professional security tool banner."""
    banner = f"""
{Colors.CYAN}┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│    {Colors.BOLD}[#] HTTP SECURITY HEADERS SCANNER v3.0{Colors.RESET}{Colors.CYAN}                                       │
│                                                                                 │
│    {Colors.WHITE}[*] Professional Security Assessment Tool{Colors.RESET}{Colors.CYAN}                                    │
│    {Colors.DIM}[*] WAF Bypass | Threading | Security Policy Analysis{Colors.RESET}{Colors.CYAN}                        │
│    {Colors.DIM}[*] Copyright (c) 2025 Security Headers Scanner{Colors.RESET}{Colors.CYAN}                              │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘{Colors.RESET}
"""
    print(banner)

def print_separator(char="─", length=81):
    """Print a separator line."""
    print(f"{Colors.BLUE}{char * length}{Colors.RESET}")

def print_section_header(title: str):
    """Print a formatted section header."""
    print(f"\n{Colors.BOLD}{Colors.BLUE}[+] {title.upper()}{Colors.RESET}")
    print_separator()

class SecurityHeadersScanner:
    """Main scanner class for HTTP security headers."""
    
    def __init__(self, timeout: int = 10, user_agent: str = None, proxy: str = None, 
                 delay: float = 0.5, threads: int = 1):
        self.timeout = timeout
        self.user_agent = user_agent or self._get_random_user_agent()
        self.proxy = proxy
        self.delay = delay
        self.threads = threads
        self.session = self._create_session()
        self.lock = threading.Lock()
        
        # Define security headers and their impact
        self.security_headers = {
            'Cross-Origin-Resource-Policy': {
                'description': 'Prevents other sites from loading this resource unless allowed.',
                'severity': 'MEDIUM',
                'points': 8,
                'example': 'Cross-Origin-Resource-Policy: same-origin',
                'purpose': 'Mitigates data leaks via embedded resources.',
                'impact': 'Prevents resource access from different origins, reducing attack surface.'
            },
            'X-Powered-By': {
                'description': 'Reveals technology stack, which can aid attackers.',
                'severity': 'LOW',
                'points': 4,
                'example': 'X-Powered-By: Express',
                'purpose': 'Should be removed to avoid leaking implementation details.',
                'impact': 'Leaking technology (e.g., PHP/ASP.NET) may guide targeted exploitation.'
            },

            'Set-Cookie': {
                'description': 'Must enforce HttpOnly, Secure, and SameSite attributes for cookies.',
                'severity': 'HIGH',
                'points': 15,
                'example': 'Set-Cookie: sessionid=abc123; Secure; HttpOnly; SameSite=Strict',
                'purpose': 'Ensures session cookies are protected from XSS, interception, and CSRF.',
                'impact': 'Weak cookie settings may lead to session hijacking or XSS attacks.'
            },
            'Cache-Control': {
                'description': 'Controls browser caching behavior of responses.',
                'severity': 'MEDIUM',
                'points': 10,
                'example': 'Cache-Control: no-store, no-cache, must-revalidate',
                'purpose': 'Sensitive data should not be cached on client-side or intermediary servers.',
                'impact': 'Improper caching may expose sensitive information to unauthorized users.'
            },
            'Strict-Transport-Security': {
                'description': 'Forces HTTPS connections and prevents protocol downgrade attacks',
                'purpose': 'Protects against man-in-the-middle attacks by ensuring HTTPS',
                'example': 'max-age=31536000; includeSubDomains; preload',
                'severity': 'CRITICAL',
                'points': 25,
                'impact': 'High risk of MITM attacks and protocol downgrade'
            },
            'Content-Security-Policy': {
                'description': 'Prevents XSS attacks by controlling resource loading',
                'purpose': 'Defines approved sources of content to prevent XSS',
                'example': "default-src 'self'; script-src 'self' 'unsafe-inline'",
                'severity': 'CRITICAL',
                'points': 25,
                'impact': 'High risk of XSS and code injection attacks'
            },
            'X-Frame-Options': {
                'description': 'Prevents clickjacking attacks by controlling iframe embedding',
                'purpose': 'Protects against clickjacking attacks',
                'example': 'DENY or SAMEORIGIN',
                'severity': 'HIGH',
                'points': 15,
                'impact': 'Vulnerable to clickjacking and UI redressing attacks'
            },
            'X-Content-Type-Options': {
                'description': 'Prevents MIME type sniffing attacks',
                'purpose': 'Stops browsers from MIME type sniffing',
                'example': 'nosniff',
                'severity': 'HIGH',
                'points': 15,
                'impact': 'Risk of MIME confusion attacks and content sniffing'
            },
            'Referrer-Policy': {
                'description': 'Controls referrer information leakage',
                'purpose': 'Protects user privacy by controlling referrer data',
                'example': 'strict-origin-when-cross-origin',
                'severity': 'MEDIUM',
                'points': 10,
                'impact': 'Information disclosure through referrer headers'
            },
            'Permissions-Policy': {
                'description': 'Controls browser features and APIs access',
                'purpose': 'Restricts access to sensitive browser features',
                'example': 'geolocation=(), microphone=(), camera=()',
                'severity': 'MEDIUM',
                'points': 10,
                'impact': 'Unauthorized access to browser features and APIs'
            },
            'X-XSS-Protection': {
                'description': 'Enables XSS filtering in legacy browsers',
                'purpose': 'Provides basic XSS protection for older browsers',
                'example': '1; mode=block',
                'severity': 'LOW',
                'points': 5,
                'impact': 'Limited XSS protection in legacy browsers'
            },
            'Cache-Control': {
                'description': 'Controls caching behavior for sensitive content',
                'purpose': 'Prevents caching of sensitive data',
                'example': 'no-cache, no-store, must-revalidate',
                'severity': 'MEDIUM',
                'points': 10,
                'impact': 'Sensitive data exposure through browser cache'
            }
        }
        
        # Security policies to check
        self.security_policies = {
            'HTTPS_Enforcement': 'Checks if site enforces HTTPS',
            'Server_Info_Disclosure': 'Detects server information disclosure',
            'Cookie_Security': 'Analyzes cookie security attributes',
            'Mixed_Content': 'Checks for mixed content issues',
            'Deprecated_Protocols': 'Identifies deprecated protocol usage'
        }
    
    def _get_random_user_agent(self) -> str:
        """Get a random user agent for WAF bypass."""
        user_agents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0"
        ]
        return random.choice(user_agents)
    
    def _create_session(self) -> requests.Session:
        """Create a configured requests session with WAF bypass capabilities."""
        session = requests.Session()
        
        # Configure retry strategy
        retry_strategy = Retry(
            total=3,
            backoff_factor=1,
            status_forcelist=[429, 500, 502, 503, 504],
        )
        
        adapter = HTTPAdapter(max_retries=retry_strategy)
        session.mount("http://", adapter)
        session.mount("https://", adapter)
        
        # WAF bypass headers
        session.headers.update({
            'User-Agent': self.user_agent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'X-Forwarded-For': f"{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}",
            'X-Real-IP': f"{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}",
            'X-Originating-IP': f"{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}"
        })
        
        # Configure proxy if provided
        if self.proxy:
            session.proxies = {
                'http': self.proxy,
                'https': self.proxy
            }
        
        return session
    
    def normalize_url(self, url: str) -> str:
        """Normalize URL by adding protocol if missing."""
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
        return url
    
    def get_security_grade(self, score: int) -> Tuple[str, str]:
        """Get security grade and color based on score."""
        if score >= 90:
            return "A+", Colors.GREEN
        elif score >= 80:
            return "A", Colors.GREEN
        elif score >= 70:
            return "B", Colors.YELLOW
        elif score >= 60:
            return "C", Colors.YELLOW
        elif score >= 50:
            return "D", Colors.RED
        else:
            return "F", Colors.RED
    
    def check_security_policies(self, url: str, response: requests.Response) -> Dict:
        """Check additional security policies."""
        policies = {}
        
        # HTTPS Enforcement
        if url.startswith('https://'):
            policies['HTTPS_Enforcement'] = {
                'status': 'PASS',
                'details': 'Site uses HTTPS'
            }
        else:
            policies['HTTPS_Enforcement'] = {
                'status': 'FAIL',
                'details': 'Site not using HTTPS'
            }
        
        # Server Info Disclosure
        server_header = response.headers.get('Server', '')
        if server_header:
            policies['Server_Info_Disclosure'] = {
                'status': 'WARN',
                'details': f'Server header disclosed: {server_header}'
            }
        else:
            policies['Server_Info_Disclosure'] = {
                'status': 'PASS',
                'details': 'Server header not disclosed'
            }
        
        # Cookie Security
        set_cookie = response.headers.get('Set-Cookie', '')
        if set_cookie:
            if 'Secure' in set_cookie and 'HttpOnly' in set_cookie:
                policies['Cookie_Security'] = {
                    'status': 'PASS',
                    'details': 'Cookies have security attributes'
                }
            else:
                policies['Cookie_Security'] = {
                    'status': 'FAIL',
                    'details': 'Cookies missing security attributes'
                }
        else:
            policies['Cookie_Security'] = {
                'status': 'INFO',
                'details': 'No cookies set'
            }
        
        return policies
    
    def scan_url(self, url: str) -> Dict:
        """Scan a single URL for security headers and policies."""
        normalized_url = self.normalize_url(url)
        
        result = {
            'url': normalized_url,
            'timestamp': datetime.now().isoformat(),
            'status_code': None,
            'headers': {},
            'missing_headers': [],
            'present_headers': [],
            'security_score': 0,
            'security_policies': {},
            'recommendations': [],
            'error': None
        }
        
        try:
            # Add random delay for WAF bypass
            time.sleep(random.uniform(0.1, self.delay))
            
            response = self.session.get(
                normalized_url,
                timeout=self.timeout,
                allow_redirects=True,
                verify=False  # For testing purposes
            )
            
            result['status_code'] = response.status_code
            result['headers'] = dict(response.headers)
            
            # Check security policies
            result['security_policies'] = self.check_security_policies(normalized_url, response)
            # Specific rule check for Set-Cookie flags
            set_cookie_headers = response.headers.get("Set-Cookie", "")
            if set_cookie_headers:
                flags = ['Secure', 'HttpOnly', 'SameSite']
                missing_flags = [f for f in flags if f.lower() not in set_cookie_headers.lower()]
                if missing_flags:
                    result['security_score'] -= 10
                    result['security_policies']['Set-Cookie'] = {
                        'status': 'FAIL',
                        'details': f"Missing attributes: {', '.join(missing_flags)}"
                    }
                else:
                    result['security_policies']['Set-Cookie'] = {
                            'status': 'PASS',
                            'details': "All recommended attributes set"
                        }
            # Check for security headers
            for header_name, header_info in self.security_headers.items():
                if header_name in response.headers:
                    result['present_headers'].append({
                        'name': header_name,
                        'value': response.headers[header_name],
                        'severity': header_info['severity'],
                        'points': header_info['points']
                    })
                    result['security_score'] += header_info['points']
                else:
                    result['missing_headers'].append({
                        'name': header_name,
                        'description': header_info['description'],
                        'severity': header_info['severity'],
                        'example': header_info['example'],
                        'points': header_info['points'],
                        'impact': header_info['impact']
                    })
                    result['recommendations'].append(
                        f"[!] Implement {header_name}: {header_info['description']}"
                    )
            
        except requests.exceptions.RequestException as e:
            result['error'] = str(e)
            
        return result
    
    def print_scan_result(self, result: Dict, verbose: bool = False):
        """Print scan result with professional security tool formatting."""
        url = result['url']
        
        # Print URL header
        print(f"\n{Colors.BOLD}{Colors.BLUE}[+] TARGET: {url}{Colors.RESET}")
        print_separator()
        
        if result['error']:
            print(f"{Colors.RED}[-] ERROR: {result['error']}{Colors.RESET}")
            return
        
        # Status and basic info
        status_color = Colors.GREEN if result['status_code'] == 200 else Colors.YELLOW
        print(f"{Colors.WHITE}[*] Status Code: {status_color}{result['status_code']}{Colors.RESET}")
        
        # Security score and grade
        score = result['security_score']
        grade, grade_color = self.get_security_grade(score)
        print(f"{Colors.WHITE}[*] Security Score: {grade_color}{score}/100 (Grade: {grade}){Colors.RESET}")
        
        # Security policies
        print(f"\n{Colors.BOLD}{Colors.CYAN}[+] SECURITY POLICIES{Colors.RESET}")
        for policy, details in result['security_policies'].items():
            status = details['status']
            if status == 'PASS':
                status_color = Colors.GREEN
                symbol = "[+]"
            elif status == 'FAIL':
                status_color = Colors.RED
                symbol = "[-]"
            elif status == 'WARN':
                status_color = Colors.YELLOW
                symbol = "[!]"
            else:
                status_color = Colors.BLUE
                symbol = "[*]"
            
            print(f"{status_color}{symbol} {policy}: {details['details']}{Colors.RESET}")
        
        # Present headers
        if result['present_headers']:
            print(f"\n{Colors.BOLD}{Colors.GREEN}[+] PRESENT SECURITY HEADERS{Colors.RESET}")
            for header in sorted(result['present_headers'], key=lambda x: x['severity']):
                severity_color = self._get_severity_color(header['severity'])
                print(f"{severity_color}[+] {header['name']:<35} ({header['severity']}){Colors.RESET}")
                if verbose:
                    print(f"{Colors.DIM}    Value: {header['value'][:60]}{'...' if len(header['value']) > 60 else ''}{Colors.RESET}")
        
        # Missing headers
        if result['missing_headers']:
            print(f"\n{Colors.BOLD}{Colors.RED}[-] MISSING SECURITY HEADERS{Colors.RESET}")
            for header in sorted(result['missing_headers'], key=lambda x: x['severity']):
                severity_color = self._get_severity_color(header['severity'])
                print(f"{severity_color}[-] {header['name']:<35} ({header['severity']}) [-{header['points']} pts]{Colors.RESET}")
                if verbose:
                    print(f"{Colors.DIM}    Impact: {header['impact']}{Colors.RESET}")
                    print(f"{Colors.DIM}    Example: {header['example']}{Colors.RESET}")
        
        # Recommendations
        if result['recommendations'] and verbose:
            print(f"\n{Colors.BOLD}{Colors.YELLOW}[!] RECOMMENDATIONS{Colors.RESET}")
            for rec in result['recommendations'][:5]:
                print(f"{Colors.YELLOW}{rec}{Colors.RESET}")
    
    def _get_severity_color(self, severity: str) -> str:
        """Get color for severity level."""
        colors = {
            'CRITICAL': Colors.RED,
            'HIGH': Colors.YELLOW,
            'MEDIUM': Colors.CYAN,
            'LOW': Colors.GREEN
        }
        return colors.get(severity, Colors.WHITE)
    
    def scan_multiple_urls(self, urls: List[str]) -> List[Dict]:
        """Scan multiple URLs with threading support."""
        results = []
        
        if self.threads == 1:
            # Single-threaded scanning
            for i, url in enumerate(urls, 1):
                print(f"\r{Colors.CYAN}[*] Progress: {i}/{len(urls)} ({(i/len(urls))*100:.1f}%){Colors.RESET}", end="", flush=True)
                result = self.scan_url(url)
                results.append(result)
        else:
            # Multi-threaded scanning
            print(f"{Colors.CYAN}[*] Starting {self.threads} threads for scanning{Colors.RESET}")
            with ThreadPoolExecutor(max_workers=self.threads) as executor:
                future_to_url = {executor.submit(self.scan_url, url): url for url in urls}
                completed = 0
                
                for future in as_completed(future_to_url):
                    completed += 1
                    result = future.result()
                    results.append(result)
                    print(f"\r{Colors.CYAN}[*] Progress: {completed}/{len(urls)} ({(completed/len(urls))*100:.1f}%){Colors.RESET}", end="", flush=True)
        
        print()  # New line after progress
        return results
    
    def print_summary(self, results: List[Dict]):
        """Print a comprehensive summary of all scans."""
        print_section_header("SCAN SUMMARY")
        
        total_scanned = len(results)
        successful_scans = [r for r in results if not r['error']]
        failed_scans = total_scanned - len(successful_scans)
        
        if successful_scans:
            avg_score = sum(r['security_score'] for r in successful_scans) / len(successful_scans)
            scores = [r['security_score'] for r in successful_scans]
            
            print(f"{Colors.WHITE}[*] Total URLs Scanned: {total_scanned}{Colors.RESET}")
            print(f"{Colors.GREEN}[+] Successful Scans: {len(successful_scans)}{Colors.RESET}")
            if failed_scans > 0:
                print(f"{Colors.RED}[-] Failed Scans: {failed_scans}{Colors.RESET}")
            print(f"{Colors.BLUE}[*] Average Score: {avg_score:.1f}/100{Colors.RESET}")
            print(f"{Colors.CYAN}[*] Highest Score: {max(scores)}/100{Colors.RESET}")
            print(f"{Colors.YELLOW}[*] Lowest Score: {min(scores)}/100{Colors.RESET}")
            
            # Grade distribution
            grades = {}
            for result in successful_scans:
                grade, _ = self.get_security_grade(result['security_score'])
                grades[grade] = grades.get(grade, 0) + 1
            
            print(f"\n{Colors.BOLD}[+] GRADE DISTRIBUTION{Colors.RESET}")
            for grade in ['A+', 'A', 'B', 'C', 'D', 'F']:
                if grade in grades:
                    print(f"{Colors.WHITE}[*] {grade}: {grades[grade]} sites{Colors.RESET}")
    
    def save_to_csv(self, results: List[Dict], filename: str):
        """Save detailed results to CSV file with one row per missing header."""
        if not filename.endswith('.csv'):
            filename += '.csv'
        
        csv_data = []
        
        for result in results:
            url = result['url']
            
            # If no missing headers, add one row with all present headers
            if not result['missing_headers']:
                csv_data.append({
                    'url': url,
                    'timestamp': result['timestamp'],
                    'status_code': result['status_code'],
                    'security_score': result['security_score'],
                    'missing_header': 'None',
                    'severity': 'N/A',
                    'impact': 'All headers present',
                    'error': result['error'] or ''
                })
            else:
                # Add one row for each missing header
                for header in result['missing_headers']:
                    csv_data.append({
                        'url': url,
                        'timestamp': result['timestamp'],
                        'status_code': result['status_code'],
                        'security_score': result['security_score'],
                        'missing_header': header['name'],
                        'severity': header['severity'],
                        'impact': header['impact'],
                        'error': result['error'] or ''
                    })
        
        # Write to CSV
        fieldnames = ['url', 'missing_header', 'impact', 'severity', 'security_score', 'status_code', 'timestamp', 'error']
        
        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(csv_data)
        
        print(f"\n{Colors.GREEN}[+] Results saved to: {filename}{Colors.RESET}")
        print(f"{Colors.BLUE}[*] Total records: {len(csv_data)}{Colors.RESET}")
    
    def print_headers_reference(self):
        """Print detailed security headers reference."""
        print_banner()
        print_section_header("SECURITY HEADERS REFERENCE")
        
        for header_name, info in self.security_headers.items():
            severity_color = self._get_severity_color(info['severity'])
            
            print(f"\n{Colors.BOLD}{Colors.WHITE}[+] {header_name}{Colors.RESET}")
            print(f"{Colors.WHITE}[*] Severity: {severity_color}{info['severity']}{Colors.RESET} {Colors.DIM}({info['points']} points){Colors.RESET}")
            print(f"{Colors.WHITE}[*] Purpose: {info['purpose']}{Colors.RESET}")
            print(f"{Colors.WHITE}[*] Impact: {info['impact']}{Colors.RESET}")
            print(f"{Colors.WHITE}[*] Example: {Colors.CYAN}{info['example']}{Colors.RESET}")

def load_urls_from_file(filename: str) -> List[str]:
    """Load URLs from a file with better error handling."""
    urls = []
    
    if not os.path.exists(filename):
        print(f"{Colors.RED}[-] Error: File '{filename}' not found{Colors.RESET}")
        sys.exit(1)
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                line = line.strip()
                if line and not line.startswith('#'):
                    urls.append(line)
        
        if not urls:
            print(f"{Colors.RED}[-] Error: No valid URLs found in '{filename}'{Colors.RESET}")
            sys.exit(1)
            
    except Exception as e:
        print(f"{Colors.RED}[-] Error reading file '{filename}': {e}{Colors.RESET}")
        sys.exit(1)
    
    return urls

def main():
    """Main function."""
    parser = argparse.ArgumentParser(
        description='HTTP Security Headers Scanner v3.0 - Professional security assessment tool',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=f"""
{Colors.BOLD}USAGE EXAMPLES:{Colors.RESET}
  %(prog)s -u https://example.com
  %(prog)s -u example.com -v --delay 2
  %(prog)s -f urls.txt -o security_report --threads 5
  %(prog)s -f websites.txt -v --proxy http://127.0.0.1:8080
  %(prog)s --help-headers

{Colors.BOLD}SECURITY HEADERS CHECKED:{Colors.RESET}
  [!] CRITICAL: Strict-Transport-Security, Content-Security-Policy
  [!] HIGH:     X-Frame-Options, X-Content-Type-Options  
  [!] MEDIUM:   Referrer-Policy, Permissions-Policy, Cache-Control
  [!] LOW:      X-XSS-Protection
        """
    )
    
    # Main options
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('-u', '--url', help='Single URL to scan')
    group.add_argument('-f', '--file', help='File containing URLs (one per line)')
    group.add_argument('--help-headers', action='store_true', 
                      help='Show detailed security headers reference')
    
    # Output options
    parser.add_argument('-o', '--output', help='Save results to CSV file (auto-adds .csv)')
    parser.add_argument('-v', '--verbose', action='store_true',
                       help='Show detailed output with recommendations')
    
    # Request options
    parser.add_argument('--timeout', type=int, default=10,
                       help='Request timeout in seconds (default: 10)')
    parser.add_argument('--delay', type=float, default=0.5,
                       help='Delay between requests in seconds (default: 0.5)')
    parser.add_argument('--threads', type=int, default=1,
                       help='Number of threads for concurrent scanning (default: 1)')
    parser.add_argument('--proxy', help='HTTP proxy (e.g., http://127.0.0.1:8080)')
    parser.add_argument('--user-agent', help='Custom User-Agent string')
    parser.add_argument('--no-color', action='store_true', help='Disable colored output')
    
    args = parser.parse_args()
    
    # Disable colors if requested
    if args.no_color:
        for attr in dir(Colors):
            if not attr.startswith('_'):
                setattr(Colors, attr, '')
    
    # Initialize scanner
    scanner = SecurityHeadersScanner(
        timeout=args.timeout,
        user_agent=args.user_agent,
        proxy=args.proxy,
        delay=args.delay,
        threads=args.threads
    )
    
    # Show headers reference
    if args.help_headers:
        scanner.print_headers_reference()
        return
    
    # Print banner
    print_banner()
    
    # Print configuration
    print(f"{Colors.BLUE}[*] Configuration:{Colors.RESET}")
    print(f"{Colors.WHITE}    Timeout: {args.timeout}s{Colors.RESET}")
    print(f"{Colors.WHITE}    Delay: {args.delay}s{Colors.RESET}")
    print(f"{Colors.WHITE}    Threads: {args.threads}{Colors.RESET}")
    if args.proxy:
        print(f"{Colors.WHITE}    Proxy: {args.proxy}{Colors.RESET}")
    
    # Determine URLs to scan
    if args.url:
        urls = [args.url]
        print_section_header("SINGLE URL SCAN")
    else:
        urls = load_urls_from_file(args.file)
        print(f"{Colors.GREEN}[+] Loaded {len(urls)} URLs from {args.file}{Colors.RESET}")
    
    # Perform scanning
    try:
        start_time = time.time()
        
        if len(urls) == 1:
            result = scanner.scan_url(urls[0])
            results = [result]
        else:
            results = scanner.scan_multiple_urls(urls)
        
        # Display results
        for result in results:
            scanner.print_scan_result(result, verbose=args.verbose)
        
        # Show summary for multiple URLs
        if len(results) > 1:
            scanner.print_summary(results)
        
        # Save to CSV if requested
        if args.output:
            scanner.save_to_csv(results, args.output)
        
        # Final timing
        elapsed = time.time() - start_time
        print(f"\n{Colors.GREEN}[+] Scan completed in {elapsed:.2f} seconds{Colors.RESET}")
        
    except KeyboardInterrupt:
        print(f"\n{Colors.YELLOW}[!] Scan interrupted by user{Colors.RESET}")
        sys.exit(1)
    except Exception as e:
        print(f"\n{Colors.RED}[-] Unexpected error: {e}{Colors.RESET}")
        sys.exit(1)

if __name__ == '__main__':
    main()
