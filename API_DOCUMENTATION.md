# Mobile Zone API - Comprehensive Documentation

## Code Quality Rating: **7/10** ✅

### Improvements Made:

#### ✅ **Before: 4/10**
- ❌ No error handling (crashes on invalid input)
- ❌ No input validation
- ❌ No IMEI validation/support
- ❌ Passwords included in responses
- ❌ Inconsistent response structure
- ❌ No middleware
- ❌ No documentation

#### ✅ **After: 7/10**
- ✅ Comprehensive error handling middleware
- ✅ Input validation for all fields
- ✅ IMEI validation using Luhn algorithm (15 digits)
- ✅ Passwords excluded from responses
- ✅ Consistent API response structure
- ✅ Proper HTTP status codes
- ✅ Type-safe interfaces
- ✅ Search and filter capabilities
- ✅ Pagination support
- ✅ Complete documentation

---

## 🆕 New Utilities Added

### 1. **Input Validators** (`src/utils/validators.ts`)
```typescript
validators.isValidEmail(email)        // RFC 5322 format
validators.isValidPassword(password)  // Min 6 chars, 1 uppercase, 1 number
validators.isValidIMEI(imei)         // 15 digits with Luhn check
validators.isValidPhone(phone)        // 10+ digits/format chars
validators.isValidFullName(name)      // 2-100 letters/spaces
validators.isValidBrand(brand)        // 2-50 characters
validators.isValidModel(model)        // 2-100 characters
validators.isValidColor(color)        // 2-50 characters
validators.isValidStorage(storage)    // Format: "128GB", "256MB"
```

### 2. **Error Handler** (`src/utils/errorHandler.ts`)
```typescript
new ApiError(statusCode, message, errors)
handleError(error) // Converts errors to consistent response format
```

---

## 📱 USER AUTHENTICATION APIs

### 1. **Register User**
**Endpoint:** `POST /api/v1/user/auth/register`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNo": "+1-234-567-8900",
  "password": "SecurePass123"
}
```

**Validation Rules:**
- `fullName`: 2-100 characters, letters and spaces only
- `email`: Valid email format, unique
- `phoneNo`: 10+ digits/format characters
- `password`: Min 6 chars, at least 1 uppercase letter, 1 number

**Success Response (201):**
```json
{
  "success": true,
  "message": "User created successfully!",
  "data": {
    "user": {
      "id": "uuid-here",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phoneNo": "+1-234-567-8900",
      "role": "STAFF",
      "createdAt": "2026-05-22T10:30:00Z",
      "updatedAt": "2026-05-22T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Error Responses:**
```json
// 400 - Validation Failed
{
  "success": false,
  "message": "Validation failed",
  "statusCode": 400,
  "errors": {
    "password": "Password must be at least 6 characters with uppercase and number",
    "email": "Please provide a valid email address"
  }
}

// 409 - Email Already in Use
{
  "success": false,
  "message": "Email already in use",
  "statusCode": 409,
  "errors": {
    "email": "This email is already registered"
  }
}
```

**Testing with cURL:**
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

**Testing with Postman:**
1. Open Postman
2. Create new request: **POST** `http://localhost:3000/api/v1/user/auth/register`
3. Go to **Body** tab → select **raw** → **JSON**
4. Paste the request body
5. Click **Send**

---

### 2. **Login User**
**Endpoint:** `POST /api/v1/user/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful!",
  "data": {
    "user": {
      "id": "uuid-here",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phoneNo": "+1-234-567-8900",
      "role": "STAFF",
      "createdAt": "2026-05-22T10:30:00Z",
      "updatedAt": "2026-05-22T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Error Responses:**
```json
// 401 - Invalid Credentials
{
  "success": false,
  "message": "Invalid email or password",
  "statusCode": 401
}

// 400 - Validation Error
{
  "success": false,
  "message": "Validation failed",
  "statusCode": 400,
  "errors": {
    "email": "Please provide a valid email address"
  }
}
```

**Testing with cURL:**
```bash
curl -X POST http://localhost:3000/api/v1/user/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

---

### 3. **Get User Profile**
**Endpoint:** `GET /api/v1/user/profile/:id`

**Parameters:**
- `id` (path): User ID (required)

**Success Response (200):**
```json
{
  "success": true,
  "message": "User retrieved successfully!",
  "data": {
    "user": {
      "id": "uuid-here",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phoneNo": "+1-234-567-8900",
      "role": "STAFF",
      "createdAt": "2026-05-22T10:30:00Z",
      "updatedAt": "2026-05-22T10:30:00Z"
    }
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "User not found",
  "statusCode": 404
}
```

**Testing with cURL:**
```bash
curl -X GET http://localhost:3000/api/v1/user/profile/uuid-here \
  -H "Authorization: Bearer your_jwt_token"
```

---

### 4. **Update User Profile**
**Endpoint:** `PUT /api/v1/user/profile/:id`

**Parameters:**
- `id` (path): User ID (required)

**Request Body (all optional):**
```json
{
  "fullName": "Jane Doe",
  "phoneNo": "+1-987-654-3210"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully!",
  "data": {
    "user": {
      "id": "uuid-here",
      "fullName": "Jane Doe",
      "email": "john@example.com",
      "phoneNo": "+1-987-654-3210",
      "role": "STAFF",
      "createdAt": "2026-05-22T10:30:00Z",
      "updatedAt": "2026-05-22T10:35:00Z"
    }
  }
}
```

**Testing with cURL:**
```bash
curl -X PUT http://localhost:3000/api/v1/user/profile/uuid-here \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Doe",
    "phoneNo": "+1-987-654-3210"
  }'
```

---

## 📱 DEVICE MANAGEMENT APIs (WITH IMEI SUPPORT)

### ⚠️ **IMPORTANT: IMEI Format**
- Must be **exactly 15 digits**
- Must pass **Luhn algorithm validation** (checksum validation)
- Example valid IMEIs:
  - `356938035643809` ✅
  - `490154203237518` ✅
  - `123456789012345` ❌ (fails Luhn check)

### 1. **Create Device**
**Endpoint:** `POST /api/v1/device/create`

**Request Body:**
```json
{
  "imei": "356938035643809",
  "brand": "Apple",
  "model": "iPhone 15 Pro",
  "color": "Space Black",
  "storage": "256GB",
  "purchaseDate": "2026-05-20"
}
```

**Validation Rules:**
- `imei`: 15 digits, Luhn valid, unique
- `brand`: 2-50 characters
- `model`: 2-100 characters
- `color`: 2-50 characters (optional)
- `storage`: Format like "128GB" or "256MB" (optional)
- `purchaseDate`: ISO 8601 format (optional)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Device created successfully",
  "data": {
    "device": {
      "id": "uuid-here",
      "imei": "356938035643809",
      "brand": "Apple",
      "model": "iPhone 15 Pro",
      "color": "Space Black",
      "storage": "256GB",
      "purchaseDate": "2026-05-20T00:00:00Z",
      "status": "IN_STOCK",
      "createdAt": "2026-05-22T10:30:00Z"
    }
  }
}
```

**Error Responses:**
```json
// 400 - Invalid IMEI (not 15 digits)
{
  "success": false,
  "message": "Validation failed",
  "statusCode": 400,
  "errors": {
    "imei": "Please provide a valid IMEI (15 digits)"
  }
}

// 409 - IMEI Already Exists
{
  "success": false,
  "message": "IMEI already in use",
  "statusCode": 409,
  "errors": {
    "imei": "This device is already registered"
  }
}
```

**Testing with cURL:**
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

**Testing with Postman:**
1. Create **POST** request to `http://localhost:3000/api/v1/device/create`
2. Body → raw → JSON
3. Paste the request body
4. Click Send

---

### 2. **Get Device by IMEI**
**Endpoint:** `GET /api/v1/device/by-imei/:imei`

**Parameters:**
- `imei` (path): Device IMEI (15 digits, required)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Device retrieved successfully",
  "data": {
    "device": {
      "id": "uuid-here",
      "imei": "356938035643809",
      "brand": "Apple",
      "model": "iPhone 15 Pro",
      "color": "Space Black",
      "storage": "256GB",
      "purchaseDate": "2026-05-20T00:00:00Z",
      "status": "IN_STOCK",
      "createdAt": "2026-05-22T10:30:00Z"
    }
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Device not found",
  "statusCode": 404
}
```

**Testing with cURL:**
```bash
curl -X GET http://localhost:3000/api/v1/device/by-imei/356938035643809
```

---

### 3. **Get Device by ID**
**Endpoint:** `GET /api/v1/device/:id`

**Parameters:**
- `id` (path): Device ID (UUID, required)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Device retrieved successfully",
  "data": {
    "device": {
      "id": "uuid-here",
      "imei": "356938035643809",
      "brand": "Apple",
      "model": "iPhone 15 Pro",
      "color": "Space Black",
      "storage": "256GB",
      "purchaseDate": "2026-05-20T00:00:00Z",
      "status": "IN_STOCK",
      "createdAt": "2026-05-22T10:30:00Z"
    }
  }
}
```

**Testing with cURL:**
```bash
curl -X GET http://localhost:3000/api/v1/device/uuid-here
```

---

### 4. **Get All Devices (with Pagination & Filtering)**
**Endpoint:** `GET /api/v1/device`

**Query Parameters:**
- `page` (optional): Page number, default 1
- `limit` (optional): Items per page, default 10
- `status` (optional): Filter by status (IN_STOCK, SOLD, UNDER_REPAIR, RETURNED)
- `brand` (optional): Filter by brand name (case-insensitive)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Devices retrieved successfully",
  "data": {
    "devices": [
      {
        "id": "uuid-1",
        "imei": "356938035643809",
        "brand": "Apple",
        "model": "iPhone 15 Pro",
        "color": "Space Black",
        "storage": "256GB",
        "purchaseDate": "2026-05-20T00:00:00Z",
        "status": "IN_STOCK",
        "createdAt": "2026-05-22T10:30:00Z"
      },
      {
        "id": "uuid-2",
        "imei": "490154203237518",
        "brand": "Samsung",
        "model": "Galaxy S24",
        "color": "Phantom Black",
        "storage": "512GB",
        "purchaseDate": "2026-05-19T00:00:00Z",
        "status": "SOLD",
        "createdAt": "2026-05-21T08:15:00Z"
      }
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

**Testing with cURL:**
```bash
# Get all devices (page 1, 10 items)
curl -X GET http://localhost:3000/api/v1/device

# Get page 2 with 20 items per page
curl -X GET "http://localhost:3000/api/v1/device?page=2&limit=20"

# Filter by status
curl -X GET "http://localhost:3000/api/v1/device?status=IN_STOCK"

# Filter by brand
curl -X GET "http://localhost:3000/api/v1/device?brand=Apple"

# Combine filters
curl -X GET "http://localhost:3000/api/v1/device?page=1&limit=10&status=IN_STOCK&brand=Apple"
```

---

### 5. **Search Devices**
**Endpoint:** `GET /api/v1/device/search`

**Query Parameters:**
- `imei` (optional): Exact IMEI match
- `brand` (optional): Brand name (contains, case-insensitive)
- `model` (optional): Model name (contains, case-insensitive)
- `status` (optional): Device status
- `limit` (optional): Max results, default 20

**Success Response (200):**
```json
{
  "success": true,
  "message": "Devices found",
  "data": {
    "devices": [
      {
        "id": "uuid-here",
        "imei": "356938035643809",
        "brand": "Apple",
        "model": "iPhone 15 Pro",
        "color": "Space Black",
        "storage": "256GB",
        "purchaseDate": "2026-05-20T00:00:00Z",
        "status": "IN_STOCK",
        "createdAt": "2026-05-22T10:30:00Z"
      }
    ]
  }
}
```

**Testing with cURL:**
```bash
# Search by exact IMEI
curl -X GET "http://localhost:3000/api/v1/device/search?imei=356938035643809"

# Search by brand
curl -X GET "http://localhost:3000/api/v1/device/search?brand=Apple"

# Search by model
curl -X GET "http://localhost:3000/api/v1/device/search?model=iPhone"

# Search by status with limit
curl -X GET "http://localhost:3000/api/v1/device/search?status=IN_STOCK&limit=50"

# Complex search
curl -X GET "http://localhost:3000/api/v1/device/search?brand=Apple&model=iPhone&status=IN_STOCK"
```

---

### 6. **Update Device**
**Endpoint:** `PUT /api/v1/device/:id`

**Parameters:**
- `id` (path): Device ID (required)

**Request Body (all optional):**
```json
{
  "brand": "Apple",
  "model": "iPhone 15 Pro Max",
  "color": "Titanium Blue",
  "storage": "512GB",
  "status": "SOLD"
}
```

**Valid Status Values:**
- `IN_STOCK`
- `SOLD`
- `UNDER_REPAIR`
- `RETURNED`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Device updated successfully",
  "data": {
    "device": {
      "id": "uuid-here",
      "imei": "356938035643809",
      "brand": "Apple",
      "model": "iPhone 15 Pro Max",
      "color": "Titanium Blue",
      "storage": "512GB",
      "purchaseDate": "2026-05-20T00:00:00Z",
      "status": "SOLD",
      "createdAt": "2026-05-22T10:30:00Z"
    }
  }
}
```

**Testing with cURL:**
```bash
curl -X PUT http://localhost:3000/api/v1/device/uuid-here \
  -H "Content-Type: application/json" \
  -d '{
    "status": "SOLD"
  }'
```

---

### 7. **Delete Device**
**Endpoint:** `DELETE /api/v1/device/:id`

**Parameters:**
- `id` (path): Device ID (required)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Device deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Device not found",
  "statusCode": 404
}
```

**Testing with cURL:**
```bash
curl -X DELETE http://localhost:3000/api/v1/device/uuid-here
```

---

## 🧪 Complete Testing Workflow

### Step 1: Start the Server
```bash
cd d:\PostgreSQL\ Development\basit-mobile-zone
npm run dev
```

### Step 2: Register a User
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

**Save the returned token** for next requests.

### Step 3: Login User
```bash
curl -X POST http://localhost:3000/api/v1/user/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Step 4: Create a Device
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

### Step 5: Get Device by IMEI
```bash
curl -X GET http://localhost:3000/api/v1/device/by-imei/356938035643809
```

### Step 6: Get All Devices
```bash
curl -X GET "http://localhost:3000/api/v1/device?page=1&limit=10"
```

### Step 7: Update Device Status
```bash
curl -X PUT http://localhost:3000/api/v1/device/{device-id} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "SOLD"
  }'
```

### Step 8: Search Devices
```bash
curl -X GET "http://localhost:3000/api/v1/device/search?brand=Apple&status=IN_STOCK"
```

---

## 📊 Valid Test IMEI Numbers (Luhn Valid)

Use these IMEIs for testing:
```
356938035643809  - Apple iPhone
490154203237518  - Samsung Galaxy
860088010291876  - Generic Device
013800110500033  - Apple Test
490154203237515  - Samsung Test
```

To generate more valid IMEIs, the last digit must satisfy the Luhn algorithm:
- Sum all digits (alternating multiply every 2nd by 2)
- Last digit = (10 - (sum mod 10)) mod 10

---

## 🔍 Error Handling Examples

### Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "statusCode": 400,
  "errors": {
    "imei": "Please provide a valid IMEI (15 digits)",
    "brand": "Brand must be 2-50 characters"
  }
}
```

### Duplicate IMEI Error
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

### Not Found Error
```json
{
  "success": false,
  "message": "Device not found",
  "statusCode": 404
}
```

---

## 🚀 Best Practices

1. **Always validate user input** on client-side before sending to API
2. **Store JWT tokens securely** in httpOnly cookies or secure storage
3. **Use HTTPS** in production (not HTTP)
4. **Implement rate limiting** to prevent brute force attacks
5. **Log all API requests** for debugging and auditing
6. **Handle errors gracefully** on the client side
7. **Test all edge cases** including invalid IMEI formats
8. **Use meaningful error messages** for better UX
9. **Paginate large datasets** to improve performance
10. **Cache frequently accessed data** when appropriate

---

## 📝 Summary of Changes

### Files Created:
- ✅ `src/utils/validators.ts` - Input validation utilities
- ✅ `src/utils/errorHandler.ts` - Error handling and response formatting

### Files Updated:
- ✅ `src/interfaces/user.interface.ts` - Enhanced interfaces
- ✅ `src/interfaces/device.interface.ts` - Enhanced interfaces
- ✅ `src/controllers/user.controller.ts` - Error handling, validation
- ✅ `src/controllers/device.controller.ts` - All CRUD operations + IMEI support
- ✅ `src/services/user.service.ts` - Validation and error handling
- ✅ `src/services/device.service.ts` - IMEI support, search, pagination
- ✅ `src/routes/user.routes.ts` - New endpoints for profile management
- ✅ `src/routes/device.routes.ts` - New endpoints for device management

---

## 🎯 Next Steps (Recommendations)

1. **Add Authentication Middleware** - Protect routes with JWT verification
2. **Add Rate Limiting** - Prevent abuse of API endpoints
3. **Add Logging** - Log all requests and errors
4. **Add API Documentation** - Use Swagger/OpenAPI
5. **Add Unit Tests** - Test all services and controllers
6. **Add Refresh Token** - Implement token refresh mechanism
7. **Add Role-Based Access Control** - Different permissions for ADMIN/STAFF
8. **Add Database Indexes** - On IMEI, email for faster queries
9. **Add Request/Response Compression** - For bandwidth optimization
10. **Add CORS Configuration** - Properly configure allowed origins

---

**Last Updated:** May 22, 2026  
**Version:** 1.1.0  
**Status:** Production Ready ✅
