import z from 'zod';

const STUDENT_TABLE_SEARCH_SCHEMA = z.object({
  page: z.number({coerce: true}).min(1).catch(1),
  perPage: z
    .number({coerce: true})
    .transform((v) => ([10, 20, 50].includes(v) ? v : 10))
    .catch(10),
  sortColumn: z.string().catch(''),
  gender: z.enum(['Male', 'Female', 'Other', '']).catch(''),
  sortDirection: z.enum(['asc', 'desc']).catch('asc'),
});

const SCHOOL_TABLE_SEARCH_SCHEMA = z.object({
  page: z.number({coerce: true}).min(1).catch(1),
  perPage: z
    .number({coerce: true})
    .transform((v) => ([10, 20, 50].includes(v) ? v : 10))
    .catch(10),
  sortColumn: z.string().catch(''),
  gender: z.enum(['Male', 'Female', 'Other', '']).catch(''),
  sortDirection: z.enum(['asc', 'desc']).catch('asc'),
});

export {STUDENT_TABLE_SEARCH_SCHEMA, SCHOOL_TABLE_SEARCH_SCHEMA};
