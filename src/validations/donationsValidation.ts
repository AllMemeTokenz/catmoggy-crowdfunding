import { minLength, pipe, strictObject, number, string, minValue, enum_, Enum } from 'valibot';

const currencies = ['catmoggy', 'sol'] as const;
const currencyEnum = enum_(currencies as unknown as Enum);

export const newDonationVal = strictObject({
  donor: pipe(string(), minLength(1, 'Donor name is required.')),
  amount: pipe(number(), minValue(1, 'Amount must be greater than 0.')),
  receipt: pipe(string(), minLength(1, 'Receipt is required.')),
  currency: currencyEnum,
});

export const delDonationVal = strictObject({
  deleteComment: pipe(string(), minLength(1, 'Delete comment is required.')),
});
