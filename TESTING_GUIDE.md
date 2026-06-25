# 🚀 Quick Start Guide - Testing Mobile Zone API

## Prerequisites

- Node.js installed
- PostgreSQL running
- Environment variables configured (.env file)

---

## 1️⃣ Start the Server

```bash
cd d:\PostgreSQL\ Development\basit-mobile-zone
npm run dev
```

**Expected Output:**
```
Server is running on port http://localhost:3000
```

---

## 2️⃣ Test User Registration (Create Account)

**Option A: Using cURL**
```bash
curl -X POST http://localhost:3000/api/v1/user/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNo": "+1-234-567-8900",
    "password": "SecurePass123"
  }'
```

**Option B: Using PowerShell**
```powershell
$body = @{
    fullName = "John Doe"
    email = "john@example.com"
    phoneNo = "+1-234-567-8900"
    password = "SecurePass123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/v1/user/auth/register" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

**Option C: Using Postman**
1. Open Postman
2. Create **New Request** → **POST**
3. URL: `http://localhost:3000/api/v1/user/auth/register`
4. **Body** tab → **raw** → **JSON**
5. Paste the request body above
6. Click **Send**

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User created successfully!",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phoneNo": "+1-234-567-8900",
      "role": "STAFF",
      "createdAt": "2026-05-22T10:30:00Z",
      "updatedAt": "2026-05-22T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 3️⃣ Test User Login

**cURL:**
```bash
curl -X POST http://localhost:3000/api/v1/user/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**PowerShell:**
```powershell
$body = @{
    email = "john@example.com"
    password = "SecurePass123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/v1/user/auth/login" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful!",
  "data": {
    "user": { ... same as above ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 4️⃣ Test Device Creation (Add New Phone)

**cURL:**
```bash
curl -X POST http://localhost:3000/api/v1/device/create \
  -H "Content-Type: application/json" \
  -d '{
    "imei": "356938035643809",
    "brand": "Apple",
    "model": "iPhone 15 Pro",
    "color": "Space Black",
    "storage": "256GB",
    "purchaseDate": "2026-05-20"
  }'
```

**PowerShell:**
```powershell
$body = @{
    imei = "356938035643809"
    brand = "Apple"
    model = "iPhone 15 Pro"
    color = "Space Black"
    storage = "256GB"
    purchaseDate = "2026-05-20"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/v1/device/create" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Device created successfully",
  "data": {
    "device": {
      "id": "660e8400-e29b-41d4-a716-446655440111",
      "imei": "356938035643809",
      "brand": "Apple",
      "model": "iPhone 15 Pro",
      "color": "Space Black",
      "storage": "256GB",
      "purchaseDate": "2026-05-20T00:00:00Z",
      "status": "IN_STOCK",
      "createdAt": "2026-05-22T10:35:00Z"
    }
  }
}
```

**⚠️ IMPORTANT:** Save the device ID (`660e8400-e29b-41d4-a716-446655440111`) for next tests!

---

## 5️⃣ Test Get Device by IMEI

**cURL:**
```bash
curl -X GET http://localhost:3000/api/v1/device/by-imei/356938035643809
```

**PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/v1/device/by-imei/356938035643809" `
  -Method GET
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Device retrieved successfully",
  "data": {
    "device": { ... same as step 4 ... }
  }
}
```

---

## 6️⃣ Test Get Device by ID

**cURL:**
```bash
curl -X GET http://localhost:3000/api/v1/device/660e8400-e29b-41d4-a716-446655440111
```

**PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/v1/device/660e8400-e29b-41d4-a716-446655440111" `
  -Method GET
```

---

## 7️⃣ Test Get All Devices (with Pagination)

**cURL:**
```bash
# Get all devices (page 1, 10 items per page)
curl -X GET "http://localhost:3000/api/v1/device?page=1&limit=10"

# Get page 2 with 20 items per page
curl -X GET "http://localhost:3000/api/v1/device?page=2&limit=20"

# Filter by status
curl -X GET "http://localhost:3000/api/v1/device?status=IN_STOCK"

# Filter by brand
curl -X GET "http://localhost:3000/api/v1/device?brand=Apple"

# Combine filters
curl -X GET "http://localhost:3000/api/v1/device?page=1&limit=10&status=IN_STOCK&brand=Apple"
```

**PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/v1/device?page=1&limit=10" `
  -Method GET
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Devices retrieved successfully",
  "data": {
    "devices": [
      { ... device 1 ... },
      { ... device 2 ... }
    ],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 10,
      "pages": 3
    }
  }
}
```

---

## 8️⃣ Test Search Devices

**cURL:**
```bash
# Search by brand
curl -X GET "http://localhost:3000/api/v1/device/search?brand=Apple"

# Search by exact IMEI
curl -X GET "http://localhost:3000/api/v1/device/search?imei=356938035643809"

# Search by status
curl -X GET "http://localhost:3000/api/v1/device/search?status=IN_STOCK"

# Complex search
curl -X GET "http://localhost:3000/api/v1/device/search?brand=Apple&model=iPhone&status=IN_STOCK"
```

---

## 9️⃣ Test Update Device (Mark as Sold)

**cURL:**
```bash
curl -X PUT http://localhost:3000/api/v1/device/660e8400-e29b-41d4-a716-446655440111 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "SOLD"
  }'
```

**PowerShell:**
```powershell
$body = @{
    status = "SOLD"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/v1/device/660e8400-e29b-41d4-a716-446655440111" `
  -Method PUT `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Device updated successfully",
  "data": {
    "device": {
      "id": "660e8400-e29b-41d4-a716-446655440111",
      "imei": "356938035643809",
      "brand": "Apple",
      "model": "iPhone 15 Pro",
      "color": "Space Black",
      "storage": "256GB",
      "purchaseDate": "2026-05-20T00:00:00Z",
      "status": "SOLD",
      "createdAt": "2026-05-22T10:35:00Z"
    }
  }
}
```

---

## 🔟 Test Update Device Status Options

**Available Status Values:**
- `IN_STOCK` - Device in inventory
- `SOLD` - Device sold
- `UNDER_REPAIR` - Device being repaired
- `RETURNED` - Device returned

**Examples:**
```bash
# Mark as under repair
curl -X PUT http://localhost:3000/api/v1/device/660e8400-e29b-41d4-a716-446655440111 \
  -H "Content-Type: application/json" \
  -d '{ "status": "UNDER_REPAIR" }'

# Mark as returned
curl -X PUT http://localhost:3000/api/v1/device/660e8400-e29b-41d4-a716-446655440111 \
  -H "Content-Type: application/json" \
  -d '{ "status": "RETURNED" }'

# Update color and storage
curl -X PUT http://localhost:3000/api/v1/device/660e8400-e29b-41d4-a716-446655440111 \
  -H "Content-Type: application/json" \
  -d '{
    "color": "Titanium Blue",
    "storage": "512GB"
  }'
```

---

## 1️⃣1️⃣ Test Delete Device

**cURL:**
```bash
curl -X DELETE http://localhost:3000/api/v1/device/660e8400-e29b-41d4-a716-446655440111
```

**PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/v1/device/660e8400-e29b-41d4-a716-446655440111" `
  -Method DELETE
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Device deleted successfully"
}
```

---

## 🧪 Test Error Scenarios

### Invalid IMEI (Less than 15 digits)
```bash
curl -X POST http://localhost:3000/api/v1/device/create \
  -H "Content-Type: application/json" \
  -d '{
    "imei": "12345",
    "brand": "Apple",
    "model": "iPhone"
  }'
```

**Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "statusCode": 400,
  "errors": {
    "imei": "Please provide a valid IMEI (15 digits)"
  }
}
```

### Duplicate IMEI
```bash
# Create device 1
curl -X POST http://localhost:3000/api/v1/device/create \
  -H "Content-Type: application/json" \
  -d '{
    "imei": "356938035643809",
    "brand": "Apple",
    "model": "iPhone 15 Pro"
  }'

# Try to create device 2 with same IMEI
curl -X POST http://localhost:3000/api/v1/device/create \
  -H "Content-Type: application/json" \
  -d '{
    "imei": "356938035643809",
    "brand": "Samsung",
    "model": "Galaxy S24"
  }'
```

**Response (409):**
```json
{
  "success": false,
  "message": "IMEI already in use",
  "statusCode": 409,
  "errors": {
    "imei": "This device is already registered"
  }
}
```

### Invalid Email (Registration)
```bash
curl -X POST http://localhost:3000/api/v1/user/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "invalid-email",
    "phoneNo": "+1-234-567-8900",
    "password": "SecurePass123"
  }'
```

**Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "statusCode": 400,
  "errors": {
    "email": "Please provide a valid email address"
  }
}
```

### Weak Password
```bash
curl -X POST http://localhost:3000/api/v1/user/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNo": "+1-234-567-8900",
    "password": "weak"
  }'
```

**Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "statusCode": 400,
  "errors": {
    "password": "Password must be at least 6 characters with uppercase and number"
  }
}
```

---

## 📝 Valid Test IMEI Numbers

Use these for testing (all are Luhn-valid 15-digit numbers):

```
356938035643809  ✅ Apple
490154203237518  ✅ Samsung
860088010291876  ✅ Generic
013800110500033  ✅ Generic
490154203237515  ✅ Generic
```

---

## 📊 Complete Testing Checklist

- [ ] User Registration
  - [ ] Valid data
  - [ ] Duplicate email
  - [ ] Invalid email format
  - [ ] Weak password
  - [ ] Missing fields

- [ ] User Login
  - [ ] Valid credentials
  - [ ] Wrong password
  - [ ] Non-existent user
  - [ ] Invalid email format

- [ ] Device Creation
  - [ ] Valid IMEI
  - [ ] Invalid IMEI (not 15 digits)
  - [ ] Invalid IMEI (Luhn fails)
  - [ ] Duplicate IMEI
  - [ ] Invalid brand/model length
  - [ ] Invalid storage format

- [ ] Device Retrieval
  - [ ] By IMEI
  - [ ] By ID
  - [ ] All devices (pagination)
  - [ ] Search by brand
  - [ ] Search by model
  - [ ] Search by status

- [ ] Device Update
  - [ ] Change status
  - [ ] Update details
  - [ ] Multiple fields

- [ ] Device Delete
  - [ ] Delete existing device
  - [ ] Delete non-existent device

---

## 🎯 Next Steps

1. ✅ Follow all steps above
2. ✅ Check all responses match expected format
3. ✅ Test error scenarios
4. ✅ Try different combinations
5. ✅ Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for full details
6. ✅ Check [CHANGELOG.md](CHANGELOG.md) for what changed

---

## 💡 Tips

- **Save Device ID:** When creating a device, save the returned ID for use in update/delete operations
- **Test with Postman:** More visual and easier to manage multiple requests
- **Check Status Codes:** Verify HTTP status codes in responses
- **Read Error Messages:** Error messages are descriptive and show what needs to be fixed
- **Use Valid IMEIs:** Always use valid 15-digit IMEIs for testing

---

## ❓ Troubleshooting

**Server won't start:**
```bash
# Check if port 3000 is already in use
netstat -ano | findstr :3000

# Kill the process if needed
taskkill /PID <PID> /F

# Restart the server
npm run dev
```

**IMEI validation fails:**
- Ensure IMEI is exactly 15 digits
- Use valid test IMEIs from the list above
- Check for typos

**API returns 500 error:**
- Check server logs for error details
- Ensure database is running
- Verify .env file is configured correctly

---

**Happy Testing! 🎉**

For detailed API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
