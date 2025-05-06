### Get All Funding Projects

#### HTTP Method: `GET`

**Description**:  
Fetch all funding projects donations by the funding project ID.

**Endpoint**:  
`/api/funding-projects/donations/[id]`

#### Success Response:

- **Status Code**: `200 OK`
- **Content**:

```json
[
  {
    "project": {
      "id": "68198bbfff1a30fdbf2b0d5e",
      "title": "Test fix api"
    },
    "_id": "68198c0eff1a30fdbf2b0d61",
    "donor": "Trench",
    "amount": 600000,
    "receipt": "pospospospos",
    "currency": "catmoggy",
    "deletedAt": null,
    "deleteComment": null,
    "createdAt": "2025-05-06T04:11:58.227Z",
    "updatedAt": "2025-05-06T04:11:58.227Z",
    "__v": 0
  },
  {
    "project": {
      "id": "68198bbfff1a30fdbf2b0d5e",
      "title": "Test fix api"
    },
    "_id": "68198c9eff1a30fdbf2b0d64",
    "donor": "Mr. Jack",
    "amount": 800000,
    "receipt": "oaijsdfpoaimsdcoim",
    "currency": "catmoggy",
    "deletedAt": null,
    "deleteComment": null,
    "createdAt": "2025-05-06T04:14:22.986Z",
    "updatedAt": "2025-05-06T04:14:22.986Z",
    "__v": 0
  }
]
```

[Back to API Documentation](../README.md#api-documentation)
