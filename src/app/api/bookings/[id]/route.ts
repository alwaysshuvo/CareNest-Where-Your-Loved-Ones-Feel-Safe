import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // ✅ MUST unwrap params
  const { id } = await context.params;

  console.log("🔥 DELETE ROUTE HIT");
  console.log("🔥 PARAM ID:", id);

  const client = await clientPromise;
  const db = client.db("carenestDB");

  const result = await db.collection("bookings").deleteOne({
    _id: new ObjectId(id),
  });

  console.log("🔥 DELETE RESULT:", result);

  return NextResponse.json({
    success: true,
    deletedCount: result.deletedCount,
  });
}
