import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nid, name, email, phone, password, image } = body;

    if (!nid || !name || !email || !phone || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("carenestDB");

    // 🔎 Check existing user
    const existingUser = await db
      .collection("users")
      .findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      nid,
      name,
      email,
      phone,
      password: hashedPassword,
      image: image || null,
      role: "user",
      provider: "credentials",
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(user);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
