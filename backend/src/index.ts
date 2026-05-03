import { Elysia } from "elysia";
import { db } from "./db";
import { users, posts } from "./db/schema";
import { eq, desc } from "drizzle-orm";

const app = new Elysia();

// Health Check Endpoint
app.get("/", () => ({
  status: "ok",
  message: "Welcome to Belajar Vibe API",
  version: "0.1.0",
}));

// Health Check Endpoint
app.get("/health", () => ({
  status: "healthy",
  timestamp: new Date().toISOString(),
}));

// GET all users
app.get("/users", async () => {
  try {
    const allUsers = await db.select().from(users);
    return {
      success: true,
      data: allUsers,
      count: allUsers.length,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch users",
    };
  }
});

// GET user by ID
app.get("/users/:id", async ({ params }) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(params.id)))
      .limit(1);

    if (user.length === 0) {
      return {
        success: false,
        error: "User not found",
      };
    }

    return {
      success: true,
      data: user[0],
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch user",
    };
  }
});

// POST create user
app.post(
  "/users",
  async ({ body }: { body: { name: string; email: string } }) => {
    try {
      const result = await db.insert(users).values({
        name: body.name,
        email: body.email,
      });

      return {
        success: true,
        message: "User created successfully",
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to create user",
      };
    }
  },
  {
    body: {
      name: "string",
      email: "string",
    },
  }
);

// GET all posts
app.get("/posts", async () => {
  try {
    const allPosts = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt));
    return {
      success: true,
      data: allPosts,
      count: allPosts.length,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch posts",
    };
  }
});

// POST create post
app.post(
  "/posts",
  async ({
    body,
  }: {
    body: { userId: number; title: string; content?: string };
  }) => {
    try {
      const result = await db.insert(posts).values({
        userId: body.userId,
        title: body.title,
        content: body.content || null,
      });

      return {
        success: true,
        message: "Post created successfully",
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to create post",
      };
    }
  }
);

const port = parseInt(process.env.PORT || "3000");

app.listen(port, () => {
  console.log(`🚀 Belajar Vibe API is running on http://localhost:${port}`);
  console.log(`📝 Health check: http://localhost:${port}/health`);
});
