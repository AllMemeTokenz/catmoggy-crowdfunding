## Get Funding Project by ID

### HTTP Method

`GET`

### Description

Retrieve a specific funding project by its ID.

### Endpoint

`/api/funding-projects/[id]`

### Success Response

- **Status Code:** `200 OK`

- **Content:**

````json
{
  "_id": "680a09f93612abd68eabc5bf",
  "title": "Community Garden Revamp",
  "subTitle": "Bringing green spaces back to life",
  "statusLabel": "Active",
  "category": "Environment",
  "imageUrl": "https://example.com/images/garden.jpg",
  "expiredDate": "2025-07-15T00:00:00.000Z",
  "targetFunding": 15000,
  "currentFunding": 0,
  "createdAt": "2025-04-24T09:52:57.088Z",
  "updatedAt": "2025-04-24T09:52:57.088Z"
}

### Explanation

- **_id:** The unique ID for the project.
- **title:** The title of the project.
- **subTitle:** The subtitle of the project.
- **statusLabel:** The current status of the project (e.g., Active).
- **category:** The category of the project.
- **imageUrl:** The URL of the project image.
- **expiredDate:** The expiration date of the project.
- **targetFunding:** The target funding amount for the project.
- **currentFunding:** The current funding raised for the project.
- **createdAt:** The timestamp when the project was created.
- **updatedAt:** The timestamp when the project was last updated.

### Error Response: Invalid ID

- **Status Code:** 400 Bad Request

#### Content
```json
{
  "error": "Invalid ID"
}
#### Explanation

- **error**: A message indicating that the provided project ID is not valid.
  This error will be returned if the provided project ID is not a valid MongoDB ObjectId.

### Error Response: Project Not Found

- **Status Code:** `404 Not Found`
- **Content:**
```json
{
  "error": "Project not found"
}
#### Explanation

- **error**: A message indicating that no project was found with the provided ID.
  This error will be returned if no project exists with the provided project ID.

#### Internal Server Error

- **Status Code**: 500 Internal Server Error
- **Content**:
```json
{
  "error": "Internal server error",
  "detail": "<error_message>"
}
#### Explanation
- **error**: A generic error message indicating that an unexpected error occurred while processing the request.
- **detail**: A detailed error message explaining the issue (e.g., stack trace).

[Back to API Documentation](../README.md#api-documentation)
````
