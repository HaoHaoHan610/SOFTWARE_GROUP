#!/usr/bin/env python3
"""
Test connection to Flask API from your specific IP
"""

import requests
import json

def test_connection():
    base_url = "http://172.31.80.1:5000"
    
    print("Testing Flask API connection...")
    print("=" * 50)
    
    try:
        # Test home endpoint
        print("1. Testing home endpoint...")
        response = requests.get(f"{base_url}/")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.text[:100]}...")
        print()
        
        # Test users endpoint
        print("2. Testing users endpoint...")
        response = requests.get(f"{base_url}/users/all")
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            users = response.json()
            print(f"   Found {len(users)} users")
            if users:
                print(f"   First user: {users[0]}")
        else:
            print(f"   Error: {response.text}")
        print()
        
        print("✅ API connection successful!")
        
    except requests.exceptions.ConnectionError:
        print("❌ ERROR: Cannot connect to API at http://172.31.80.1:5000")
        print("   Make sure your Flask API is running with host=0.0.0.0")
        print("   Run: restart_api.bat")
    except Exception as e:
        print(f"❌ ERROR: {e}")

if __name__ == "__main__":
    test_connection()
