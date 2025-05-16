import { minLength, pipe, strictObject, string } from 'valibot';

export const registerAdminVal = strictObject({
  username: pipe(string(), minLength(1, 'Username is required.')),
  password: pipe(string(), minLength(12, 'Password must be at least 12 characters long.')),
});
