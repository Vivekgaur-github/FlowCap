# Users Register Endpoint Documentation

This document describes the `/users/register` endpoint provided by the backend application.

## Endpoint
**URL:** `/users/register`  
**Method:** `POST`

## Description
This endpoint is used for user registration. It validates the input data using [express-validator](https://express-validator.github.io/) and, upon successful validation, creates a new user and returns an authentication token.

## Request Body
The endpoint expects a JSON payload with the following structure:

- **fullname** (object, required):  
  - **firstname** (string, required): Minimum 3 characters.
  - **lastname** (string, optional): Minimum 3 characters if provided.
- **email** (string, required): Must be a valid email and at least 5 characters.
- **password** (string, required): Must be at least 6 characters long.

### Example
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePass123"
}
```

# Users Login Endpoint Documentation

This document describes the `/users/login` endpoint provided by the backend application.

## Endpoint
**URL:** `/users/login`  
**Method:** `POST`

## Description
This endpoint is used for user login. It validates the input data using [express-validator](https://express-validator.github.io/) and, upon successful validation, authenticates the user and returns an authentication token.

## Request Body
The endpoint expects a JSON payload with the following structure:

- **email** (string, required): Must be a valid email.
- **password** (string, required): Must be at least 6 characters long.

### Example
```json
{
  "email": "john.doe@example.com",
  "password": "securePass123"
}
```

## Response
Upon successful login, the endpoint returns a JSON object with the following structure:

- **token** (string): The authentication token.
- **user** (object): The authenticated user's details.

### Example
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
}
```

# Users Profile Endpoint Documentation

This document describes the `/users/profile` endpoint provided by the backend application.

## Endpoint
**URL:** `/users/profile`  
**Method:** `GET`

## Description
This endpoint is used to retrieve the authenticated user's profile. It requires a valid authentication token.

## Request Headers
The endpoint expects the following headers:

- **Authorization** (string, required): Bearer token.

### Example
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Response
Upon successful authentication, the endpoint returns a JSON object with the user's profile details.

### Example
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com"
}
```

# Users Logout Endpoint Documentation

This document describes the `/users/logout` endpoint provided by the backend application.

## Endpoint
**URL:** `/users/logout`  
**Method:** `GET`

## Description
This endpoint is used to log out the authenticated user. It clears the authentication token and adds it to a blacklist to prevent reuse.

## Request Headers
The endpoint expects the following headers:

- **Authorization** (string, required): Bearer token.

### Example
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Response
Upon successful logout, the endpoint returns a JSON object with a message indicating the user has been logged out.

### Example
```json
{
  "message": "Logged Out"
}
```

# Captain Register Endpoint Documentation

This document describes the `/captains/register` endpoint provided by the backend application.

## Endpoint
**URL:** `/captains/register`  
**Method:** `POST`

## Description
This endpoint is used for captain registration. It validates the input data using [express-validator](https://express-validator.github.io/) and, upon successful validation, creates a new captain and returns the captain's details.

## Request Body
The endpoint expects a JSON payload with the following structure:

- **fullname** (object, required):  
  - **firstname** (string, required): Minimum 3 characters.
  - **lastname** (string, optional): Minimum 3 characters if provided.
- **email** (string, required): Must be a valid email.
- **password** (string, required): Must be at least 6 characters long.
- **vehicle** (object, required):
  - **color** (string, required): Minimum 3 characters.
  - **plate** (string, required): Minimum 3 characters.
  - **capacity** (integer, required): Must be a positive integer.
  - **vehicleType** (string, required): Must be one of 'car', 'motorcycle', or 'auto'.

### Example
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "securePass123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Response
Upon successful registration, the endpoint returns a JSON object with the captain's details.

### Example
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

# Captain Login Endpoint Documentation

This document describes the `/captains/login` endpoint provided by the backend application.

## Endpoint
**URL:** `/captains/login`  
**Method:** `POST`

## Description
This endpoint is used for captain login. It validates the input data using [express-validator](https://express-validator.github.io/) and, upon successful validation, authenticates the captain and returns an authentication token.

## Request Body
The endpoint expects a JSON payload with the following structure:

- **email** (string, required): Must be a valid email.
- **password** (string, required): Must be at least 6 characters long.

### Example
```json
{
  "email": "jane.doe@example.com",
  "password": "securePass123"
}
```

## Response
Upon successful login, the endpoint returns a JSON object with the following structure:

- **token** (string): The authentication token for subsequent authenticated requests
- **captain** (object): The authenticated captain's details including vehicle information

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "firstname": "Jane",
    "lastname": "Doe", 
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

# Captain Profile Endpoint Documentation

This document describes the `/captains/profile` endpoint provided by the backend application.

## Endpoint
**URL:** `/captains/profile`  
**Method:** `GET`

## Description
This endpoint retrieves the profile information of the currently authenticated captain. It requires a valid authentication token.

## Request Headers
The endpoint expects the following headers:

- **Authorization** (string, required): Bearer token for authentication

### Example
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Response
Upon successful authentication, the endpoint returns a JSON object with the captain's profile details.

### Example Response
```json
{
  "firstname": "Jane",
  "lastname": "Doe",
  "email": "jane.doe@example.com",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

# Captain Logout Endpoint Documentation

This document describes the `/captains/logout` endpoint provided by the backend application.

## Endpoint
**URL:** `/captains/logout`  
**Method:** `GET`

## Description
This endpoint logs out the currently authenticated captain by invalidating their token. The token is added to a blacklist to prevent reuse.

## Request Headers
The endpoint expects the following headers:

- **Authorization** (string, required): Bearer token to be invalidated

### Example
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Response
Upon successful logout, the endpoint returns a JSON object with a success message.

### Example Response
```json
{
  "message": "Logout successful."
}
```

## Rides Endpoints Documentation

### Create Ride
**URL:** `/rides/create`  
**Method:** `POST`  

**Description:**  
Creates a new ride record for the authenticated user based on provided pickup, destination, and vehicle type.

**Request Body:**  
```json
{
  "pickup": "123 Main St, City",
  "destination": "456 Elm St, City",
  "vehicleType": "car"
}
```

**Response:**  
The created ride object with details including fare and OTP for confirmation.

---

### Get Fare
**URL:** `/rides/get-fare`  
**Method:** `GET`  

**Description:**  
Calculates the fare for a ride based on the pickup and destination addresses.

**Query Parameters:**  
- `pickup`: [string] (e.g., "123 Main St, City")  
- `destination`: [string] (e.g., "456 Elm St, City")

**Response:**  
```json
{
  "car": 150,
  "auto": 90,
  "moto": 60
}
```

---

### Confirm Ride
**URL:** `/rides/confirm`  
**Method:** `POST`  

**Description:**  
Allows an authenticated captain to confirm a pending ride.

**Request Body:**  
```json
{
  "rideId": "rideObjectId"
}
```

**Response:**  
The updated ride object with status set to `accepted` and captain details populated.

---

### Start Ride
**URL:** `/rides/start-ride`  
**Method:** `GET`  

**Description:**  
Starts a confirmed ride after validating the OTP provided by the captain.

**Query Parameters:**  
- `rideId`: [string] Ride identifier  
- `otp`: [string] 6-digit OTP

**Response:**  
The ride object with status updated to `ongoing`.

---

### End Ride
**URL:** `/rides/end-ride`  
**Method:** `POST`  

**Description:**  
Ends an ongoing ride for the authenticated captain.

**Request Body:**  
```json
{
  "rideId": "rideObjectId"
}
```

**Response:**  
The ride object with status updated to `completed`.

---

## Maps Endpoints Documentation

### Get Coordinates
**URL:** `/maps/get-coordinates`  
**Method:** `GET`  

**Description:**  
Retrieves geographical coordinates (latitude and longitude) for a given address.

**Query Parameters:**  
- `address`: [string] (address to geocode)

**Response:**  
```json
{
  "lat": 40.7128,
  "lng": -74.0060
}
```

---

### Get Distance and Time
**URL:** `/maps/get-distance-time`  
**Method:** `GET`  

**Description:**  
Calculates the distance and duration between an origin and a destination.

**Query Parameters:**  
- `origin`: [string] (starting address)  
- `destination`: [string] (ending address)

**Response:**  
```json
{
  "distance": { "text": "5 km", "value": 5000 },
  "duration": { "text": "12 mins", "value": 720 }
}
```

---

### Get Autocomplete Suggestions
**URL:** `/maps/get-suggestions`  
**Method:** `GET`  

**Description:**  
Provides autocomplete suggestions for place names based on input text.

**Query Parameters:**  
- `input`: [string] (partial address or place name)

**Response:**  
```json
[
  "123 Main St, City",
  "124 Main St, City",
  "125 Main St, City"
]
```

