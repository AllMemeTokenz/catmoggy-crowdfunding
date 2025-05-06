# Create Funding Project

**HTTP Method:** POST  
**Endpoint:** /api/funding-projects/donations/[id]

**Description:**  
ADD new donation to a funding project by its ID.

## Request Body

The request body should contain the following fields:

| Field      | Type     | Description                               | Required |
| ---------- | -------- | ----------------------------------------- | -------- |
| `donor`    | `string` | Name of the donor.                        | Yes      |
| `amount`   | `number` | Amount of the donation.                   | Yes      |
| `receipt`  | `string` | Transaction signature hash from Solscan . | Yes      |
| `currency` | `string` | Currency used (catmoggy or sol).          | Yes      |

### Example Request

```json
{
  "donor": "Mr. Jack",
  "amount": 50000,
  "receipt": "3mGpNLkMiP1khK4XGkXfM3pBa3SE5rZoEm8Pdd7FWXwNMiJhCwBfJuhpnhUt4hfvobVVQn6jw94UArQQaJAA2cmL",
  "currency": "catmoggy"
}
```

## Success Response

**Status Code:** 201 Created

When the donation is successfully added, the response will include a message confirming the creation and the newly created project details.

### Example Response

```json
{
  "message": "Donation added successfully",
  "data": {
    "donor": "Mr. Jack",
    "amount": 50000,
    "receipt": "3mGpNLkMiP1khK4XGkXfM3pBa3SE5rZoEm8Pdd7FWXwNMiJhCwBfJuhpnhUt4hfvobVVQn6jw94UArQQaJAA2cmL",
    "currency": "catmoggy",
    "project": {
      "id": "68198bbfff1a30fdbf2b0d5e",
      "title": "Feeding The Stray Cats."
    },
    "deletedAt": null,
    "deleteComment": null,
    "_id": "68198c9eff1a30fdbf2b0d64",
    "createdAt": "2025-05-06T04:14:22.986Z",
    "updatedAt": "2025-05-06T04:14:22.986Z",
    "__v": 0
  }
}
```

This response will be returned when a new donations is successfully added.

[Back to API Documentation](../README.md#api-documentation)
