# API Documentation Template

## Overview
- **API Version**: 1.0.0
- **Base URL**: `https://api.example.com/v1`
- **Authentication**: Bearer Token

## Authentication
All endpoints require authentication using a Bearer token:
```http
Authorization: Bearer <your_token>
```

## Endpoints

### User Management

#### Create User
```http
POST /users
```

**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response** (201 Created):
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "created_at": "timestamp"
}
```

**Error Responses**:
- 400 Bad Request: Invalid input
- 409 Conflict: Email already exists

#### Get User
```http
GET /users/{id}
```

**Parameters**:
- `id`: User UUID (path parameter)

**Response** (200 OK):
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

**Error Responses**:
- 404 Not Found: User not found

### Authentication

#### Login
```http
POST /auth/login
```

**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Response** (200 OK):
```json
{
  "token": "string",
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string"
  }
}
```

**Error Responses**:
- 401 Unauthorized: Invalid credentials

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

### Common Error Codes
- `INVALID_INPUT`: Request validation failed
- `NOT_FOUND`: Resource not found
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Permission denied
- `INTERNAL_ERROR`: Server error

## Rate Limiting
- Rate limit: 100 requests per minute
- Headers:
  - `X-RateLimit-Limit`: Maximum requests per window
  - `X-RateLimit-Remaining`: Remaining requests in window
  - `X-RateLimit-Reset`: Time until window reset

## Pagination
For endpoints returning lists:

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

**Response Headers**:
- `X-Total-Count`: Total number of items
- `X-Total-Pages`: Total number of pages

## Data Types

### User
```typescript
{
  id: UUID
  name: string
  email: string
  created_at: ISO8601 DateTime
  updated_at: ISO8601 DateTime
}
```

### Error
```typescript
{
  error: {
    code: string
    message: string
    details?: object
  }
}
```

## Examples

### Create User Request
```bash
curl -X POST https://api.example.com/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123"
  }'
```

### Login Request
```bash
curl -X POST https://api.example.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secure123"
  }'
```

## Changelog

### v1.0.0 (2024-01-20)
- Initial release
- Basic user management
- Authentication endpoints

## Support
- Email: support@example.com
- Status Page: status.example.com
- Developer Portal: developers.example.com 