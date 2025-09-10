#!/usr/bin/env python3
"""
Simple script to test if the Flask API is working
"""

import requests
import json

def test_api():
    base_url = "http://localhost:5000"
    
    print("Testing Flask API...")
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
        
        # Test watches endpoint
        print("3. Testing watches endpoint...")
        response = requests.get(f"{base_url}/watches/all")
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            watches = response.json()
            print(f"   Found {len(watches)} watches")
        else:
            print(f"   Error: {response.text}")
        print()
        
        print("API test completed!")
        
    except requests.exceptions.ConnectionError:
        print("❌ ERROR: Cannot connect to API at http://localhost:5000")
        print("   Make sure your Flask API is running!")
        print("   Run: cd FlaskAPI/src && python app.py")
    except Exception as e:
        print(f"❌ ERROR: {e}")

if __name__ == "__main__":
    test_api()
