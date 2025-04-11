import { z } from 'zod';

import { signInUserSchema } from '@/schemas/sign-in-user';

export type SignInUser = z.infer<typeof signInUserSchema>;
