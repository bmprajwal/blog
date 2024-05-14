import z, { string } from "zod"

export const signupInput = z.object({
  email: string().email(),
  password: string().min(6),
  name: string().optional()

})

export const signinInput = z.object({
  email: string().email(),
	password: string().min(6),
});

export const createBlogInput = z.object({
  title: string(),
  content: string()
})

export const updateBlogInput = z.object({
  title: string(),
  content: string(),
  id: string()
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>