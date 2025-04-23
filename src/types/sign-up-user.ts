import { z } from 'zod';

import { signUpUserSchema } from '@/schemas/sign-up-user';

export type SignUpUser = z.infer<typeof signUpUserSchema>;
