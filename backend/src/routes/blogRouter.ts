import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {
  createBlogInput,
	updateBlogInput,
} from "@bmprajwal/medium-common";
import { getFormattedDate } from "../utils";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
		JWT_SECRET: string;
	},
  Variables :{
    userId: string
  }
}>();

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      id:true,
      publishedDate: true,
      author: {
        select: {
          name:true
        }
      }
    },
  });
  return c.json({
    blogs,
  });
});


blogRouter.use("/*", async (c, next) => {
	const authHeader = c.req.header("authorization") || "";
	const token = authHeader.split(" ")[1];

	const user = await verify(token, c.env.JWT_SECRET);

	if (!user.id) {
		c.status(401);
		return c.json({
			message: "Unauthorized",
		});
	}
	c.set("userId", user.id);
  await next()
});

blogRouter.post("/", async (c) => {
	const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body)
  if(!success){
    c.status(411)
    return c.json({
      message: "Invalid inputs"
    })
  }
  const authorId = c.get("userId")
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const blog = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: authorId,
      publishedDate: getFormattedDate()
		},
	});
	return c.json({
		id: blog.id,
	});
});

blogRouter.put("/", async (c) => {
	const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
		c.status(411);
		return c.json({
			message: "Invalid inputs",
		});
  }
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const blog = await prisma.post.update({
		where: {
			id: body.id,
		},
		data: {
			title: body.title,
			content: body.content,
      publishedDate: getFormattedDate()
		},
	});
	return c.json({
		id: blog.id,
	});
});


blogRouter.get("/:id", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const blog = await prisma.post.findFirst({
			where: {
				id: c.req.param("id"),
			},
			select: {
				title: true,
				content: true,
				id: true,
        publishedDate: true,
				author: {
					select: {
						name: true,
            email:true
					},
				},
			},
		});
		return c.json({
			blog,
		});
	} catch (error) {
		c.status(404);
		return c.json({
			message: "Blog not found",
		});
	}
});

blogRouter.delete("/:id", async (c) => {
	const blogId = c.req.param("id")
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const response = await prisma.post.delete({
			where: {
				id: blogId,
			},
			select: {
				id: true,
			},
		});

		return c.json({
			message: `Blog with id: ${response.id} deleted!`,
		});
	} catch (error) {
		console.log(error);
		
	}
	
})