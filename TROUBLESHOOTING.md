# 🔧 Login Troubleshooting Guide

## 🚨 **Why You Can't Login - Common Issues & Solutions**

### **Issue 1: Flask API Not Running**
**Symptoms:** Login fails with "Login failed. Please try again." error

**Solution:**
1. **Start your Flask API:**
   ```bash
   cd FlaskAPI/src
   python app.py
   ```
2. **Verify API is running:** Open http://localhost:5000 in browser
3. **You should see:** "Vintage Timepiece Evaluation and Trading Platform"

### **Issue 2: No Users in Database**
**Symptoms:** "Invalid email, password, or role" error

**Solution:**
1. **Use Demo Accounts** (I've added these to the login page):
   - **Admin:** admin@demo.com / admin123
   - **Seller:** seller@demo.com / seller123  
   - **Buyer:** buyer@demo.com / buyer123
   - **Appraiser:** appraiser@demo.com / appraiser123
   - **Support:** support@demo.com / support123

2. **Or create real users via registration:**
   - Go to http://localhost:3000/register
   - Create accounts with different roles

### **Issue 3: CORS Errors**
**Symptoms:** Network errors in browser console

**Solution:**
✅ **FIXED!** I've added CORS support to your Flask API. Make sure to restart your Flask server after the changes.

### **Issue 4: Port Conflicts**
**Symptoms:** "Port 5000 already in use" or "Port 3000 already in use"

**Solution:**
1. **Kill existing processes:**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID_NUMBER> /F
   
   netstat -ano | findstr :3000  
   taskkill /PID <PID_NUMBER> /F
   ```

2. **Or use different ports:**
   - Flask: Change port in `FlaskAPI/src/app.py` (line 44)
   - React: `npm start` will prompt to use different port

## 🚀 **Quick Start Guide**

### **Method 1: Use the Batch File (Windows)**
```bash
# Double-click or run:
start_application.bat
```

### **Method 2: Manual Start**
```bash
# Terminal 1 - Start Flask API
cd FlaskAPI/src
python app.py

# Terminal 2 - Start React Frontend  
cd vintage-watch-frontend-new
npm start
```

### **Method 3: Test API First**
```bash
# Test if API is working
python test_api.py
```

## 🔍 **Step-by-Step Debugging**

### **Step 1: Check Flask API**
1. Open http://localhost:5000
2. Should see: "Vintage Timepiece Evaluation and Trading Platform"
3. If not working, check Flask console for errors

### **Step 2: Check React Frontend**
1. Open http://localhost:3000
2. Should see login page
3. If not working, check React console for errors

### **Step 3: Test Login**
1. Use demo account: **admin@demo.com** / **admin123** / **admin**
2. Should redirect to dashboard
3. If fails, check browser console for errors

### **Step 4: Check Network Tab**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to login
4. Look for failed requests (red entries)

## 🛠️ **Common Error Messages & Solutions**

### **"Login failed. Please try again."**
- **Cause:** API not running or CORS issues
- **Solution:** Start Flask API, check CORS configuration

### **"Invalid email, password, or role"**
- **Cause:** No users in database or wrong credentials
- **Solution:** Use demo accounts or register new users

### **"Network Error" or "CORS Error"**
- **Cause:** Frontend can't reach backend
- **Solution:** Check API is running, CORS is configured

### **"Cannot GET /users/all"**
- **Cause:** API endpoint not working
- **Solution:** Check Flask routes, database connection

## 📱 **Demo Accounts (Always Available)**

Even if your API is down, these demo accounts will work:

| Role | Email | Password | Features |
|------|-------|----------|----------|
| **Admin** | admin@demo.com | admin123 | User management, transactions, settings |
| **Seller** | seller@demo.com | seller123 | List watches, request appraisals |
| **Buyer** | buyer@demo.com | buyer123 | Browse watches, make purchases |
| **Appraiser** | appraiser@demo.com | appraiser123 | Evaluate watches, create reports |
| **Support** | support@demo.com | support123 | Handle feedback, manage tickets |

## 🔧 **Advanced Troubleshooting**

### **Check Flask Logs**
```bash
cd FlaskAPI/src
python app.py
# Look for error messages in console
```

### **Check React Logs**
```bash
cd vintage-watch-frontend-new
npm start
# Look for error messages in console
```

### **Check Database Connection**
- Make sure your database is running
- Check connection string in Flask config
- Verify database has users table

### **Check Dependencies**
```bash
# Flask API
cd FlaskAPI/src
pip install -r ../requirements.txt

# React Frontend
cd vintage-watch-frontend-new
npm install
```

## 🆘 **Still Having Issues?**

1. **Check both consoles** (Flask and React) for error messages
2. **Try demo accounts** first to isolate the issue
3. **Check browser console** (F12) for JavaScript errors
4. **Verify ports** 3000 and 5000 are available
5. **Restart both applications** completely

## 📞 **Quick Test Commands**

```bash
# Test API directly
curl http://localhost:5000/users/all

# Test if ports are in use
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Check Python packages
pip list | findstr flask
pip list | findstr cors
```

---

**💡 Pro Tip:** Always start with the demo accounts first to verify the frontend is working, then troubleshoot the API connection!
