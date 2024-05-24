import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import {
	signinInput,
	signupInput,
} from "@bmprajwal/medium-common";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

userRouter.post("/signup", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = signupInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: "Inputs are incorrect",
		});
	}

	try {
		const user = await prisma.user.create({
			data: {
        name: body.name,
				email: body.email,
				password: body.password,
			},
		});

		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({
			message: "Sign up successful!",
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		c.status(403);
		return c.json({ error: "There was an error while signing up!" });
	}
});

userRouter.post("/signin", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: "Inputs are incorrect",
		});
	}
	const user = await prisma.user.findFirst({
		where: {
			email: body.email,
			password: body.password,
		},
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const token = await sign({ id: user.id }, c.env.JWT_SECRET);

	return c.json({
		message: "Sign in successful!",
		token,
		user: {
			id: user.id,
			name: user.name,
			email: user.email
		}
	});
});
