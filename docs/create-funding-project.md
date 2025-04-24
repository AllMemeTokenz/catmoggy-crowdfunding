# Create Funding Project

**HTTP Method:** POST  
**Endpoint:** /api/funding-projects

**Description:**  
Create a new funding project in the system.

## Request Body

The request body should contain the following fields:

| Field           | Type     | Description                                                                                        | Required |
| --------------- | -------- | -------------------------------------------------------------------------------------------------- | -------- |
| `title`         | `string` | The title of the funding project.                                                                  | Yes      |
| `subTitle`      | `string` | The subtitle of the funding project.                                                               | Yes      |
| `statusLabel`   | `string` | The current status of the project (e.g., "Active", "Completed").                                   | Yes      |
| `category`      | `string` | The category of the project (e.g., "Environment", "Health").                                       | Yes      |
| `imageUrl`      | `string` | URL for the project's image.                                                                       | Yes      |
| `expiredDate`   | `string` | The expiration date for the funding project in ISO 8601 format (e.g., `2025-07-15T00:00:00.000Z`). | Yes      |
| `targetFunding` | `number` | The target amount of funding for the project.                                                      | Yes      |

### Example Request

```json
{
  "title": "Community Garden Revamp",
  "subTitle": "Bringing green spaces back to life",
  "statusLabel": "Active",
  "category": "Environment",
  "imageUrl": "https://example.com/images/garden.jpg",
  "expiredDate": "2025-07-15T00:00:00.000Z",
  "targetFunding": 15000
}
```

## Success Response

**Status Code:** 201 Created

When the project is successfully created, the response will include a message confirming the creation and the newly created project details.

### Example Response

```json
{
  "message": "Project created successfully",
  "data": {
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
}
```

- **message**: A success message confirming that the project was created.
- **data**: The data for the newly created project, including:
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

This response will be returned when a new funding project is successfully created.

```

[Back to API Documentation](../README.md#api-documentation)
```
