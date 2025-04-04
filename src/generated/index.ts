import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','password','name','emailVerified','image','createdAt','updatedAt','role']);

export const SessionScalarFieldEnumSchema = z.enum(['id','expiresAt','token','createdAt','updatedAt','ipAddress','userAgent','userId']);

export const AccountScalarFieldEnumSchema = z.enum(['id','accountId','providerId','userId','accessToken','refreshToken','idToken','accessTokenExpiresAt','refreshTokenExpiresAt','scope','password','createdAt','updatedAt']);

export const VerificationScalarFieldEnumSchema = z.enum(['id','identifier','value','expiresAt','createdAt','updatedAt']);

export const PasskeyScalarFieldEnumSchema = z.enum(['id','name','publicKey','userId','credentialID','counter','deviceType','backedUp','transports','createdAt']);

export const FormScalarFieldEnumSchema = z.enum(['id','uuid','name','isPublished','isAnswered','isDraft','shareUrl','createdAt','updatedAt','userId']);

export const FormFieldScalarFieldEnumSchema = z.enum(['id','label','fieldType','required','formId']);

export const FormResponseScalarFieldEnumSchema = z.enum(['id','formId','question','answer','createdAt']);

export const SubscriptionScalarFieldEnumSchema = z.enum(['id','userId','status','polarProductId','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['USER','PHOTOGRAPHER','ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const SubscriptionStatusSchema = z.enum(['ACTIVE','FREE','CANCELLED','PENDING']);

export type SubscriptionStatusType = `${z.infer<typeof SubscriptionStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().cuid(),
  email: z.string(),
  password: z.string().nullable(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  idToken: z.string().nullable(),
  accessTokenExpiresAt: z.coerce.date().nullable(),
  refreshTokenExpiresAt: z.coerce.date().nullable(),
  scope: z.string().nullable(),
  password: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// VERIFICATION SCHEMA
/////////////////////////////////////////

export const VerificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
})

export type Verification = z.infer<typeof VerificationSchema>

/////////////////////////////////////////
// PASSKEY SCHEMA
/////////////////////////////////////////

export const PasskeySchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  publicKey: z.string(),
  userId: z.string(),
  credentialID: z.string(),
  counter: z.number().int(),
  deviceType: z.string(),
  backedUp: z.boolean(),
  transports: z.string().nullable(),
  createdAt: z.coerce.date().nullable(),
})

export type Passkey = z.infer<typeof PasskeySchema>

/////////////////////////////////////////
// FORM SCHEMA
/////////////////////////////////////////

export const FormSchema = z.object({
  id: z.string().cuid(),
  uuid: z.string().uuid(),
  name: z.string(),
  isPublished: z.boolean(),
  isAnswered: z.boolean(),
  isDraft: z.boolean(),
  shareUrl: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type Form = z.infer<typeof FormSchema>

/////////////////////////////////////////
// FORM FIELD SCHEMA
/////////////////////////////////////////

export const FormFieldSchema = z.object({
  id: z.number().int(),
  label: z.string(),
  fieldType: z.string(),
  required: z.boolean(),
  formId: z.string(),
})

export type FormField = z.infer<typeof FormFieldSchema>

/////////////////////////////////////////
// FORM RESPONSE SCHEMA
/////////////////////////////////////////

export const FormResponseSchema = z.object({
  id: z.string().uuid(),
  formId: z.string(),
  question: z.string(),
  answer: z.string(),
  createdAt: z.coerce.date(),
})

export type FormResponse = z.infer<typeof FormResponseSchema>

/////////////////////////////////////////
// SUBSCRIPTION SCHEMA
/////////////////////////////////////////

export const SubscriptionSchema = z.object({
  status: SubscriptionStatusSchema,
  id: z.string().cuid(),
  userId: z.string(),
  polarProductId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Subscription = z.infer<typeof SubscriptionSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  subscription: z.union([z.boolean(),z.lazy(() => SubscriptionArgsSchema)]).optional(),
  Form: z.union([z.boolean(),z.lazy(() => FormFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  passkeys: z.union([z.boolean(),z.lazy(() => PasskeyFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  Form: z.boolean().optional(),
  sessions: z.boolean().optional(),
  accounts: z.boolean().optional(),
  passkeys: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  name: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  role: z.boolean().optional(),
  subscription: z.union([z.boolean(),z.lazy(() => SubscriptionArgsSchema)]).optional(),
  Form: z.union([z.boolean(),z.lazy(() => FormFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  passkeys: z.union([z.boolean(),z.lazy(() => PasskeyFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  token: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ipAddress: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  accountId: z.boolean().optional(),
  providerId: z.boolean().optional(),
  userId: z.boolean().optional(),
  accessToken: z.boolean().optional(),
  refreshToken: z.boolean().optional(),
  idToken: z.boolean().optional(),
  accessTokenExpiresAt: z.boolean().optional(),
  refreshTokenExpiresAt: z.boolean().optional(),
  scope: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION
//------------------------------------------------------

export const VerificationSelectSchema: z.ZodType<Prisma.VerificationSelect> = z.object({
  id: z.boolean().optional(),
  identifier: z.boolean().optional(),
  value: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// PASSKEY
//------------------------------------------------------

export const PasskeyIncludeSchema: z.ZodType<Prisma.PasskeyInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const PasskeyArgsSchema: z.ZodType<Prisma.PasskeyDefaultArgs> = z.object({
  select: z.lazy(() => PasskeySelectSchema).optional(),
  include: z.lazy(() => PasskeyIncludeSchema).optional(),
}).strict();

export const PasskeySelectSchema: z.ZodType<Prisma.PasskeySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  publicKey: z.boolean().optional(),
  userId: z.boolean().optional(),
  credentialID: z.boolean().optional(),
  counter: z.boolean().optional(),
  deviceType: z.boolean().optional(),
  backedUp: z.boolean().optional(),
  transports: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// FORM
//------------------------------------------------------

export const FormIncludeSchema: z.ZodType<Prisma.FormInclude> = z.object({
  fields: z.union([z.boolean(),z.lazy(() => FormFieldFindManyArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  FormResponses: z.union([z.boolean(),z.lazy(() => FormResponseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FormCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FormArgsSchema: z.ZodType<Prisma.FormDefaultArgs> = z.object({
  select: z.lazy(() => FormSelectSchema).optional(),
  include: z.lazy(() => FormIncludeSchema).optional(),
}).strict();

export const FormCountOutputTypeArgsSchema: z.ZodType<Prisma.FormCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FormCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FormCountOutputTypeSelectSchema: z.ZodType<Prisma.FormCountOutputTypeSelect> = z.object({
  fields: z.boolean().optional(),
  FormResponses: z.boolean().optional(),
}).strict();

export const FormSelectSchema: z.ZodType<Prisma.FormSelect> = z.object({
  id: z.boolean().optional(),
  uuid: z.boolean().optional(),
  name: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  isAnswered: z.boolean().optional(),
  isDraft: z.boolean().optional(),
  shareUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  fields: z.union([z.boolean(),z.lazy(() => FormFieldFindManyArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  FormResponses: z.union([z.boolean(),z.lazy(() => FormResponseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FormCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FORM FIELD
//------------------------------------------------------

export const FormFieldIncludeSchema: z.ZodType<Prisma.FormFieldInclude> = z.object({
  form: z.union([z.boolean(),z.lazy(() => FormArgsSchema)]).optional(),
}).strict()

export const FormFieldArgsSchema: z.ZodType<Prisma.FormFieldDefaultArgs> = z.object({
  select: z.lazy(() => FormFieldSelectSchema).optional(),
  include: z.lazy(() => FormFieldIncludeSchema).optional(),
}).strict();

export const FormFieldSelectSchema: z.ZodType<Prisma.FormFieldSelect> = z.object({
  id: z.boolean().optional(),
  label: z.boolean().optional(),
  fieldType: z.boolean().optional(),
  required: z.boolean().optional(),
  formId: z.boolean().optional(),
  form: z.union([z.boolean(),z.lazy(() => FormArgsSchema)]).optional(),
}).strict()

// FORM RESPONSE
//------------------------------------------------------

export const FormResponseIncludeSchema: z.ZodType<Prisma.FormResponseInclude> = z.object({
  form: z.union([z.boolean(),z.lazy(() => FormArgsSchema)]).optional(),
}).strict()

export const FormResponseArgsSchema: z.ZodType<Prisma.FormResponseDefaultArgs> = z.object({
  select: z.lazy(() => FormResponseSelectSchema).optional(),
  include: z.lazy(() => FormResponseIncludeSchema).optional(),
}).strict();

export const FormResponseSelectSchema: z.ZodType<Prisma.FormResponseSelect> = z.object({
  id: z.boolean().optional(),
  formId: z.boolean().optional(),
  question: z.boolean().optional(),
  answer: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  form: z.union([z.boolean(),z.lazy(() => FormArgsSchema)]).optional(),
}).strict()

// SUBSCRIPTION
//------------------------------------------------------

export const SubscriptionIncludeSchema: z.ZodType<Prisma.SubscriptionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SubscriptionArgsSchema: z.ZodType<Prisma.SubscriptionDefaultArgs> = z.object({
  select: z.lazy(() => SubscriptionSelectSchema).optional(),
  include: z.lazy(() => SubscriptionIncludeSchema).optional(),
}).strict();

export const SubscriptionSelectSchema: z.ZodType<Prisma.SubscriptionSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  status: z.boolean().optional(),
  polarProductId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  subscription: z.union([ z.lazy(() => SubscriptionNullableScalarRelationFilterSchema),z.lazy(() => SubscriptionWhereInputSchema) ]).optional().nullable(),
  Form: z.lazy(() => FormListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  passkeys: z.lazy(() => PasskeyListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  subscription: z.lazy(() => SubscriptionOrderByWithRelationInputSchema).optional(),
  Form: z.lazy(() => FormOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  subscription: z.union([ z.lazy(() => SubscriptionNullableScalarRelationFilterSchema),z.lazy(() => SubscriptionWhereInputSchema) ]).optional().nullable(),
  Form: z.lazy(() => FormListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  passkeys: z.lazy(() => PasskeyListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userAgent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    token: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    token: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userAgent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  idToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accessTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  idToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accessTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationWhereInputSchema: z.ZodType<Prisma.VerificationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const VerificationOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const VerificationWhereUniqueInputSchema: z.ZodType<Prisma.VerificationWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const VerificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => VerificationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const PasskeyWhereInputSchema: z.ZodType<Prisma.PasskeyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PasskeyWhereInputSchema),z.lazy(() => PasskeyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasskeyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasskeyWhereInputSchema),z.lazy(() => PasskeyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  publicKey: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  credentialID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  counter: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  deviceType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  backedUp: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  transports: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PasskeyOrderByWithRelationInputSchema: z.ZodType<Prisma.PasskeyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  publicKey: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  deviceType: z.lazy(() => SortOrderSchema).optional(),
  backedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PasskeyWhereUniqueInputSchema: z.ZodType<Prisma.PasskeyWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => PasskeyWhereInputSchema),z.lazy(() => PasskeyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasskeyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasskeyWhereInputSchema),z.lazy(() => PasskeyWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  publicKey: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  credentialID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  counter: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  deviceType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  backedUp: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  transports: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const PasskeyOrderByWithAggregationInputSchema: z.ZodType<Prisma.PasskeyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  publicKey: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  deviceType: z.lazy(() => SortOrderSchema).optional(),
  backedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PasskeyCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PasskeyAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PasskeyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PasskeyMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PasskeySumOrderByAggregateInputSchema).optional()
}).strict();

export const PasskeyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PasskeyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PasskeyScalarWhereWithAggregatesInputSchema),z.lazy(() => PasskeyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasskeyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasskeyScalarWhereWithAggregatesInputSchema),z.lazy(() => PasskeyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  publicKey: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  credentialID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  counter: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  deviceType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  backedUp: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  transports: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const FormWhereInputSchema: z.ZodType<Prisma.FormWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FormWhereInputSchema),z.lazy(() => FormWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormWhereInputSchema),z.lazy(() => FormWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  uuid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isAnswered: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isDraft: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  shareUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fields: z.lazy(() => FormFieldListRelationFilterSchema).optional(),
  User: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  FormResponses: z.lazy(() => FormResponseListRelationFilterSchema).optional()
}).strict();

export const FormOrderByWithRelationInputSchema: z.ZodType<Prisma.FormOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isAnswered: z.lazy(() => SortOrderSchema).optional(),
  isDraft: z.lazy(() => SortOrderSchema).optional(),
  shareUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  fields: z.lazy(() => FormFieldOrderByRelationAggregateInputSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  FormResponses: z.lazy(() => FormResponseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FormWhereUniqueInputSchema: z.ZodType<Prisma.FormWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    uuid: z.string().uuid()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    uuid: z.string().uuid(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  uuid: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => FormWhereInputSchema),z.lazy(() => FormWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormWhereInputSchema),z.lazy(() => FormWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isAnswered: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isDraft: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  shareUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fields: z.lazy(() => FormFieldListRelationFilterSchema).optional(),
  User: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  FormResponses: z.lazy(() => FormResponseListRelationFilterSchema).optional()
}).strict());

export const FormOrderByWithAggregationInputSchema: z.ZodType<Prisma.FormOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isAnswered: z.lazy(() => SortOrderSchema).optional(),
  isDraft: z.lazy(() => SortOrderSchema).optional(),
  shareUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FormCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FormMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FormMinOrderByAggregateInputSchema).optional()
}).strict();

export const FormScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FormScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FormScalarWhereWithAggregatesInputSchema),z.lazy(() => FormScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormScalarWhereWithAggregatesInputSchema),z.lazy(() => FormScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  uuid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isAnswered: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isDraft: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  shareUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const FormFieldWhereInputSchema: z.ZodType<Prisma.FormFieldWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FormFieldWhereInputSchema),z.lazy(() => FormFieldWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormFieldWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormFieldWhereInputSchema),z.lazy(() => FormFieldWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fieldType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  required: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  formId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  form: z.union([ z.lazy(() => FormScalarRelationFilterSchema),z.lazy(() => FormWhereInputSchema) ]).optional(),
}).strict();

export const FormFieldOrderByWithRelationInputSchema: z.ZodType<Prisma.FormFieldOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  fieldType: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional(),
  form: z.lazy(() => FormOrderByWithRelationInputSchema).optional()
}).strict();

export const FormFieldWhereUniqueInputSchema: z.ZodType<Prisma.FormFieldWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => FormFieldWhereInputSchema),z.lazy(() => FormFieldWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormFieldWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormFieldWhereInputSchema),z.lazy(() => FormFieldWhereInputSchema).array() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fieldType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  required: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  formId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  form: z.union([ z.lazy(() => FormScalarRelationFilterSchema),z.lazy(() => FormWhereInputSchema) ]).optional(),
}).strict());

export const FormFieldOrderByWithAggregationInputSchema: z.ZodType<Prisma.FormFieldOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  fieldType: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FormFieldCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FormFieldAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FormFieldMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FormFieldMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FormFieldSumOrderByAggregateInputSchema).optional()
}).strict();

export const FormFieldScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FormFieldScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FormFieldScalarWhereWithAggregatesInputSchema),z.lazy(() => FormFieldScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormFieldScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormFieldScalarWhereWithAggregatesInputSchema),z.lazy(() => FormFieldScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  fieldType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  required: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  formId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const FormResponseWhereInputSchema: z.ZodType<Prisma.FormResponseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FormResponseWhereInputSchema),z.lazy(() => FormResponseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormResponseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormResponseWhereInputSchema),z.lazy(() => FormResponseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  formId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  form: z.union([ z.lazy(() => FormScalarRelationFilterSchema),z.lazy(() => FormWhereInputSchema) ]).optional(),
}).strict();

export const FormResponseOrderByWithRelationInputSchema: z.ZodType<Prisma.FormResponseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  form: z.lazy(() => FormOrderByWithRelationInputSchema).optional()
}).strict();

export const FormResponseWhereUniqueInputSchema: z.ZodType<Prisma.FormResponseWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => FormResponseWhereInputSchema),z.lazy(() => FormResponseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormResponseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormResponseWhereInputSchema),z.lazy(() => FormResponseWhereInputSchema).array() ]).optional(),
  formId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  form: z.union([ z.lazy(() => FormScalarRelationFilterSchema),z.lazy(() => FormWhereInputSchema) ]).optional(),
}).strict());

export const FormResponseOrderByWithAggregationInputSchema: z.ZodType<Prisma.FormResponseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FormResponseCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FormResponseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FormResponseMinOrderByAggregateInputSchema).optional()
}).strict();

export const FormResponseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FormResponseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FormResponseScalarWhereWithAggregatesInputSchema),z.lazy(() => FormResponseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormResponseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormResponseScalarWhereWithAggregatesInputSchema),z.lazy(() => FormResponseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  formId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  question: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SubscriptionWhereInputSchema: z.ZodType<Prisma.SubscriptionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SubscriptionWhereInputSchema),z.lazy(() => SubscriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriptionWhereInputSchema),z.lazy(() => SubscriptionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumSubscriptionStatusFilterSchema),z.lazy(() => SubscriptionStatusSchema) ]).optional(),
  polarProductId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SubscriptionOrderByWithRelationInputSchema: z.ZodType<Prisma.SubscriptionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  polarProductId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SubscriptionWhereUniqueInputSchema: z.ZodType<Prisma.SubscriptionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => SubscriptionWhereInputSchema),z.lazy(() => SubscriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriptionWhereInputSchema),z.lazy(() => SubscriptionWhereInputSchema).array() ]).optional(),
  status: z.union([ z.lazy(() => EnumSubscriptionStatusFilterSchema),z.lazy(() => SubscriptionStatusSchema) ]).optional(),
  polarProductId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SubscriptionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubscriptionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  polarProductId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SubscriptionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SubscriptionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SubscriptionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SubscriptionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubscriptionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumSubscriptionStatusWithAggregatesFilterSchema),z.lazy(() => SubscriptionStatusSchema) ]).optional(),
  polarProductId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.lazy(() => RoleSchema).optional(),
  subscription: z.lazy(() => SubscriptionCreateNestedOneWithoutUserInputSchema).optional(),
  Form: z.lazy(() => FormCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.lazy(() => RoleSchema).optional(),
  subscription: z.lazy(() => SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Form: z.lazy(() => FormUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  subscription: z.lazy(() => SubscriptionUpdateOneWithoutUserNestedInputSchema).optional(),
  Form: z.lazy(() => FormUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  subscription: z.lazy(() => SubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Form: z.lazy(() => FormUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.lazy(() => RoleSchema).optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationCreateInputSchema: z.ZodType<Prisma.VerificationCreateInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationUncheckedCreateInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUpdateInputSchema: z.ZodType<Prisma.VerificationUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationCreateManyInputSchema: z.ZodType<Prisma.VerificationCreateManyInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PasskeyCreateInputSchema: z.ZodType<Prisma.PasskeyCreateInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  publicKey: z.string(),
  credentialID: z.string(),
  counter: z.number().int(),
  deviceType: z.string(),
  backedUp: z.boolean(),
  transports: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutPasskeysInputSchema)
}).strict();

export const PasskeyUncheckedCreateInputSchema: z.ZodType<Prisma.PasskeyUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  publicKey: z.string(),
  userId: z.string(),
  credentialID: z.string(),
  counter: z.number().int(),
  deviceType: z.string(),
  backedUp: z.boolean(),
  transports: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const PasskeyUpdateInputSchema: z.ZodType<Prisma.PasskeyUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  publicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPasskeysNestedInputSchema).optional()
}).strict();

export const PasskeyUncheckedUpdateInputSchema: z.ZodType<Prisma.PasskeyUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  publicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PasskeyCreateManyInputSchema: z.ZodType<Prisma.PasskeyCreateManyInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  publicKey: z.string(),
  userId: z.string(),
  credentialID: z.string(),
  counter: z.number().int(),
  deviceType: z.string(),
  backedUp: z.boolean(),
  transports: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const PasskeyUpdateManyMutationInputSchema: z.ZodType<Prisma.PasskeyUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  publicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PasskeyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PasskeyUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  publicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FormCreateInputSchema: z.ZodType<Prisma.FormCreateInput> = z.object({
  id: z.string().cuid().optional(),
  uuid: z.string().uuid().optional(),
  name: z.string(),
  isPublished: z.boolean().optional(),
  isAnswered: z.boolean().optional(),
  isDraft: z.boolean().optional(),
  shareUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fields: z.lazy(() => FormFieldCreateNestedManyWithoutFormInputSchema).optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutFormInputSchema),
  FormResponses: z.lazy(() => FormResponseCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormUncheckedCreateInputSchema: z.ZodType<Prisma.FormUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  uuid: z.string().uuid().optional(),
  name: z.string(),
  isPublished: z.boolean().optional(),
  isAnswered: z.boolean().optional(),
  isDraft: z.boolean().optional(),
  shareUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  fields: z.lazy(() => FormFieldUncheckedCreateNestedManyWithoutFormInputSchema).optional(),
  FormResponses: z.lazy(() => FormResponseUncheckedCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormUpdateInputSchema: z.ZodType<Prisma.FormUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAnswered: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDraft: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  shareUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fields: z.lazy(() => FormFieldUpdateManyWithoutFormNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutFormNestedInputSchema).optional(),
  FormResponses: z.lazy(() => FormResponseUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const FormUncheckedUpdateInputSchema: z.ZodType<Prisma.FormUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAnswered: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDraft: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  shareUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fields: z.lazy(() => FormFieldUncheckedUpdateManyWithoutFormNestedInputSchema).optional(),
  FormResponses: z.lazy(() => FormResponseUncheckedUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const FormCreateManyInputSchema: z.ZodType<Prisma.FormCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  uuid: z.string().uuid().optional(),
  name: z.string(),
  isPublished: z.boolean().optional(),
  isAnswered: z.boolean().optional(),
  isDraft: z.boolean().optional(),
  shareUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const FormUpdateManyMutationInputSchema: z.ZodType<Prisma.FormUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAnswered: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDraft: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  shareUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FormUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAnswered: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDraft: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  shareUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormFieldCreateInputSchema: z.ZodType<Prisma.FormFieldCreateInput> = z.object({
  label: z.string(),
  fieldType: z.string(),
  required: z.boolean().optional(),
  form: z.lazy(() => FormCreateNestedOneWithoutFieldsInputSchema)
}).strict();

export const FormFieldUncheckedCreateInputSchema: z.ZodType<Prisma.FormFieldUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  fieldType: z.string(),
  required: z.boolean().optional(),
  formId: z.string()
}).strict();

export const FormFieldUpdateInputSchema: z.ZodType<Prisma.FormFieldUpdateInput> = z.object({
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fieldType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  form: z.lazy(() => FormUpdateOneRequiredWithoutFieldsNestedInputSchema).optional()
}).strict();

export const FormFieldUncheckedUpdateInputSchema: z.ZodType<Prisma.FormFieldUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fieldType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  formId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormFieldCreateManyInputSchema: z.ZodType<Prisma.FormFieldCreateManyInput> = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  fieldType: z.string(),
  required: z.boolean().optional(),
  formId: z.string()
}).strict();

export const FormFieldUpdateManyMutationInputSchema: z.ZodType<Prisma.FormFieldUpdateManyMutationInput> = z.object({
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fieldType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormFieldUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FormFieldUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fieldType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  formId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormResponseCreateInputSchema: z.ZodType<Prisma.FormResponseCreateInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  answer: z.string(),
  createdAt: z.coerce.date().optional(),
  form: z.lazy(() => FormCreateNestedOneWithoutFormResponsesInputSchema)
}).strict();

export const FormResponseUncheckedCreateInputSchema: z.ZodType<Prisma.FormResponseUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  formId: z.string(),
  question: z.string(),
  answer: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FormResponseUpdateInputSchema: z.ZodType<Prisma.FormResponseUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  form: z.lazy(() => FormUpdateOneRequiredWithoutFormResponsesNestedInputSchema).optional()
}).strict();

export const FormResponseUncheckedUpdateInputSchema: z.ZodType<Prisma.FormResponseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  formId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormResponseCreateManyInputSchema: z.ZodType<Prisma.FormResponseCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  formId: z.string(),
  question: z.string(),
  answer: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FormResponseUpdateManyMutationInputSchema: z.ZodType<Prisma.FormResponseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormResponseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FormResponseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  formId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscriptionCreateInputSchema: z.ZodType<Prisma.SubscriptionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => SubscriptionStatusSchema).optional(),
  polarProductId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSubscriptionInputSchema)
}).strict();

export const SubscriptionUncheckedCreateInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  status: z.lazy(() => SubscriptionStatusSchema).optional(),
  polarProductId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SubscriptionUpdateInputSchema: z.ZodType<Prisma.SubscriptionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubscriptionStatusSchema),z.lazy(() => EnumSubscriptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  polarProductId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSubscriptionNestedInputSchema).optional()
}).strict();

export const SubscriptionUncheckedUpdateInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubscriptionStatusSchema),z.lazy(() => EnumSubscriptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  polarProductId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscriptionCreateManyInputSchema: z.ZodType<Prisma.SubscriptionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  status: z.lazy(() => SubscriptionStatusSchema).optional(),
  polarProductId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SubscriptionUpdateManyMutationInputSchema: z.ZodType<Prisma.SubscriptionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubscriptionStatusSchema),z.lazy(() => EnumSubscriptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  polarProductId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscriptionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubscriptionStatusSchema),z.lazy(() => EnumSubscriptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  polarProductId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const SubscriptionNullableScalarRelationFilterSchema: z.ZodType<Prisma.SubscriptionNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => SubscriptionWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SubscriptionWhereInputSchema).optional().nullable()
}).strict();

export const FormListRelationFilterSchema: z.ZodType<Prisma.FormListRelationFilter> = z.object({
  every: z.lazy(() => FormWhereInputSchema).optional(),
  some: z.lazy(() => FormWhereInputSchema).optional(),
  none: z.lazy(() => FormWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const PasskeyListRelationFilterSchema: z.ZodType<Prisma.PasskeyListRelationFilter> = z.object({
  every: z.lazy(() => PasskeyWhereInputSchema).optional(),
  some: z.lazy(() => PasskeyWhereInputSchema).optional(),
  none: z.lazy(() => PasskeyWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const FormOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FormOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasskeyOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PasskeyOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const VerificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const PasskeyCountOrderByAggregateInputSchema: z.ZodType<Prisma.PasskeyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  publicKey: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  deviceType: z.lazy(() => SortOrderSchema).optional(),
  backedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasskeyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PasskeyAvgOrderByAggregateInput> = z.object({
  counter: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasskeyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PasskeyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  publicKey: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  deviceType: z.lazy(() => SortOrderSchema).optional(),
  backedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasskeyMinOrderByAggregateInputSchema: z.ZodType<Prisma.PasskeyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  publicKey: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  deviceType: z.lazy(() => SortOrderSchema).optional(),
  backedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasskeySumOrderByAggregateInputSchema: z.ZodType<Prisma.PasskeySumOrderByAggregateInput> = z.object({
  counter: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const FormFieldListRelationFilterSchema: z.ZodType<Prisma.FormFieldListRelationFilter> = z.object({
  every: z.lazy(() => FormFieldWhereInputSchema).optional(),
  some: z.lazy(() => FormFieldWhereInputSchema).optional(),
  none: z.lazy(() => FormFieldWhereInputSchema).optional()
}).strict();

export const FormResponseListRelationFilterSchema: z.ZodType<Prisma.FormResponseListRelationFilter> = z.object({
  every: z.lazy(() => FormResponseWhereInputSchema).optional(),
  some: z.lazy(() => FormResponseWhereInputSchema).optional(),
  none: z.lazy(() => FormResponseWhereInputSchema).optional()
}).strict();

export const FormFieldOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FormFieldOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormResponseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FormResponseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormCountOrderByAggregateInputSchema: z.ZodType<Prisma.FormCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isAnswered: z.lazy(() => SortOrderSchema).optional(),
  isDraft: z.lazy(() => SortOrderSchema).optional(),
  shareUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FormMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isAnswered: z.lazy(() => SortOrderSchema).optional(),
  isDraft: z.lazy(() => SortOrderSchema).optional(),
  shareUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormMinOrderByAggregateInputSchema: z.ZodType<Prisma.FormMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  isPublished: z.lazy(() => SortOrderSchema).optional(),
  isAnswered: z.lazy(() => SortOrderSchema).optional(),
  isDraft: z.lazy(() => SortOrderSchema).optional(),
  shareUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormScalarRelationFilterSchema: z.ZodType<Prisma.FormScalarRelationFilter> = z.object({
  is: z.lazy(() => FormWhereInputSchema).optional(),
  isNot: z.lazy(() => FormWhereInputSchema).optional()
}).strict();

export const FormFieldCountOrderByAggregateInputSchema: z.ZodType<Prisma.FormFieldCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  fieldType: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormFieldAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FormFieldAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormFieldMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FormFieldMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  fieldType: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormFieldMinOrderByAggregateInputSchema: z.ZodType<Prisma.FormFieldMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  fieldType: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormFieldSumOrderByAggregateInputSchema: z.ZodType<Prisma.FormFieldSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormResponseCountOrderByAggregateInputSchema: z.ZodType<Prisma.FormResponseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormResponseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FormResponseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FormResponseMinOrderByAggregateInputSchema: z.ZodType<Prisma.FormResponseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  formId: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  answer: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSubscriptionStatusFilterSchema: z.ZodType<Prisma.EnumSubscriptionStatusFilter> = z.object({
  equals: z.lazy(() => SubscriptionStatusSchema).optional(),
  in: z.lazy(() => SubscriptionStatusSchema).array().optional(),
  notIn: z.lazy(() => SubscriptionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriptionStatusSchema),z.lazy(() => NestedEnumSubscriptionStatusFilterSchema) ]).optional(),
}).strict();

export const SubscriptionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  polarProductId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubscriptionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  polarProductId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SubscriptionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  polarProductId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumSubscriptionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumSubscriptionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SubscriptionStatusSchema).optional(),
  in: z.lazy(() => SubscriptionStatusSchema).array().optional(),
  notIn: z.lazy(() => SubscriptionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriptionStatusSchema),z.lazy(() => NestedEnumSubscriptionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSubscriptionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSubscriptionStatusFilterSchema).optional()
}).strict();

export const SubscriptionCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional()
}).strict();

export const FormCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FormCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutUserInputSchema),z.lazy(() => FormCreateWithoutUserInputSchema).array(),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormCreateOrConnectWithoutUserInputSchema),z.lazy(() => FormCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasskeyCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PasskeyCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PasskeyCreateWithoutUserInputSchema),z.lazy(() => PasskeyCreateWithoutUserInputSchema).array(),z.lazy(() => PasskeyUncheckedCreateWithoutUserInputSchema),z.lazy(() => PasskeyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasskeyCreateOrConnectWithoutUserInputSchema),z.lazy(() => PasskeyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasskeyCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PasskeyWhereUniqueInputSchema),z.lazy(() => PasskeyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional()
}).strict();

export const FormUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FormUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutUserInputSchema),z.lazy(() => FormCreateWithoutUserInputSchema).array(),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormCreateOrConnectWithoutUserInputSchema),z.lazy(() => FormCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasskeyUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PasskeyUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PasskeyCreateWithoutUserInputSchema),z.lazy(() => PasskeyCreateWithoutUserInputSchema).array(),z.lazy(() => PasskeyUncheckedCreateWithoutUserInputSchema),z.lazy(() => PasskeyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasskeyCreateOrConnectWithoutUserInputSchema),z.lazy(() => PasskeyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasskeyCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PasskeyWhereUniqueInputSchema),z.lazy(() => PasskeyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const SubscriptionUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SubscriptionUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SubscriptionUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SubscriptionWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SubscriptionWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SubscriptionUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => SubscriptionUpdateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const FormUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FormUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutUserInputSchema),z.lazy(() => FormCreateWithoutUserInputSchema).array(),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormCreateOrConnectWithoutUserInputSchema),z.lazy(() => FormCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FormUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FormUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FormUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FormUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FormUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FormUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FormScalarWhereInputSchema),z.lazy(() => FormScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PasskeyUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PasskeyUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PasskeyCreateWithoutUserInputSchema),z.lazy(() => PasskeyCreateWithoutUserInputSchema).array(),z.lazy(() => PasskeyUncheckedCreateWithoutUserInputSchema),z.lazy(() => PasskeyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasskeyCreateOrConnectWithoutUserInputSchema),z.lazy(() => PasskeyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PasskeyUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PasskeyUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasskeyCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PasskeyWhereUniqueInputSchema),z.lazy(() => PasskeyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PasskeyWhereUniqueInputSchema),z.lazy(() => PasskeyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PasskeyWhereUniqueInputSchema),z.lazy(() => PasskeyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PasskeyWhereUniqueInputSchema),z.lazy(() => PasskeyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PasskeyUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PasskeyUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PasskeyUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PasskeyUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PasskeyScalarWhereInputSchema),z.lazy(() => PasskeyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SubscriptionUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SubscriptionWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SubscriptionWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SubscriptionUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => SubscriptionUpdateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const FormUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FormUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutUserInputSchema),z.lazy(() => FormCreateWithoutUserInputSchema).array(),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormCreateOrConnectWithoutUserInputSchema),z.lazy(() => FormCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FormUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FormUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FormWhereUniqueInputSchema),z.lazy(() => FormWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FormUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FormUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FormUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FormUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FormScalarWhereInputSchema),z.lazy(() => FormScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PasskeyUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PasskeyUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PasskeyCreateWithoutUserInputSchema),z.lazy(() => PasskeyCreateWithoutUserInputSchema).array(),z.lazy(() => PasskeyUncheckedCreateWithoutUserInputSchema),z.lazy(() => PasskeyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasskeyCreateOrConnectWithoutUserInputSchema),z.lazy(() => PasskeyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PasskeyUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PasskeyUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasskeyCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PasskeyWhereUniqueInputSchema),z.lazy(() => PasskeyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PasskeyWhereUniqueInputSchema),z.lazy(() => PasskeyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PasskeyWhereUniqueInputSchema),z.lazy(() => PasskeyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PasskeyWhereUniqueInputSchema),z.lazy(() => PasskeyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PasskeyUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PasskeyUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PasskeyUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PasskeyUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PasskeyScalarWhereInputSchema),z.lazy(() => PasskeyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPasskeysInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPasskeysInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPasskeysInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasskeysInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPasskeysInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutPasskeysNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPasskeysNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPasskeysInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasskeysInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPasskeysInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPasskeysInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPasskeysInputSchema),z.lazy(() => UserUpdateWithoutPasskeysInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPasskeysInputSchema) ]).optional(),
}).strict();

export const FormFieldCreateNestedManyWithoutFormInputSchema: z.ZodType<Prisma.FormFieldCreateNestedManyWithoutFormInput> = z.object({
  create: z.union([ z.lazy(() => FormFieldCreateWithoutFormInputSchema),z.lazy(() => FormFieldCreateWithoutFormInputSchema).array(),z.lazy(() => FormFieldUncheckedCreateWithoutFormInputSchema),z.lazy(() => FormFieldUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormFieldCreateOrConnectWithoutFormInputSchema),z.lazy(() => FormFieldCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormFieldCreateManyFormInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FormFieldWhereUniqueInputSchema),z.lazy(() => FormFieldWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutFormInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFormInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFormInputSchema),z.lazy(() => UserUncheckedCreateWithoutFormInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFormInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const FormResponseCreateNestedManyWithoutFormInputSchema: z.ZodType<Prisma.FormResponseCreateNestedManyWithoutFormInput> = z.object({
  create: z.union([ z.lazy(() => FormResponseCreateWithoutFormInputSchema),z.lazy(() => FormResponseCreateWithoutFormInputSchema).array(),z.lazy(() => FormResponseUncheckedCreateWithoutFormInputSchema),z.lazy(() => FormResponseUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormResponseCreateOrConnectWithoutFormInputSchema),z.lazy(() => FormResponseCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormResponseCreateManyFormInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FormResponseWhereUniqueInputSchema),z.lazy(() => FormResponseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FormFieldUncheckedCreateNestedManyWithoutFormInputSchema: z.ZodType<Prisma.FormFieldUncheckedCreateNestedManyWithoutFormInput> = z.object({
  create: z.union([ z.lazy(() => FormFieldCreateWithoutFormInputSchema),z.lazy(() => FormFieldCreateWithoutFormInputSchema).array(),z.lazy(() => FormFieldUncheckedCreateWithoutFormInputSchema),z.lazy(() => FormFieldUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormFieldCreateOrConnectWithoutFormInputSchema),z.lazy(() => FormFieldCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormFieldCreateManyFormInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FormFieldWhereUniqueInputSchema),z.lazy(() => FormFieldWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FormResponseUncheckedCreateNestedManyWithoutFormInputSchema: z.ZodType<Prisma.FormResponseUncheckedCreateNestedManyWithoutFormInput> = z.object({
  create: z.union([ z.lazy(() => FormResponseCreateWithoutFormInputSchema),z.lazy(() => FormResponseCreateWithoutFormInputSchema).array(),z.lazy(() => FormResponseUncheckedCreateWithoutFormInputSchema),z.lazy(() => FormResponseUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormResponseCreateOrConnectWithoutFormInputSchema),z.lazy(() => FormResponseCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormResponseCreateManyFormInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FormResponseWhereUniqueInputSchema),z.lazy(() => FormResponseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FormFieldUpdateManyWithoutFormNestedInputSchema: z.ZodType<Prisma.FormFieldUpdateManyWithoutFormNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormFieldCreateWithoutFormInputSchema),z.lazy(() => FormFieldCreateWithoutFormInputSchema).array(),z.lazy(() => FormFieldUncheckedCreateWithoutFormInputSchema),z.lazy(() => FormFieldUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormFieldCreateOrConnectWithoutFormInputSchema),z.lazy(() => FormFieldCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FormFieldUpsertWithWhereUniqueWithoutFormInputSchema),z.lazy(() => FormFieldUpsertWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormFieldCreateManyFormInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FormFieldWhereUniqueInputSchema),z.lazy(() => FormFieldWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FormFieldWhereUniqueInputSchema),z.lazy(() => FormFieldWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FormFieldWhereUniqueInputSchema),z.lazy(() => FormFieldWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FormFieldWhereUniqueInputSchema),z.lazy(() => FormFieldWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FormFieldUpdateWithWhereUniqueWithoutFormInputSchema),z.lazy(() => FormFieldUpdateWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FormFieldUpdateManyWithWhereWithoutFormInputSchema),z.lazy(() => FormFieldUpdateManyWithWhereWithoutFormInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FormFieldScalarWhereInputSchema),z.lazy(() => FormFieldScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutFormNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFormNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutFormInputSchema),z.lazy(() => UserUncheckedCreateWithoutFormInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFormInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFormInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFormInputSchema),z.lazy(() => UserUpdateWithoutFormInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFormInputSchema) ]).optional(),
}).strict();

export const FormResponseUpdateManyWithoutFormNestedInputSchema: z.ZodType<Prisma.FormResponseUpdateManyWithoutFormNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormResponseCreateWithoutFormInputSchema),z.lazy(() => FormResponseCreateWithoutFormInputSchema).array(),z.lazy(() => FormResponseUncheckedCreateWithoutFormInputSchema),z.lazy(() => FormResponseUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormResponseCreateOrConnectWithoutFormInputSchema),z.lazy(() => FormResponseCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FormResponseUpsertWithWhereUniqueWithoutFormInputSchema),z.lazy(() => FormResponseUpsertWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormResponseCreateManyFormInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FormResponseWhereUniqueInputSchema),z.lazy(() => FormResponseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FormResponseWhereUniqueInputSchema),z.lazy(() => FormResponseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FormResponseWhereUniqueInputSchema),z.lazy(() => FormResponseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FormResponseWhereUniqueInputSchema),z.lazy(() => FormResponseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FormResponseUpdateWithWhereUniqueWithoutFormInputSchema),z.lazy(() => FormResponseUpdateWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FormResponseUpdateManyWithWhereWithoutFormInputSchema),z.lazy(() => FormResponseUpdateManyWithWhereWithoutFormInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FormResponseScalarWhereInputSchema),z.lazy(() => FormResponseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FormFieldUncheckedUpdateManyWithoutFormNestedInputSchema: z.ZodType<Prisma.FormFieldUncheckedUpdateManyWithoutFormNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormFieldCreateWithoutFormInputSchema),z.lazy(() => FormFieldCreateWithoutFormInputSchema).array(),z.lazy(() => FormFieldUncheckedCreateWithoutFormInputSchema),z.lazy(() => FormFieldUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormFieldCreateOrConnectWithoutFormInputSchema),z.lazy(() => FormFieldCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FormFieldUpsertWithWhereUniqueWithoutFormInputSchema),z.lazy(() => FormFieldUpsertWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormFieldCreateManyFormInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FormFieldWhereUniqueInputSchema),z.lazy(() => FormFieldWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FormFieldWhereUniqueInputSchema),z.lazy(() => FormFieldWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FormFieldWhereUniqueInputSchema),z.lazy(() => FormFieldWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FormFieldWhereUniqueInputSchema),z.lazy(() => FormFieldWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FormFieldUpdateWithWhereUniqueWithoutFormInputSchema),z.lazy(() => FormFieldUpdateWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FormFieldUpdateManyWithWhereWithoutFormInputSchema),z.lazy(() => FormFieldUpdateManyWithWhereWithoutFormInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FormFieldScalarWhereInputSchema),z.lazy(() => FormFieldScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FormResponseUncheckedUpdateManyWithoutFormNestedInputSchema: z.ZodType<Prisma.FormResponseUncheckedUpdateManyWithoutFormNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormResponseCreateWithoutFormInputSchema),z.lazy(() => FormResponseCreateWithoutFormInputSchema).array(),z.lazy(() => FormResponseUncheckedCreateWithoutFormInputSchema),z.lazy(() => FormResponseUncheckedCreateWithoutFormInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FormResponseCreateOrConnectWithoutFormInputSchema),z.lazy(() => FormResponseCreateOrConnectWithoutFormInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FormResponseUpsertWithWhereUniqueWithoutFormInputSchema),z.lazy(() => FormResponseUpsertWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FormResponseCreateManyFormInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FormResponseWhereUniqueInputSchema),z.lazy(() => FormResponseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FormResponseWhereUniqueInputSchema),z.lazy(() => FormResponseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FormResponseWhereUniqueInputSchema),z.lazy(() => FormResponseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FormResponseWhereUniqueInputSchema),z.lazy(() => FormResponseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FormResponseUpdateWithWhereUniqueWithoutFormInputSchema),z.lazy(() => FormResponseUpdateWithWhereUniqueWithoutFormInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FormResponseUpdateManyWithWhereWithoutFormInputSchema),z.lazy(() => FormResponseUpdateManyWithWhereWithoutFormInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FormResponseScalarWhereInputSchema),z.lazy(() => FormResponseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FormCreateNestedOneWithoutFieldsInputSchema: z.ZodType<Prisma.FormCreateNestedOneWithoutFieldsInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutFieldsInputSchema),z.lazy(() => FormUncheckedCreateWithoutFieldsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FormCreateOrConnectWithoutFieldsInputSchema).optional(),
  connect: z.lazy(() => FormWhereUniqueInputSchema).optional()
}).strict();

export const FormUpdateOneRequiredWithoutFieldsNestedInputSchema: z.ZodType<Prisma.FormUpdateOneRequiredWithoutFieldsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutFieldsInputSchema),z.lazy(() => FormUncheckedCreateWithoutFieldsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FormCreateOrConnectWithoutFieldsInputSchema).optional(),
  upsert: z.lazy(() => FormUpsertWithoutFieldsInputSchema).optional(),
  connect: z.lazy(() => FormWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FormUpdateToOneWithWhereWithoutFieldsInputSchema),z.lazy(() => FormUpdateWithoutFieldsInputSchema),z.lazy(() => FormUncheckedUpdateWithoutFieldsInputSchema) ]).optional(),
}).strict();

export const FormCreateNestedOneWithoutFormResponsesInputSchema: z.ZodType<Prisma.FormCreateNestedOneWithoutFormResponsesInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutFormResponsesInputSchema),z.lazy(() => FormUncheckedCreateWithoutFormResponsesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FormCreateOrConnectWithoutFormResponsesInputSchema).optional(),
  connect: z.lazy(() => FormWhereUniqueInputSchema).optional()
}).strict();

export const FormUpdateOneRequiredWithoutFormResponsesNestedInputSchema: z.ZodType<Prisma.FormUpdateOneRequiredWithoutFormResponsesNestedInput> = z.object({
  create: z.union([ z.lazy(() => FormCreateWithoutFormResponsesInputSchema),z.lazy(() => FormUncheckedCreateWithoutFormResponsesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FormCreateOrConnectWithoutFormResponsesInputSchema).optional(),
  upsert: z.lazy(() => FormUpsertWithoutFormResponsesInputSchema).optional(),
  connect: z.lazy(() => FormWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FormUpdateToOneWithWhereWithoutFormResponsesInputSchema),z.lazy(() => FormUpdateWithoutFormResponsesInputSchema),z.lazy(() => FormUncheckedUpdateWithoutFormResponsesInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSubscriptionInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumSubscriptionStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => SubscriptionStatusSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSubscriptionNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSubscriptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSubscriptionInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSubscriptionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSubscriptionInputSchema),z.lazy(() => UserUpdateWithoutSubscriptionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumSubscriptionStatusFilterSchema: z.ZodType<Prisma.NestedEnumSubscriptionStatusFilter> = z.object({
  equals: z.lazy(() => SubscriptionStatusSchema).optional(),
  in: z.lazy(() => SubscriptionStatusSchema).array().optional(),
  notIn: z.lazy(() => SubscriptionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriptionStatusSchema),z.lazy(() => NestedEnumSubscriptionStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumSubscriptionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumSubscriptionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => SubscriptionStatusSchema).optional(),
  in: z.lazy(() => SubscriptionStatusSchema).array().optional(),
  notIn: z.lazy(() => SubscriptionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => SubscriptionStatusSchema),z.lazy(() => NestedEnumSubscriptionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumSubscriptionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumSubscriptionStatusFilterSchema).optional()
}).strict();

export const SubscriptionCreateWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => SubscriptionStatusSchema).optional(),
  polarProductId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SubscriptionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.lazy(() => SubscriptionStatusSchema).optional(),
  polarProductId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SubscriptionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FormCreateWithoutUserInputSchema: z.ZodType<Prisma.FormCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  uuid: z.string().uuid().optional(),
  name: z.string(),
  isPublished: z.boolean().optional(),
  isAnswered: z.boolean().optional(),
  isDraft: z.boolean().optional(),
  shareUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fields: z.lazy(() => FormFieldCreateNestedManyWithoutFormInputSchema).optional(),
  FormResponses: z.lazy(() => FormResponseCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FormUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  uuid: z.string().uuid().optional(),
  name: z.string(),
  isPublished: z.boolean().optional(),
  isAnswered: z.boolean().optional(),
  isDraft: z.boolean().optional(),
  shareUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fields: z.lazy(() => FormFieldUncheckedCreateNestedManyWithoutFormInputSchema).optional(),
  FormResponses: z.lazy(() => FormResponseUncheckedCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FormCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => FormWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FormCreateWithoutUserInputSchema),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FormCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.FormCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FormCreateManyUserInputSchema),z.lazy(() => FormCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PasskeyCreateWithoutUserInputSchema: z.ZodType<Prisma.PasskeyCreateWithoutUserInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  publicKey: z.string(),
  credentialID: z.string(),
  counter: z.number().int(),
  deviceType: z.string(),
  backedUp: z.boolean(),
  transports: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const PasskeyUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PasskeyUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  publicKey: z.string(),
  credentialID: z.string(),
  counter: z.number().int(),
  deviceType: z.string(),
  backedUp: z.boolean(),
  transports: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const PasskeyCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PasskeyCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PasskeyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PasskeyCreateWithoutUserInputSchema),z.lazy(() => PasskeyUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PasskeyCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.PasskeyCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PasskeyCreateManyUserInputSchema),z.lazy(() => PasskeyCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SubscriptionUpsertWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => SubscriptionUpdateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SubscriptionCreateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => SubscriptionWhereInputSchema).optional()
}).strict();

export const SubscriptionUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SubscriptionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SubscriptionUpdateWithoutUserInputSchema),z.lazy(() => SubscriptionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SubscriptionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubscriptionStatusSchema),z.lazy(() => EnumSubscriptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  polarProductId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SubscriptionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SubscriptionStatusSchema),z.lazy(() => EnumSubscriptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  polarProductId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FormUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FormWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FormUpdateWithoutUserInputSchema),z.lazy(() => FormUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FormCreateWithoutUserInputSchema),z.lazy(() => FormUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FormUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FormUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FormWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FormUpdateWithoutUserInputSchema),z.lazy(() => FormUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const FormUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.FormUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => FormScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FormUpdateManyMutationInputSchema),z.lazy(() => FormUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const FormScalarWhereInputSchema: z.ZodType<Prisma.FormScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FormScalarWhereInputSchema),z.lazy(() => FormScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormScalarWhereInputSchema),z.lazy(() => FormScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  uuid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isPublished: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isAnswered: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isDraft: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  shareUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PasskeyUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PasskeyUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PasskeyWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PasskeyUpdateWithoutUserInputSchema),z.lazy(() => PasskeyUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PasskeyCreateWithoutUserInputSchema),z.lazy(() => PasskeyUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PasskeyUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PasskeyUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PasskeyWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PasskeyUpdateWithoutUserInputSchema),z.lazy(() => PasskeyUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const PasskeyUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PasskeyUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PasskeyScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PasskeyUpdateManyMutationInputSchema),z.lazy(() => PasskeyUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const PasskeyScalarWhereInputSchema: z.ZodType<Prisma.PasskeyScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PasskeyScalarWhereInputSchema),z.lazy(() => PasskeyScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasskeyScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasskeyScalarWhereInputSchema),z.lazy(() => PasskeyScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  publicKey: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  credentialID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  counter: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  deviceType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  backedUp: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  transports: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.lazy(() => RoleSchema).optional(),
  subscription: z.lazy(() => SubscriptionCreateNestedOneWithoutUserInputSchema).optional(),
  Form: z.lazy(() => FormCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.lazy(() => RoleSchema).optional(),
  subscription: z.lazy(() => SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Form: z.lazy(() => FormUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  subscription: z.lazy(() => SubscriptionUpdateOneWithoutUserNestedInputSchema).optional(),
  Form: z.lazy(() => FormUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  subscription: z.lazy(() => SubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Form: z.lazy(() => FormUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.lazy(() => RoleSchema).optional(),
  subscription: z.lazy(() => SubscriptionCreateNestedOneWithoutUserInputSchema).optional(),
  Form: z.lazy(() => FormCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.lazy(() => RoleSchema).optional(),
  subscription: z.lazy(() => SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Form: z.lazy(() => FormUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  subscription: z.lazy(() => SubscriptionUpdateOneWithoutUserNestedInputSchema).optional(),
  Form: z.lazy(() => FormUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  subscription: z.lazy(() => SubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Form: z.lazy(() => FormUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutPasskeysInputSchema: z.ZodType<Prisma.UserCreateWithoutPasskeysInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.lazy(() => RoleSchema).optional(),
  subscription: z.lazy(() => SubscriptionCreateNestedOneWithoutUserInputSchema).optional(),
  Form: z.lazy(() => FormCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPasskeysInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPasskeysInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.lazy(() => RoleSchema).optional(),
  subscription: z.lazy(() => SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  Form: z.lazy(() => FormUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPasskeysInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPasskeysInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPasskeysInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasskeysInputSchema) ]),
}).strict();

export const UserUpsertWithoutPasskeysInputSchema: z.ZodType<Prisma.UserUpsertWithoutPasskeysInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPasskeysInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPasskeysInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPasskeysInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasskeysInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPasskeysInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPasskeysInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPasskeysInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPasskeysInputSchema) ]),
}).strict();

export const UserUpdateWithoutPasskeysInputSchema: z.ZodType<Prisma.UserUpdateWithoutPasskeysInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  subscription: z.lazy(() => SubscriptionUpdateOneWithoutUserNestedInputSchema).optional(),
  Form: z.lazy(() => FormUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPasskeysInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPasskeysInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  subscription: z.lazy(() => SubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  Form: z.lazy(() => FormUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const FormFieldCreateWithoutFormInputSchema: z.ZodType<Prisma.FormFieldCreateWithoutFormInput> = z.object({
  label: z.string(),
  fieldType: z.string(),
  required: z.boolean().optional()
}).strict();

export const FormFieldUncheckedCreateWithoutFormInputSchema: z.ZodType<Prisma.FormFieldUncheckedCreateWithoutFormInput> = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  fieldType: z.string(),
  required: z.boolean().optional()
}).strict();

export const FormFieldCreateOrConnectWithoutFormInputSchema: z.ZodType<Prisma.FormFieldCreateOrConnectWithoutFormInput> = z.object({
  where: z.lazy(() => FormFieldWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FormFieldCreateWithoutFormInputSchema),z.lazy(() => FormFieldUncheckedCreateWithoutFormInputSchema) ]),
}).strict();

export const FormFieldCreateManyFormInputEnvelopeSchema: z.ZodType<Prisma.FormFieldCreateManyFormInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FormFieldCreateManyFormInputSchema),z.lazy(() => FormFieldCreateManyFormInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutFormInputSchema: z.ZodType<Prisma.UserCreateWithoutFormInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.lazy(() => RoleSchema).optional(),
  subscription: z.lazy(() => SubscriptionCreateNestedOneWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutFormInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFormInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.lazy(() => RoleSchema).optional(),
  subscription: z.lazy(() => SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutFormInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFormInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFormInputSchema),z.lazy(() => UserUncheckedCreateWithoutFormInputSchema) ]),
}).strict();

export const FormResponseCreateWithoutFormInputSchema: z.ZodType<Prisma.FormResponseCreateWithoutFormInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  answer: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FormResponseUncheckedCreateWithoutFormInputSchema: z.ZodType<Prisma.FormResponseUncheckedCreateWithoutFormInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  answer: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FormResponseCreateOrConnectWithoutFormInputSchema: z.ZodType<Prisma.FormResponseCreateOrConnectWithoutFormInput> = z.object({
  where: z.lazy(() => FormResponseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FormResponseCreateWithoutFormInputSchema),z.lazy(() => FormResponseUncheckedCreateWithoutFormInputSchema) ]),
}).strict();

export const FormResponseCreateManyFormInputEnvelopeSchema: z.ZodType<Prisma.FormResponseCreateManyFormInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FormResponseCreateManyFormInputSchema),z.lazy(() => FormResponseCreateManyFormInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FormFieldUpsertWithWhereUniqueWithoutFormInputSchema: z.ZodType<Prisma.FormFieldUpsertWithWhereUniqueWithoutFormInput> = z.object({
  where: z.lazy(() => FormFieldWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FormFieldUpdateWithoutFormInputSchema),z.lazy(() => FormFieldUncheckedUpdateWithoutFormInputSchema) ]),
  create: z.union([ z.lazy(() => FormFieldCreateWithoutFormInputSchema),z.lazy(() => FormFieldUncheckedCreateWithoutFormInputSchema) ]),
}).strict();

export const FormFieldUpdateWithWhereUniqueWithoutFormInputSchema: z.ZodType<Prisma.FormFieldUpdateWithWhereUniqueWithoutFormInput> = z.object({
  where: z.lazy(() => FormFieldWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FormFieldUpdateWithoutFormInputSchema),z.lazy(() => FormFieldUncheckedUpdateWithoutFormInputSchema) ]),
}).strict();

export const FormFieldUpdateManyWithWhereWithoutFormInputSchema: z.ZodType<Prisma.FormFieldUpdateManyWithWhereWithoutFormInput> = z.object({
  where: z.lazy(() => FormFieldScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FormFieldUpdateManyMutationInputSchema),z.lazy(() => FormFieldUncheckedUpdateManyWithoutFormInputSchema) ]),
}).strict();

export const FormFieldScalarWhereInputSchema: z.ZodType<Prisma.FormFieldScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FormFieldScalarWhereInputSchema),z.lazy(() => FormFieldScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormFieldScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormFieldScalarWhereInputSchema),z.lazy(() => FormFieldScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  fieldType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  required: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  formId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserUpsertWithoutFormInputSchema: z.ZodType<Prisma.UserUpsertWithoutFormInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutFormInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFormInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFormInputSchema),z.lazy(() => UserUncheckedCreateWithoutFormInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutFormInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFormInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFormInputSchema),z.lazy(() => UserUncheckedUpdateWithoutFormInputSchema) ]),
}).strict();

export const UserUpdateWithoutFormInputSchema: z.ZodType<Prisma.UserUpdateWithoutFormInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  subscription: z.lazy(() => SubscriptionUpdateOneWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutFormInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFormInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  subscription: z.lazy(() => SubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const FormResponseUpsertWithWhereUniqueWithoutFormInputSchema: z.ZodType<Prisma.FormResponseUpsertWithWhereUniqueWithoutFormInput> = z.object({
  where: z.lazy(() => FormResponseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FormResponseUpdateWithoutFormInputSchema),z.lazy(() => FormResponseUncheckedUpdateWithoutFormInputSchema) ]),
  create: z.union([ z.lazy(() => FormResponseCreateWithoutFormInputSchema),z.lazy(() => FormResponseUncheckedCreateWithoutFormInputSchema) ]),
}).strict();

export const FormResponseUpdateWithWhereUniqueWithoutFormInputSchema: z.ZodType<Prisma.FormResponseUpdateWithWhereUniqueWithoutFormInput> = z.object({
  where: z.lazy(() => FormResponseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FormResponseUpdateWithoutFormInputSchema),z.lazy(() => FormResponseUncheckedUpdateWithoutFormInputSchema) ]),
}).strict();

export const FormResponseUpdateManyWithWhereWithoutFormInputSchema: z.ZodType<Prisma.FormResponseUpdateManyWithWhereWithoutFormInput> = z.object({
  where: z.lazy(() => FormResponseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FormResponseUpdateManyMutationInputSchema),z.lazy(() => FormResponseUncheckedUpdateManyWithoutFormInputSchema) ]),
}).strict();

export const FormResponseScalarWhereInputSchema: z.ZodType<Prisma.FormResponseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FormResponseScalarWhereInputSchema),z.lazy(() => FormResponseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FormResponseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FormResponseScalarWhereInputSchema),z.lazy(() => FormResponseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  formId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  answer: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FormCreateWithoutFieldsInputSchema: z.ZodType<Prisma.FormCreateWithoutFieldsInput> = z.object({
  id: z.string().cuid().optional(),
  uuid: z.string().uuid().optional(),
  name: z.string(),
  isPublished: z.boolean().optional(),
  isAnswered: z.boolean().optional(),
  isDraft: z.boolean().optional(),
  shareUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutFormInputSchema),
  FormResponses: z.lazy(() => FormResponseCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormUncheckedCreateWithoutFieldsInputSchema: z.ZodType<Prisma.FormUncheckedCreateWithoutFieldsInput> = z.object({
  id: z.string().cuid().optional(),
  uuid: z.string().uuid().optional(),
  name: z.string(),
  isPublished: z.boolean().optional(),
  isAnswered: z.boolean().optional(),
  isDraft: z.boolean().optional(),
  shareUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  FormResponses: z.lazy(() => FormResponseUncheckedCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormCreateOrConnectWithoutFieldsInputSchema: z.ZodType<Prisma.FormCreateOrConnectWithoutFieldsInput> = z.object({
  where: z.lazy(() => FormWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FormCreateWithoutFieldsInputSchema),z.lazy(() => FormUncheckedCreateWithoutFieldsInputSchema) ]),
}).strict();

export const FormUpsertWithoutFieldsInputSchema: z.ZodType<Prisma.FormUpsertWithoutFieldsInput> = z.object({
  update: z.union([ z.lazy(() => FormUpdateWithoutFieldsInputSchema),z.lazy(() => FormUncheckedUpdateWithoutFieldsInputSchema) ]),
  create: z.union([ z.lazy(() => FormCreateWithoutFieldsInputSchema),z.lazy(() => FormUncheckedCreateWithoutFieldsInputSchema) ]),
  where: z.lazy(() => FormWhereInputSchema).optional()
}).strict();

export const FormUpdateToOneWithWhereWithoutFieldsInputSchema: z.ZodType<Prisma.FormUpdateToOneWithWhereWithoutFieldsInput> = z.object({
  where: z.lazy(() => FormWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FormUpdateWithoutFieldsInputSchema),z.lazy(() => FormUncheckedUpdateWithoutFieldsInputSchema) ]),
}).strict();

export const FormUpdateWithoutFieldsInputSchema: z.ZodType<Prisma.FormUpdateWithoutFieldsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAnswered: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDraft: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  shareUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutFormNestedInputSchema).optional(),
  FormResponses: z.lazy(() => FormResponseUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const FormUncheckedUpdateWithoutFieldsInputSchema: z.ZodType<Prisma.FormUncheckedUpdateWithoutFieldsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAnswered: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDraft: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  shareUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  FormResponses: z.lazy(() => FormResponseUncheckedUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const FormCreateWithoutFormResponsesInputSchema: z.ZodType<Prisma.FormCreateWithoutFormResponsesInput> = z.object({
  id: z.string().cuid().optional(),
  uuid: z.string().uuid().optional(),
  name: z.string(),
  isPublished: z.boolean().optional(),
  isAnswered: z.boolean().optional(),
  isDraft: z.boolean().optional(),
  shareUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fields: z.lazy(() => FormFieldCreateNestedManyWithoutFormInputSchema).optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutFormInputSchema)
}).strict();

export const FormUncheckedCreateWithoutFormResponsesInputSchema: z.ZodType<Prisma.FormUncheckedCreateWithoutFormResponsesInput> = z.object({
  id: z.string().cuid().optional(),
  uuid: z.string().uuid().optional(),
  name: z.string(),
  isPublished: z.boolean().optional(),
  isAnswered: z.boolean().optional(),
  isDraft: z.boolean().optional(),
  shareUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  fields: z.lazy(() => FormFieldUncheckedCreateNestedManyWithoutFormInputSchema).optional()
}).strict();

export const FormCreateOrConnectWithoutFormResponsesInputSchema: z.ZodType<Prisma.FormCreateOrConnectWithoutFormResponsesInput> = z.object({
  where: z.lazy(() => FormWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FormCreateWithoutFormResponsesInputSchema),z.lazy(() => FormUncheckedCreateWithoutFormResponsesInputSchema) ]),
}).strict();

export const FormUpsertWithoutFormResponsesInputSchema: z.ZodType<Prisma.FormUpsertWithoutFormResponsesInput> = z.object({
  update: z.union([ z.lazy(() => FormUpdateWithoutFormResponsesInputSchema),z.lazy(() => FormUncheckedUpdateWithoutFormResponsesInputSchema) ]),
  create: z.union([ z.lazy(() => FormCreateWithoutFormResponsesInputSchema),z.lazy(() => FormUncheckedCreateWithoutFormResponsesInputSchema) ]),
  where: z.lazy(() => FormWhereInputSchema).optional()
}).strict();

export const FormUpdateToOneWithWhereWithoutFormResponsesInputSchema: z.ZodType<Prisma.FormUpdateToOneWithWhereWithoutFormResponsesInput> = z.object({
  where: z.lazy(() => FormWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FormUpdateWithoutFormResponsesInputSchema),z.lazy(() => FormUncheckedUpdateWithoutFormResponsesInputSchema) ]),
}).strict();

export const FormUpdateWithoutFormResponsesInputSchema: z.ZodType<Prisma.FormUpdateWithoutFormResponsesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAnswered: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDraft: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  shareUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fields: z.lazy(() => FormFieldUpdateManyWithoutFormNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutFormNestedInputSchema).optional()
}).strict();

export const FormUncheckedUpdateWithoutFormResponsesInputSchema: z.ZodType<Prisma.FormUncheckedUpdateWithoutFormResponsesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAnswered: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDraft: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  shareUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fields: z.lazy(() => FormFieldUncheckedUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserCreateWithoutSubscriptionInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.lazy(() => RoleSchema).optional(),
  Form: z.lazy(() => FormCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSubscriptionInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  password: z.string().optional().nullable(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.lazy(() => RoleSchema).optional(),
  Form: z.lazy(() => FormUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSubscriptionInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionInputSchema) ]),
}).strict();

export const UserUpsertWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserUpsertWithoutSubscriptionInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSubscriptionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSubscriptionInputSchema),z.lazy(() => UserUncheckedCreateWithoutSubscriptionInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSubscriptionInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSubscriptionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSubscriptionInputSchema) ]),
}).strict();

export const UserUpdateWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserUpdateWithoutSubscriptionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  Form: z.lazy(() => FormUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSubscriptionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  Form: z.lazy(() => FormUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const FormCreateManyUserInputSchema: z.ZodType<Prisma.FormCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  uuid: z.string().uuid().optional(),
  name: z.string(),
  isPublished: z.boolean().optional(),
  isAnswered: z.boolean().optional(),
  isDraft: z.boolean().optional(),
  shareUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const PasskeyCreateManyUserInputSchema: z.ZodType<Prisma.PasskeyCreateManyUserInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  publicKey: z.string(),
  credentialID: z.string(),
  counter: z.number().int(),
  deviceType: z.string(),
  backedUp: z.boolean(),
  transports: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const FormUpdateWithoutUserInputSchema: z.ZodType<Prisma.FormUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAnswered: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDraft: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  shareUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fields: z.lazy(() => FormFieldUpdateManyWithoutFormNestedInputSchema).optional(),
  FormResponses: z.lazy(() => FormResponseUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const FormUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FormUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAnswered: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDraft: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  shareUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fields: z.lazy(() => FormFieldUncheckedUpdateManyWithoutFormNestedInputSchema).optional(),
  FormResponses: z.lazy(() => FormResponseUncheckedUpdateManyWithoutFormNestedInputSchema).optional()
}).strict();

export const FormUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.FormUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPublished: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isAnswered: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isDraft: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  shareUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasskeyUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasskeyUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  publicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PasskeyUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasskeyUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  publicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PasskeyUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.PasskeyUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  publicKey: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  credentialID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  counter: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deviceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backedUp: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  transports: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FormFieldCreateManyFormInputSchema: z.ZodType<Prisma.FormFieldCreateManyFormInput> = z.object({
  id: z.number().int().optional(),
  label: z.string(),
  fieldType: z.string(),
  required: z.boolean().optional()
}).strict();

export const FormResponseCreateManyFormInputSchema: z.ZodType<Prisma.FormResponseCreateManyFormInput> = z.object({
  id: z.string().uuid().optional(),
  question: z.string(),
  answer: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FormFieldUpdateWithoutFormInputSchema: z.ZodType<Prisma.FormFieldUpdateWithoutFormInput> = z.object({
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fieldType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormFieldUncheckedUpdateWithoutFormInputSchema: z.ZodType<Prisma.FormFieldUncheckedUpdateWithoutFormInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fieldType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormFieldUncheckedUpdateManyWithoutFormInputSchema: z.ZodType<Prisma.FormFieldUncheckedUpdateManyWithoutFormInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  fieldType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormResponseUpdateWithoutFormInputSchema: z.ZodType<Prisma.FormResponseUpdateWithoutFormInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormResponseUncheckedUpdateWithoutFormInputSchema: z.ZodType<Prisma.FormResponseUncheckedUpdateWithoutFormInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FormResponseUncheckedUpdateManyWithoutFormInputSchema: z.ZodType<Prisma.FormResponseUncheckedUpdateManyWithoutFormInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answer: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const VerificationFindFirstArgsSchema: z.ZodType<Prisma.VerificationFindFirstArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindFirstOrThrowArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationFindManyArgsSchema: z.ZodType<Prisma.VerificationFindManyArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationAggregateArgsSchema: z.ZodType<Prisma.VerificationAggregateArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationGroupByArgsSchema: z.ZodType<Prisma.VerificationGroupByArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithAggregationInputSchema.array(),VerificationOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationScalarFieldEnumSchema.array(),
  having: VerificationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationFindUniqueArgsSchema: z.ZodType<Prisma.VerificationFindUniqueArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindUniqueOrThrowArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const PasskeyFindFirstArgsSchema: z.ZodType<Prisma.PasskeyFindFirstArgs> = z.object({
  select: PasskeySelectSchema.optional(),
  include: PasskeyIncludeSchema.optional(),
  where: PasskeyWhereInputSchema.optional(),
  orderBy: z.union([ PasskeyOrderByWithRelationInputSchema.array(),PasskeyOrderByWithRelationInputSchema ]).optional(),
  cursor: PasskeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasskeyScalarFieldEnumSchema,PasskeyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PasskeyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PasskeyFindFirstOrThrowArgs> = z.object({
  select: PasskeySelectSchema.optional(),
  include: PasskeyIncludeSchema.optional(),
  where: PasskeyWhereInputSchema.optional(),
  orderBy: z.union([ PasskeyOrderByWithRelationInputSchema.array(),PasskeyOrderByWithRelationInputSchema ]).optional(),
  cursor: PasskeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasskeyScalarFieldEnumSchema,PasskeyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PasskeyFindManyArgsSchema: z.ZodType<Prisma.PasskeyFindManyArgs> = z.object({
  select: PasskeySelectSchema.optional(),
  include: PasskeyIncludeSchema.optional(),
  where: PasskeyWhereInputSchema.optional(),
  orderBy: z.union([ PasskeyOrderByWithRelationInputSchema.array(),PasskeyOrderByWithRelationInputSchema ]).optional(),
  cursor: PasskeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasskeyScalarFieldEnumSchema,PasskeyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PasskeyAggregateArgsSchema: z.ZodType<Prisma.PasskeyAggregateArgs> = z.object({
  where: PasskeyWhereInputSchema.optional(),
  orderBy: z.union([ PasskeyOrderByWithRelationInputSchema.array(),PasskeyOrderByWithRelationInputSchema ]).optional(),
  cursor: PasskeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PasskeyGroupByArgsSchema: z.ZodType<Prisma.PasskeyGroupByArgs> = z.object({
  where: PasskeyWhereInputSchema.optional(),
  orderBy: z.union([ PasskeyOrderByWithAggregationInputSchema.array(),PasskeyOrderByWithAggregationInputSchema ]).optional(),
  by: PasskeyScalarFieldEnumSchema.array(),
  having: PasskeyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PasskeyFindUniqueArgsSchema: z.ZodType<Prisma.PasskeyFindUniqueArgs> = z.object({
  select: PasskeySelectSchema.optional(),
  include: PasskeyIncludeSchema.optional(),
  where: PasskeyWhereUniqueInputSchema,
}).strict() ;

export const PasskeyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PasskeyFindUniqueOrThrowArgs> = z.object({
  select: PasskeySelectSchema.optional(),
  include: PasskeyIncludeSchema.optional(),
  where: PasskeyWhereUniqueInputSchema,
}).strict() ;

export const FormFindFirstArgsSchema: z.ZodType<Prisma.FormFindFirstArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  where: FormWhereInputSchema.optional(),
  orderBy: z.union([ FormOrderByWithRelationInputSchema.array(),FormOrderByWithRelationInputSchema ]).optional(),
  cursor: FormWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormScalarFieldEnumSchema,FormScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FormFindFirstOrThrowArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  where: FormWhereInputSchema.optional(),
  orderBy: z.union([ FormOrderByWithRelationInputSchema.array(),FormOrderByWithRelationInputSchema ]).optional(),
  cursor: FormWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormScalarFieldEnumSchema,FormScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormFindManyArgsSchema: z.ZodType<Prisma.FormFindManyArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  where: FormWhereInputSchema.optional(),
  orderBy: z.union([ FormOrderByWithRelationInputSchema.array(),FormOrderByWithRelationInputSchema ]).optional(),
  cursor: FormWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormScalarFieldEnumSchema,FormScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormAggregateArgsSchema: z.ZodType<Prisma.FormAggregateArgs> = z.object({
  where: FormWhereInputSchema.optional(),
  orderBy: z.union([ FormOrderByWithRelationInputSchema.array(),FormOrderByWithRelationInputSchema ]).optional(),
  cursor: FormWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FormGroupByArgsSchema: z.ZodType<Prisma.FormGroupByArgs> = z.object({
  where: FormWhereInputSchema.optional(),
  orderBy: z.union([ FormOrderByWithAggregationInputSchema.array(),FormOrderByWithAggregationInputSchema ]).optional(),
  by: FormScalarFieldEnumSchema.array(),
  having: FormScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FormFindUniqueArgsSchema: z.ZodType<Prisma.FormFindUniqueArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  where: FormWhereUniqueInputSchema,
}).strict() ;

export const FormFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FormFindUniqueOrThrowArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  where: FormWhereUniqueInputSchema,
}).strict() ;

export const FormFieldFindFirstArgsSchema: z.ZodType<Prisma.FormFieldFindFirstArgs> = z.object({
  select: FormFieldSelectSchema.optional(),
  include: FormFieldIncludeSchema.optional(),
  where: FormFieldWhereInputSchema.optional(),
  orderBy: z.union([ FormFieldOrderByWithRelationInputSchema.array(),FormFieldOrderByWithRelationInputSchema ]).optional(),
  cursor: FormFieldWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormFieldScalarFieldEnumSchema,FormFieldScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormFieldFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FormFieldFindFirstOrThrowArgs> = z.object({
  select: FormFieldSelectSchema.optional(),
  include: FormFieldIncludeSchema.optional(),
  where: FormFieldWhereInputSchema.optional(),
  orderBy: z.union([ FormFieldOrderByWithRelationInputSchema.array(),FormFieldOrderByWithRelationInputSchema ]).optional(),
  cursor: FormFieldWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormFieldScalarFieldEnumSchema,FormFieldScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormFieldFindManyArgsSchema: z.ZodType<Prisma.FormFieldFindManyArgs> = z.object({
  select: FormFieldSelectSchema.optional(),
  include: FormFieldIncludeSchema.optional(),
  where: FormFieldWhereInputSchema.optional(),
  orderBy: z.union([ FormFieldOrderByWithRelationInputSchema.array(),FormFieldOrderByWithRelationInputSchema ]).optional(),
  cursor: FormFieldWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormFieldScalarFieldEnumSchema,FormFieldScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormFieldAggregateArgsSchema: z.ZodType<Prisma.FormFieldAggregateArgs> = z.object({
  where: FormFieldWhereInputSchema.optional(),
  orderBy: z.union([ FormFieldOrderByWithRelationInputSchema.array(),FormFieldOrderByWithRelationInputSchema ]).optional(),
  cursor: FormFieldWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FormFieldGroupByArgsSchema: z.ZodType<Prisma.FormFieldGroupByArgs> = z.object({
  where: FormFieldWhereInputSchema.optional(),
  orderBy: z.union([ FormFieldOrderByWithAggregationInputSchema.array(),FormFieldOrderByWithAggregationInputSchema ]).optional(),
  by: FormFieldScalarFieldEnumSchema.array(),
  having: FormFieldScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FormFieldFindUniqueArgsSchema: z.ZodType<Prisma.FormFieldFindUniqueArgs> = z.object({
  select: FormFieldSelectSchema.optional(),
  include: FormFieldIncludeSchema.optional(),
  where: FormFieldWhereUniqueInputSchema,
}).strict() ;

export const FormFieldFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FormFieldFindUniqueOrThrowArgs> = z.object({
  select: FormFieldSelectSchema.optional(),
  include: FormFieldIncludeSchema.optional(),
  where: FormFieldWhereUniqueInputSchema,
}).strict() ;

export const FormResponseFindFirstArgsSchema: z.ZodType<Prisma.FormResponseFindFirstArgs> = z.object({
  select: FormResponseSelectSchema.optional(),
  include: FormResponseIncludeSchema.optional(),
  where: FormResponseWhereInputSchema.optional(),
  orderBy: z.union([ FormResponseOrderByWithRelationInputSchema.array(),FormResponseOrderByWithRelationInputSchema ]).optional(),
  cursor: FormResponseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormResponseScalarFieldEnumSchema,FormResponseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormResponseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FormResponseFindFirstOrThrowArgs> = z.object({
  select: FormResponseSelectSchema.optional(),
  include: FormResponseIncludeSchema.optional(),
  where: FormResponseWhereInputSchema.optional(),
  orderBy: z.union([ FormResponseOrderByWithRelationInputSchema.array(),FormResponseOrderByWithRelationInputSchema ]).optional(),
  cursor: FormResponseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormResponseScalarFieldEnumSchema,FormResponseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormResponseFindManyArgsSchema: z.ZodType<Prisma.FormResponseFindManyArgs> = z.object({
  select: FormResponseSelectSchema.optional(),
  include: FormResponseIncludeSchema.optional(),
  where: FormResponseWhereInputSchema.optional(),
  orderBy: z.union([ FormResponseOrderByWithRelationInputSchema.array(),FormResponseOrderByWithRelationInputSchema ]).optional(),
  cursor: FormResponseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FormResponseScalarFieldEnumSchema,FormResponseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FormResponseAggregateArgsSchema: z.ZodType<Prisma.FormResponseAggregateArgs> = z.object({
  where: FormResponseWhereInputSchema.optional(),
  orderBy: z.union([ FormResponseOrderByWithRelationInputSchema.array(),FormResponseOrderByWithRelationInputSchema ]).optional(),
  cursor: FormResponseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FormResponseGroupByArgsSchema: z.ZodType<Prisma.FormResponseGroupByArgs> = z.object({
  where: FormResponseWhereInputSchema.optional(),
  orderBy: z.union([ FormResponseOrderByWithAggregationInputSchema.array(),FormResponseOrderByWithAggregationInputSchema ]).optional(),
  by: FormResponseScalarFieldEnumSchema.array(),
  having: FormResponseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FormResponseFindUniqueArgsSchema: z.ZodType<Prisma.FormResponseFindUniqueArgs> = z.object({
  select: FormResponseSelectSchema.optional(),
  include: FormResponseIncludeSchema.optional(),
  where: FormResponseWhereUniqueInputSchema,
}).strict() ;

export const FormResponseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FormResponseFindUniqueOrThrowArgs> = z.object({
  select: FormResponseSelectSchema.optional(),
  include: FormResponseIncludeSchema.optional(),
  where: FormResponseWhereUniqueInputSchema,
}).strict() ;

export const SubscriptionFindFirstArgsSchema: z.ZodType<Prisma.SubscriptionFindFirstArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithRelationInputSchema.array(),SubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubscriptionScalarFieldEnumSchema,SubscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SubscriptionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SubscriptionFindFirstOrThrowArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithRelationInputSchema.array(),SubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubscriptionScalarFieldEnumSchema,SubscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SubscriptionFindManyArgsSchema: z.ZodType<Prisma.SubscriptionFindManyArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithRelationInputSchema.array(),SubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SubscriptionScalarFieldEnumSchema,SubscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SubscriptionAggregateArgsSchema: z.ZodType<Prisma.SubscriptionAggregateArgs> = z.object({
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithRelationInputSchema.array(),SubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: SubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SubscriptionGroupByArgsSchema: z.ZodType<Prisma.SubscriptionGroupByArgs> = z.object({
  where: SubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ SubscriptionOrderByWithAggregationInputSchema.array(),SubscriptionOrderByWithAggregationInputSchema ]).optional(),
  by: SubscriptionScalarFieldEnumSchema.array(),
  having: SubscriptionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SubscriptionFindUniqueArgsSchema: z.ZodType<Prisma.SubscriptionFindUniqueArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
}).strict() ;

export const SubscriptionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SubscriptionFindUniqueOrThrowArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationCreateArgsSchema: z.ZodType<Prisma.VerificationCreateArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  data: z.union([ VerificationCreateInputSchema,VerificationUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationUpsertArgsSchema: z.ZodType<Prisma.VerificationUpsertArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
  create: z.union([ VerificationCreateInputSchema,VerificationUncheckedCreateInputSchema ]),
  update: z.union([ VerificationUpdateInputSchema,VerificationUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationCreateManyArgsSchema: z.ZodType<Prisma.VerificationCreateManyArgs> = z.object({
  data: z.union([ VerificationCreateManyInputSchema,VerificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationCreateManyInputSchema,VerificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationDeleteArgsSchema: z.ZodType<Prisma.VerificationDeleteArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationUpdateArgsSchema: z.ZodType<Prisma.VerificationUpdateArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  data: z.union([ VerificationUpdateInputSchema,VerificationUncheckedUpdateInputSchema ]),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationUpdateManyArgsSchema: z.ZodType<Prisma.VerificationUpdateManyArgs> = z.object({
  data: z.union([ VerificationUpdateManyMutationInputSchema,VerificationUncheckedUpdateManyInputSchema ]),
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationUpdateManyMutationInputSchema,VerificationUncheckedUpdateManyInputSchema ]),
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationDeleteManyArgsSchema: z.ZodType<Prisma.VerificationDeleteManyArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PasskeyCreateArgsSchema: z.ZodType<Prisma.PasskeyCreateArgs> = z.object({
  select: PasskeySelectSchema.optional(),
  include: PasskeyIncludeSchema.optional(),
  data: z.union([ PasskeyCreateInputSchema,PasskeyUncheckedCreateInputSchema ]),
}).strict() ;

export const PasskeyUpsertArgsSchema: z.ZodType<Prisma.PasskeyUpsertArgs> = z.object({
  select: PasskeySelectSchema.optional(),
  include: PasskeyIncludeSchema.optional(),
  where: PasskeyWhereUniqueInputSchema,
  create: z.union([ PasskeyCreateInputSchema,PasskeyUncheckedCreateInputSchema ]),
  update: z.union([ PasskeyUpdateInputSchema,PasskeyUncheckedUpdateInputSchema ]),
}).strict() ;

export const PasskeyCreateManyArgsSchema: z.ZodType<Prisma.PasskeyCreateManyArgs> = z.object({
  data: z.union([ PasskeyCreateManyInputSchema,PasskeyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PasskeyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PasskeyCreateManyAndReturnArgs> = z.object({
  data: z.union([ PasskeyCreateManyInputSchema,PasskeyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PasskeyDeleteArgsSchema: z.ZodType<Prisma.PasskeyDeleteArgs> = z.object({
  select: PasskeySelectSchema.optional(),
  include: PasskeyIncludeSchema.optional(),
  where: PasskeyWhereUniqueInputSchema,
}).strict() ;

export const PasskeyUpdateArgsSchema: z.ZodType<Prisma.PasskeyUpdateArgs> = z.object({
  select: PasskeySelectSchema.optional(),
  include: PasskeyIncludeSchema.optional(),
  data: z.union([ PasskeyUpdateInputSchema,PasskeyUncheckedUpdateInputSchema ]),
  where: PasskeyWhereUniqueInputSchema,
}).strict() ;

export const PasskeyUpdateManyArgsSchema: z.ZodType<Prisma.PasskeyUpdateManyArgs> = z.object({
  data: z.union([ PasskeyUpdateManyMutationInputSchema,PasskeyUncheckedUpdateManyInputSchema ]),
  where: PasskeyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PasskeyUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PasskeyUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PasskeyUpdateManyMutationInputSchema,PasskeyUncheckedUpdateManyInputSchema ]),
  where: PasskeyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PasskeyDeleteManyArgsSchema: z.ZodType<Prisma.PasskeyDeleteManyArgs> = z.object({
  where: PasskeyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FormCreateArgsSchema: z.ZodType<Prisma.FormCreateArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  data: z.union([ FormCreateInputSchema,FormUncheckedCreateInputSchema ]),
}).strict() ;

export const FormUpsertArgsSchema: z.ZodType<Prisma.FormUpsertArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  where: FormWhereUniqueInputSchema,
  create: z.union([ FormCreateInputSchema,FormUncheckedCreateInputSchema ]),
  update: z.union([ FormUpdateInputSchema,FormUncheckedUpdateInputSchema ]),
}).strict() ;

export const FormCreateManyArgsSchema: z.ZodType<Prisma.FormCreateManyArgs> = z.object({
  data: z.union([ FormCreateManyInputSchema,FormCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FormCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FormCreateManyAndReturnArgs> = z.object({
  data: z.union([ FormCreateManyInputSchema,FormCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FormDeleteArgsSchema: z.ZodType<Prisma.FormDeleteArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  where: FormWhereUniqueInputSchema,
}).strict() ;

export const FormUpdateArgsSchema: z.ZodType<Prisma.FormUpdateArgs> = z.object({
  select: FormSelectSchema.optional(),
  include: FormIncludeSchema.optional(),
  data: z.union([ FormUpdateInputSchema,FormUncheckedUpdateInputSchema ]),
  where: FormWhereUniqueInputSchema,
}).strict() ;

export const FormUpdateManyArgsSchema: z.ZodType<Prisma.FormUpdateManyArgs> = z.object({
  data: z.union([ FormUpdateManyMutationInputSchema,FormUncheckedUpdateManyInputSchema ]),
  where: FormWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FormUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FormUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FormUpdateManyMutationInputSchema,FormUncheckedUpdateManyInputSchema ]),
  where: FormWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FormDeleteManyArgsSchema: z.ZodType<Prisma.FormDeleteManyArgs> = z.object({
  where: FormWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FormFieldCreateArgsSchema: z.ZodType<Prisma.FormFieldCreateArgs> = z.object({
  select: FormFieldSelectSchema.optional(),
  include: FormFieldIncludeSchema.optional(),
  data: z.union([ FormFieldCreateInputSchema,FormFieldUncheckedCreateInputSchema ]),
}).strict() ;

export const FormFieldUpsertArgsSchema: z.ZodType<Prisma.FormFieldUpsertArgs> = z.object({
  select: FormFieldSelectSchema.optional(),
  include: FormFieldIncludeSchema.optional(),
  where: FormFieldWhereUniqueInputSchema,
  create: z.union([ FormFieldCreateInputSchema,FormFieldUncheckedCreateInputSchema ]),
  update: z.union([ FormFieldUpdateInputSchema,FormFieldUncheckedUpdateInputSchema ]),
}).strict() ;

export const FormFieldCreateManyArgsSchema: z.ZodType<Prisma.FormFieldCreateManyArgs> = z.object({
  data: z.union([ FormFieldCreateManyInputSchema,FormFieldCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FormFieldCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FormFieldCreateManyAndReturnArgs> = z.object({
  data: z.union([ FormFieldCreateManyInputSchema,FormFieldCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FormFieldDeleteArgsSchema: z.ZodType<Prisma.FormFieldDeleteArgs> = z.object({
  select: FormFieldSelectSchema.optional(),
  include: FormFieldIncludeSchema.optional(),
  where: FormFieldWhereUniqueInputSchema,
}).strict() ;

export const FormFieldUpdateArgsSchema: z.ZodType<Prisma.FormFieldUpdateArgs> = z.object({
  select: FormFieldSelectSchema.optional(),
  include: FormFieldIncludeSchema.optional(),
  data: z.union([ FormFieldUpdateInputSchema,FormFieldUncheckedUpdateInputSchema ]),
  where: FormFieldWhereUniqueInputSchema,
}).strict() ;

export const FormFieldUpdateManyArgsSchema: z.ZodType<Prisma.FormFieldUpdateManyArgs> = z.object({
  data: z.union([ FormFieldUpdateManyMutationInputSchema,FormFieldUncheckedUpdateManyInputSchema ]),
  where: FormFieldWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FormFieldUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FormFieldUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FormFieldUpdateManyMutationInputSchema,FormFieldUncheckedUpdateManyInputSchema ]),
  where: FormFieldWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FormFieldDeleteManyArgsSchema: z.ZodType<Prisma.FormFieldDeleteManyArgs> = z.object({
  where: FormFieldWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FormResponseCreateArgsSchema: z.ZodType<Prisma.FormResponseCreateArgs> = z.object({
  select: FormResponseSelectSchema.optional(),
  include: FormResponseIncludeSchema.optional(),
  data: z.union([ FormResponseCreateInputSchema,FormResponseUncheckedCreateInputSchema ]),
}).strict() ;

export const FormResponseUpsertArgsSchema: z.ZodType<Prisma.FormResponseUpsertArgs> = z.object({
  select: FormResponseSelectSchema.optional(),
  include: FormResponseIncludeSchema.optional(),
  where: FormResponseWhereUniqueInputSchema,
  create: z.union([ FormResponseCreateInputSchema,FormResponseUncheckedCreateInputSchema ]),
  update: z.union([ FormResponseUpdateInputSchema,FormResponseUncheckedUpdateInputSchema ]),
}).strict() ;

export const FormResponseCreateManyArgsSchema: z.ZodType<Prisma.FormResponseCreateManyArgs> = z.object({
  data: z.union([ FormResponseCreateManyInputSchema,FormResponseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FormResponseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FormResponseCreateManyAndReturnArgs> = z.object({
  data: z.union([ FormResponseCreateManyInputSchema,FormResponseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FormResponseDeleteArgsSchema: z.ZodType<Prisma.FormResponseDeleteArgs> = z.object({
  select: FormResponseSelectSchema.optional(),
  include: FormResponseIncludeSchema.optional(),
  where: FormResponseWhereUniqueInputSchema,
}).strict() ;

export const FormResponseUpdateArgsSchema: z.ZodType<Prisma.FormResponseUpdateArgs> = z.object({
  select: FormResponseSelectSchema.optional(),
  include: FormResponseIncludeSchema.optional(),
  data: z.union([ FormResponseUpdateInputSchema,FormResponseUncheckedUpdateInputSchema ]),
  where: FormResponseWhereUniqueInputSchema,
}).strict() ;

export const FormResponseUpdateManyArgsSchema: z.ZodType<Prisma.FormResponseUpdateManyArgs> = z.object({
  data: z.union([ FormResponseUpdateManyMutationInputSchema,FormResponseUncheckedUpdateManyInputSchema ]),
  where: FormResponseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FormResponseUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FormResponseUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FormResponseUpdateManyMutationInputSchema,FormResponseUncheckedUpdateManyInputSchema ]),
  where: FormResponseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FormResponseDeleteManyArgsSchema: z.ZodType<Prisma.FormResponseDeleteManyArgs> = z.object({
  where: FormResponseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SubscriptionCreateArgsSchema: z.ZodType<Prisma.SubscriptionCreateArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  data: z.union([ SubscriptionCreateInputSchema,SubscriptionUncheckedCreateInputSchema ]),
}).strict() ;

export const SubscriptionUpsertArgsSchema: z.ZodType<Prisma.SubscriptionUpsertArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
  create: z.union([ SubscriptionCreateInputSchema,SubscriptionUncheckedCreateInputSchema ]),
  update: z.union([ SubscriptionUpdateInputSchema,SubscriptionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SubscriptionCreateManyArgsSchema: z.ZodType<Prisma.SubscriptionCreateManyArgs> = z.object({
  data: z.union([ SubscriptionCreateManyInputSchema,SubscriptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SubscriptionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SubscriptionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SubscriptionCreateManyInputSchema,SubscriptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SubscriptionDeleteArgsSchema: z.ZodType<Prisma.SubscriptionDeleteArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  where: SubscriptionWhereUniqueInputSchema,
}).strict() ;

export const SubscriptionUpdateArgsSchema: z.ZodType<Prisma.SubscriptionUpdateArgs> = z.object({
  select: SubscriptionSelectSchema.optional(),
  include: SubscriptionIncludeSchema.optional(),
  data: z.union([ SubscriptionUpdateInputSchema,SubscriptionUncheckedUpdateInputSchema ]),
  where: SubscriptionWhereUniqueInputSchema,
}).strict() ;

export const SubscriptionUpdateManyArgsSchema: z.ZodType<Prisma.SubscriptionUpdateManyArgs> = z.object({
  data: z.union([ SubscriptionUpdateManyMutationInputSchema,SubscriptionUncheckedUpdateManyInputSchema ]),
  where: SubscriptionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SubscriptionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SubscriptionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SubscriptionUpdateManyMutationInputSchema,SubscriptionUncheckedUpdateManyInputSchema ]),
  where: SubscriptionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SubscriptionDeleteManyArgsSchema: z.ZodType<Prisma.SubscriptionDeleteManyArgs> = z.object({
  where: SubscriptionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;