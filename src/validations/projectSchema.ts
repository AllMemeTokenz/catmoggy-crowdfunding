import {
  pipe,
  object,
  string,
  number,
  // array,
  minLength,
  maxLength,
  // optional,
  enum_,
  Enum,
  minValue,
  strictObject,
} from 'valibot';

const currencies = ['catmoggy', 'sol'] as const;
const currencyEnum = enum_(currencies as unknown as Enum);

export const donationSchema = object({
  donor: pipe(
    string(),
    minLength(1, 'Donor name is required.'),
    maxLength(100, 'Donor name must be less than 100 characters.')
  ),
  amount: number(),
  date: string(),
  currency: currencyEnum,
});

export const commentSchema = object({
  user: pipe(string(), minLength(1, 'User name is required.')),
  comment: pipe(
    string(),
    minLength(1, 'Comment cannot be empty.'),
    maxLength(1000, 'Comment must be less than 1000 characters.')
  ),
  date: string(),
});

export const projectSchema = strictObject({
  title: pipe(string(), minLength(1, 'Title is required.'), maxLength(100, 'Title must be less than 100 characters.')),
  subTitle: string(),
  statusLabel: string(),
  category: string(),
  image: string(),
  imageVersion: string(),
  expiredDate: string(),
  currency: currencyEnum,
  targetFunding: pipe(number(), minValue(1, 'Target funding must be greater than 0.')),
  description: string(),
});
