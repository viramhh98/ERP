### 🧠 SaaS ERP System Architecture (Multi-Tenant + RBAC + Limits)

This system is designed as a **multi-tenant ERP SaaS application**, where multiple companies can use the platform independently, and each company can manage its own users, roles, branches, and business rules.

---

## 🏢 Core Concepts

### 1. Multi-Tenancy (Company-Based Isolation)

Each company represents a **tenant** in the system.

* A single user can belong to multiple companies
* Each company has its own:

  * roles
  * users
  * branches
  * permissions

This ensures **data isolation and scalability**

---

### 2. Branch-Level Structure

Each company can have multiple branches.

* Roles are defined at **company level**
* But users can have **different roles in different branches**
* This is handled via a mapping model

---

## 👤 Models Overview

### 🔹 User

Represents a person using the system.

* Unique by email
* Can belong to multiple companies

---

### 🔹 Company

Represents an organization (tenant)

* Contains company details (GST, PAN, address)
* Has multiple owners (users)

---

### 🔹 Branch

Represents a sub-unit of a company

* Linked to a company
* Used for location-based role assignment

---

### 🔹 Role (Dynamic RBAC)

Defines **what actions a user can perform**

* Stored per company
* Uses dynamic structure:

```js
permissions: [
  {
    module: "sales",
    actions: ["create", "read", "approve"]
  }
]
```

This allows:

* Adding new modules without schema change
* Adding new actions dynamically

---

### 🔹 UserCompanyRole (Core Mapping Model)

This is the **most important model**

It links:

* user
* company
* branch
* role
* limits

```js
UserCompanyRole {
  userId,
  companyId,
  branchId (null = all branches),
  roleId,
  limits
}
```

---

## 🔐 Access Control System

This system uses a **hybrid approach**:

### 1. RBAC (Role-Based Access Control)

Handled via `Role.permissions`

👉 Defines:

> What a user *can do*

Example:

* create sales
* approve purchase

---

### 2. ABAC (Attribute-Based Control via Limits)

Handled via `limits` in UserCompanyRole

👉 Defines:

> How much a user can do

Example:

```js
limits: {
  sales: {
    maxDiscountPercent: 10
  },
  approval: {
    maxApprovalAmount: 100000
  }
}
```

---

## ⚙️ Request Flow (How system works)

Every API request follows this flow:

### Step 1: Fetch User Role Mapping

```js
UserCompanyRole.findOne({
  userId,
  companyId,
  $or: [
    { branchId },
    { branchId: null }
  ]
}).populate("roleId")
```

---

### Step 2: Check Permission

```js
checkPermission(role, module, action)
```

👉 Validates:

* module exists
* action allowed

---

### Step 3: Check Limits

```js
checkLimit(userCompanyRole, module, key, value)
```

👉 Validates:

* numeric constraints (e.g. discount, approval amount)

---

### Step 4: Execute Business Logic

If both checks pass → proceed

---

## 🧩 Key Design Decisions

### ✅ Dynamic Permissions

* No schema change needed for new modules/actions
* Controlled via backend validation

---

### ✅ Branch-Aware Role Assignment

* `branchId = null` → applies to all branches
* specific `branchId` → branch-level control

---

### ✅ Separation of Concerns

| Component       | Responsibility       |
| --------------- | -------------------- |
| Role            | permissions          |
| UserCompanyRole | assignment + limits  |
| Limits          | business constraints |
| Middleware      | enforcement          |

---

## 🚀 Scalability

This design supports:

* multiple companies
* multiple branches
* dynamic roles
* customizable business rules

Without needing major schema changes

---

## 🧠 Final Summary

This system combines:

* **Multi-tenancy** (Company-based isolation)
* **RBAC** (permissions via roles)
* **ABAC** (limits via user-role mapping)
* **Branch-level flexibility**

Resulting in a **scalable, flexible, and production-ready ERP SaaS backend architecture**

---

### 💡 Core Principle

> Role = what you can do
> Limits = how much you can do

This separation ensures clarity, scalability, and maintainability in complex business systems.
date 18/april/2026


## 🔄 Implementation Progress Update (Auth + Git Workflow)

### 🚀 Authentication Layer Implemented

The system now includes a complete **authentication module** built using clean architecture principles.

---

### 🔐 Signup (User Creation)

**Endpoint:**

```
POST /api/users/signup
```

**Flow:**

```
Route → validateSignup → controller → service → DB
```

**Key Features:**

* Input validation using middleware
* Password hashing using bcrypt
* Unique email enforced via MongoDB index
* Proper error handling (duplicate email - code 11000)
* Sensitive data (password) excluded from response

---

### 🔐 Login (JWT Authentication)

**Endpoint:**

```
POST /api/auth/login
```

**Flow:**

```
Route → validateLogin → controller → service → DB → JWT
```

**Key Features:**

* Validates email and password
* Uses bcrypt.compare for password verification
* Generates JWT token on successful login
* Returns:

```json
{
  "user": { ...safeUser },
  "token": "jwt_token"
}
```

---

### 🔑 JWT Strategy

* Token is generated during login
* Token contains:

```js
{ userId }
```

* Token expiry: 1 day
* Stored on client side
* Sent in headers for protected routes:

```
Authorization: Bearer <token>
```

---

### 🧱 Backend Architecture Applied

All features follow strict separation:

```
Route → Middleware → Controller → Service → Model
```

| Layer      | Responsibility            |
| ---------- | ------------------------- |
| Middleware | validation                |
| Controller | request/response handling |
| Service    | business logic            |
| Model      | database schema           |

---

### ⚠️ Security Measures Implemented

* Password hashing using bcrypt
* Password never returned in API response
* Duplicate user prevention using unique index
* Error handling standardized

---

### 🧪 Testing

* APIs tested using Postman
* JSON request body used
* Valid and invalid scenarios tested:

  * missing fields ❌
  * wrong password ❌
  * duplicate email ❌
  * successful login/signup ✅

---

### 🔄 Git Workflow Followed

A proper feature-based workflow is being used:

#### Feature Development

```
git checkout -b feature/user-create
git add .
git commit -m "feat: user signup"
git push origin feature/user-create
```

#### Merge Process

```
git checkout main
git merge feature/user-create
git push origin main
git branch -d feature/user-create
```

Same flow followed for:

* feature/auth-login

---

### 🧠 Current System Capabilities

The system now supports:

* User creation (signup) ✅
* Secure login with JWT ✅
* Clean layered backend architecture ✅
* Version-controlled development using Git ✅

---

### 🎯 Next Implementation Phase

The next step is to integrate authentication with authorization:

1. **authMiddleware**

   * Verify JWT
   * Attach user to request

2. **checkPermission Middleware**

   * Validate RBAC rules

3. **checkLimit Middleware**

   * Enforce business constraints (ABAC)

4. **First Business Module**

   * Purchase module (end-to-end flow)

---

### 💡 Updated System Principle

> Authentication = Who you are
> Authorization = What you can do
> Limits = How much you can do

This layered approach ensures a secure and scalable ERP system.

### 🔐 Auth Middleware (JWT Protection)

This middleware is responsible for securing protected API routes by verifying JWT tokens and identifying the authenticated user.

---

### 📌 Purpose

- Ensures only authenticated users can access protected endpoints
- Extracts user identity from JWT
- Attaches user information to the request for further authorization

---

### ⚙️ How It Works

1. Reads token from request header:

   Authorization: Bearer <token>

2. Verifies token using JWT secret

3. Extracts payload:

   { userId }

4. Attaches user to request:

   req.user = { userId }

5. Passes control to next middleware

---

### ❌ Failure Cases

- Missing token → 401 Unauthorized
- Invalid token → 401 Unauthorized
- Expired token → 401 Unauthorized

---

### 📁 Location

middlewares/auth.middleware.js

---

### 🔄 Request Flow

Route → authMiddleware → next()

---

### 💡 Notes

- This middleware does NOT query the database (kept lightweight)
- Handles only authentication (not authorization)
- Authorization (RBAC/ABAC) is handled in subsequent middleware

date 19/april/20264
