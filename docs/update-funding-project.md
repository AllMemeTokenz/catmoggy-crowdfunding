## Update Funding Project

**HTTP Method**: `PATCH`

### Description:

Update a funding project by its ID. Only the provided fields will be updated. The fields that can be updated include project details such as title, subtitle, status, category, funding amounts, and dates.

### Endpoint:

`/api/funding-projects/[id]`

### Request Body:

The body of the request should contain any of the fields listed below that need to be updated.

#### Example:

````json
{
  "title": "Updated Community Garden Revamp",
  "statusLabel": "Inactive",
  "currentFunding": 5000
}

### Fields that can be updated:

| Field            | Description                                                                 | Type                     | Notes                             |
|------------------|-----------------------------------------------------------------------------|--------------------------|-----------------------------------|
| **title**        | The title of the project.                                                   | string                   |                                   |
| **subTitle**     | The subtitle of the project.                                                | string                   |                                   |
| **statusLabel**  | The current status of the project (e.g., Active, Inactive).                 | string                   |                                   |
| **category**     | The category of the project (e.g., Environment, Technology).                | string                   |                                   |
| **imageUrl**     | The URL of the project image.                                               | string                   |                                   |
| **expiredDate**  | The expiration date of the project (in ISO 8601 format).                   | string (ISO 8601)         |                                   |
| **targetFunding**| The target funding amount for the project.                                  | number                   |                                   |
| **currentFunding**| The current funding raised for the project.                                | number                   |                                   |

### Success Response:
- **Status Code**: 200 OK
- **Content**:
```json
{
  "message": "Project updated successfully",
  "data": {
    "_id": "680a09f93612abd68eabc5bf",
    "title": "Community Garden Revamp",
    "subTitle": "Bringing green spaces back to life",
    "statusLabel": "Active",
    "category": "Environment",
    "imageUrl": "https://example.com/images/garden.jpg",
    "expiredDate": "2025-07-15T00:00:00.000Z",
    "targetFunding": 15000,
    "currentFunding": 5000,
    "createdAt": "2025-04-24T09:52:57.088Z",
    "updatedAt": "2025-04-25T10:00:00.000Z"
  }
}
### Explanation:
- **message**: A success message confirming that the project was successfully updated.
- **data**: The updated data for the project, which may include changes in the title, subtitle, status, category, funding amounts, etc.

### Error Responses:
#### Invalid ID
- **Status Code**: 400 Bad Request
- **Content**:
```json
{
  "error": "Invalid ID"
}
### Explanation:
- **error**: A message indicating that the provided project ID is not valid. This error will be returned if the provided project ID is not a valid MongoDB ObjectId.

### Error Response: Project Not Found
- **Status Code**: 404 Not Found
- **Content**:
```json
{
  "error": "Project not found"
}
### Explanation:
- **error**: A message indicating that no project was found with the provided ID. This error will be returned if no project exists with the provided project ID.

### Internal Server Error
- **Status Code**: 500 Internal Server Error
- **Content**:
```json
{
  "error": "Internal server error",
  "detail": "<error_message>"
}
### Explanation:
- **error**: A generic error message indicating that an unexpected error occurred while processing the request.
- **detail**: A detailed error message explaining the issue (e.g., stack trace). This error will be returned in case of an internal server error.

### Notes:
- Only the fields that are included in the request body will be updated.
- If a field is omitted, it will not be changed.
- The **createdAt** and **updatedAt** fields are automatically managed by the server and cannot be directly modified by the user.

[Back to API Documentation](../README.md#api-documentation)
````
