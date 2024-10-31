import { isValid, parse } from 'date-fns'
import { z } from 'zod'

export const BASE_URL = 'http://127.0.0.1:5000'

export const profileFormSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required.'),
    day: z.string().trim().min(1, 'Day is required.').max(2, 'Day cannot be more than 2 numbers.'),
    month: z
      .string()
      .trim()
      .min(1, 'Month is required.')
      .max(2, 'Month cannot be more than 2 numbers.'),
    year: z.string().trim().min(1, 'Year is required.').length(4, 'Year must be 4 numbers.'),
    place: z.string({ required_error: 'Place is required' }).trim(),
    longitude: z.string().trim().min(1, 'Longtitude is required.'),
    lattitude: z.string().trim().min(1, 'Lattitude is required.'),
    timezone: z.string().trim().min(1, 'Timezone is required.'),
    hour: z
      .string()
      .trim()
      .min(1, 'Hour is required.')
      .max(2, { message: 'Hour cannot be more than 2 numbers.' }),
    min: z
      .string()
      .trim()
      .min(1, 'Minute is required.')
      .max(2, { message: 'Minute cannot be more than 2 numbers.' }),
    sec: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    const parsed = parse(`${val.day}/${val.month}/${val.year}`, 'dd/MM/yyyy', new Date())
    if (!Number(val.year) || !Number(val.month) || !Number(val.day) || !isValid(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid Day',
        path: ['day'],
      })
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid Month',
        path: ['month'],
      })
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid Year',
        path: ['year'],
      })
    }
    if (!Number(val.hour) || Number(val.hour) > 23 || Number(val.hour) < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid Hour',
        path: ['hour'],
      })
    }
    if (Number(val.min) > 59 || Number(val.min) < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid Minute',
        path: ['min'],
      })
    }
  })
