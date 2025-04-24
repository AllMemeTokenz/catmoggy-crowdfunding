### Get All Funding Projects

#### HTTP Method: `GET`

**Description**:  
Fetch all funding projects in the system.

**Endpoint**:  
`/api/funding-projects`

#### Success Response:

- **Status Code**: `200 OK`
- **Content**:

```json
[
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
  },
  {
    "_id": "680a09f93612abd68eabc5c0",
    "title": "Tech Innovation Hub",
    "subTitle": "Supporting the next wave of innovators",
    "statusLabel": "Active",
    "category": "Technology",
    "imageUrl": "https://example.com/images/tech.jpg",
    "expiredDate": "2025-08-01T00:00:00.000Z",
    "targetFunding": 50000,
    "currentFunding": 5000,
    "createdAt": "2025-04-20T09:52:57.088Z",
    "updatedAt": "2025-04-20T09:52:57.088Z"
  }
]
```

#### Explanation:

- **message**: A success message confirming that the funding projects were retrieved successfully.
- **data**: An array of all the funding projects in the system, where each object contains:
  - **\_id**: The unique ID for the project.
  - **title**: The title of the project.
  - **subTitle**: The subtitle of the project.
  - **statusLabel**: The current status of the project (e.g., Active).
  - **category**: The category of the project.
  - **imageUrl**: The URL of the project image.
  - **expiredDate**: The expiration date of the project.
  - **targetFunding**: The target funding amount for the project.
  - **currentFunding**: The current funding raised for the project.
  - **createdAt**: The timestamp when the project was created.
  - **updatedAt**: The timestamp when the project was last updated.

### Error Response

- **Status Code**: `500 Internal Server Error`
- **Content**:
  ```json
  {
    "error": "Internal server error",
    "detail": "<error_message>"
  }
  ```

#### Explanation:

- **error**: A generic error message indicating that an unexpected error occurred while processing the request.
- **detail**: A detailed error message explaining the issue (e.g., stack trace).

This error will be returned in case of an internal server error.

[Back to API Documentation](../README.md#api-documentation)
