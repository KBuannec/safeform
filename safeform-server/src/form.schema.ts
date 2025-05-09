import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide'),
});

export type FormData = z.infer<typeof formSchema>;
