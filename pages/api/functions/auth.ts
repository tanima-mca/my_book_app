// import type { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// interface AuthRequestBody {
//   action: "register" | "login";
//   name?: string;
//   email: string;
//   password: string;
// }
// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   const { action, name, email, password } = req.body as AuthRequestBody;
//   console.log('Received data:', { action, name, email, password });

//   if (!email || !password || (action === "register" && !name)) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     if (action === "register") {
//       console.log('Checking if user already exists with email:', email);
//       const existingUser = await prisma.user.findUnique({ where: { email } });

//       if (existingUser) {
//         console.log('User already exists:', existingUser);
//         return res.status(400).json({ error: "User already exists" });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const newUser = await prisma.user.create({
//         data: {
//           name: name!,
//           email,
//           password: hashedPassword,
//         },
//       });

//       console.log('User created:', newUser);
//       return res.status(201).json({ message: "User registered successfully", user: newUser });
//     }

//     if (action === "login") {
//       const user = await prisma.user.findUnique({ where: { email } });

//       if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(401).json({ error: "Invalid credentials" });
//       }

//       return res.status(200).json({ message: "Login successful", user });
//     }

//     return res.status(400).json({ error: "Invalid action. Use 'register' or 'login'" });

//   } catch (error) {
//     console.error("Server error:", error);
//     return res.status(500).json({ error: "Server error" });
//   }
// }




import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { serialize } from "cookie";
import { signToken } from "@/lib/generated/prisma/jwt";


interface AuthRequestBody {
  action: "register" | "login";
  name?: string;
  email: string;
  password: string;
}

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { action, name, email, password } = req.body as AuthRequestBody;

  if (!email || !password || (action === "register" && !name)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    if (action === "register") {
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: { name: name!, email, password: hashedPassword },
      });

      return res.status(201).json({ message: "User registered successfully", user: newUser });
    }

    if (action === "login") {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = signToken({ id: user.id, email: user.email });

      res.setHeader("Set-Cookie", serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 3600,
      }));

      return res.status(200).json({ message: "Login successful", user });
    }

    return res.status(400).json({ error: "Invalid action. Use 'register' or 'login'" });

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
