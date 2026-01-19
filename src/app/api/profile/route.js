import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const client = await clientPromise;
  const db = client.db("carenestDB");

  await db.collection("users").updateOne(
    { email: session.user.email },
    {
      $set: {
        name: body.name,
        phone: body.phone,
        image: body.image,
      },
    }
  );

  return NextResponse.json({ success: true });
}
