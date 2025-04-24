import { maxLength, minLength, object, partial, pipe, string, minValue, number } from 'valibot';

export const updateProjectSchema = partial(
  object({
    title: pipe(
      string(),
      minLength(1, 'Title is required.'),
      maxLength(100, 'Title must be less than 100 characters.')
    ),
    subTitle: pipe(string(), minLength(1, 'SubTitle is required.')),
    statusLabel: pipe(string(), minLength(1, 'StatusLabel is required.')),
    category: pipe(string(), minLength(1, 'Category is required.')),
    imageUrl: pipe(string(), minLength(1, 'image url is required.')),
    expiredDate: pipe(string(), minLength(1, 'expired date is required.')),
    targetFunding: pipe(number(), minValue(1, 'Target funding must be greater than 0.')),
  })
);
