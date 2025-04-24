# Delete Funding Project

**HTTP Method:** PATCH  
**Endpoint:** /api/funding-projects/delete/[id]  
**Description:** Soft delete a funding project by its ID.

---

## Success Response

**Status Code:** 200 OK

```json
{
  "message": "Project deleted successfully"
}
```

### Explanation:

- **message**: A success message confirming that the project was successfully deleted.

This response will be returned when a funding project is successfully soft deleted.

### Error Response: Invalid ID

**Status Code**: 400 Bad Request

```json
{
  "error": "Invalid ID"
}
```

### Explanation:

- **error**: A message indicating that the provided project ID is not valid.

This error will be returned if the provided project ID is not a valid MongoDB ObjectId.

### Error Response: Project Not Found

**Status Code**: 404 Not Found

```json
{
  "error": "Project not found"
}
```

### Explanation:

- **error**: A message indicating that no project was found with the provided ID.

This error will be returned if no project exists with the provided project ID.

### Error Response: Internal Server Error

**Status Code**: 500 Internal Server Error

```json
{
  "error": "Internal server error",
  "detail": "<error_message>"
}
```

### Explanation:

- **error**: A generic error message indicating that an unexpected error occurred while processing the request.
- **detail**: A detailed error message explaining the issue (e.g., stack trace).

This error will be returned in case of an internal server error.

[Back to API Documentation](../README.md#api-documentation)
