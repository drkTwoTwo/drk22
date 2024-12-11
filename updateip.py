import requests
import time

# Cloudflare details
API_TOKEN = "ctjNRa8S-OkFJAoyRhDGQr5R2f3pSW75CQYUT-pN"
ZONE_ID = "565326380478cc7af13a1c1c50d34407"
DNS_RECORD_NAME = "drk22.fun"

# Function to get the current public IP address (IPv4 or IPv6)
def get_public_ip(ip_version=""):
    url = f"https://api{ip_version}.ipify.org?format=json"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()["ip"]
    except requests.RequestException as e:
        print(f"Error fetching public {ip_version} IP: {e}")
        return None

# Function to find the DNS record ID by name and type (A or AAAA)
def get_dns_record_id(record_type):
    url = f"https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/dns_records"
    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json",
    }
    params = {
        "name": DNS_RECORD_NAME,
        "type": record_type,
    }
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        result = response.json()
        if result.get("success") and result["result"]:
            return result["result"][0]["id"]
        else:
            print(f"No {record_type} DNS record found for {DNS_RECORD_NAME}")
            return None
    except requests.RequestException as e:
        print(f"Error fetching DNS record ID for {record_type}: {e}")
        return None

# Function to update the Cloudflare DNS record
def update_cloudflare_dns(record_type, ip):
    dns_record_id = get_dns_record_id(record_type)
    if not dns_record_id:
        return

    url = f"https://api.cloudflare.com/client/v4/zones/{ZONE_ID}/dns_records/{dns_record_id}"
    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json",
    }
    data = {
        "type": record_type,  # "A" for IPv4, "AAAA" for IPv6
        "name": DNS_RECORD_NAME,
        "content": ip,
        "ttl": 1,  # Automatic TTL
        "proxied": False,  # Set to True if you want Cloudflare proxying enabled
    }

    try:
        response = requests.put(url, headers=headers, json=data)
        response.raise_for_status()
        result = response.json()

        if result.get("success"):
            print(f"Successfully updated {record_type} DNS record to IP: {ip}")
        else:
            print(f"Failed to update {record_type} DNS record: {result}")

    except requests.RequestException as e:
        print(f"Error updating {record_type} Cloudflare DNS: {e}")

if __name__ == "__main__":
    while True:
        # Fetch the current public IPv4 and IPv6 addresses
        ipv4 = get_public_ip("")
        ipv6 = get_public_ip("6")

        if ipv4:
            print(f"Current public IPv4: {ipv4}")
            update_cloudflare_dns("A", ipv4)

        if ipv6:
            print(f"Current public IPv6: {ipv6}")
            update_cloudflare_dns("AAAA", ipv6)

        # Wait before checking again (e.g., every 10 minutes)
        time.sleep(600)
