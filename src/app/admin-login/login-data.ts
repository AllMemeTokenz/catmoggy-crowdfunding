"use server";

// This is a mock user database - in a real application, you would use a proper database
const USERS = [
  { username: "admin", password: "admin123", name: "Admin User" },
  { username: "user", password: "user123", name: "Regular User" },
];

export async function loginUser(formData: FormData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Basic validation
  if (!username || !password) {
    return {
      success: false,
      error: "Username and password are required",
    };
  }

  // Find user in our mock database
  const user = USERS.find(
    (u) =>
      u.username.toLowerCase() === username.toLowerCase() &&
      u.password === password
  );

  if (!user) {
    return {
      success: false,
      error: "Invalid username or password",
    };
  }

  // In a real application, you would:
  // 1. Create a session
  // 2. Set cookies or tokens
  // 3. Store user info in a secure way

  return {
    success: true,
    user: {
      username: user.username,
      name: user.name,
    },
  };
}
