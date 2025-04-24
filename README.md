# Project Name

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Getting Started

### Install Dependencies

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 with your browser to see the result.
You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

## API Documentation

This section provides detailed documentation of the available API endpoints. Click on the links to access the corresponding documentation:

[### Create Funding Project](./docs/create-funding-project.md)

**HTTP Method:** POST

**Description:** Create a new funding project.

**Endpoint:** /api/funding-projects

---

[### Delete Funding Project](./docs/delete-funding-project.md)

**HTTP Method:** PATCH

**Description:** Soft delete a funding project by its ID.

**Endpoint:** /api/funding-projects/delete/[id]

---

[### Get All Funding Projects](./docs/get-all-funding-projects.md)

**HTTP Method:** GET

**Description:** Fetch all funding projects in the system.

**Endpoint:** /api/funding-projects

---

[### Get Funding Project by ID](./docs/get-funding-project-by-id.md)

**HTTP Method:** GET

**Description:** Retrieve a specific funding project by its ID.

**Endpoint:** /api/funding-projects/[id]

---

[### Update Funding Project](./docs/update-funding-project.md)

**HTTP Method:** PATCH

**Description:** Update a funding project by its ID. Only the provided fields will be updated.

**Endpoint:** /api/funding-projects/[id]

---

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Notes

If you need further assistance or encounter any issues, please feel free to create an issue or ask for help within the project repo.
