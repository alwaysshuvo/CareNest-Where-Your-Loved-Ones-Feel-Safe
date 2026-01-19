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
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const { status, cancelReason } = body;

  const client = await clientPromise;
  const db = client.db("carenestDB");

  const result = await db.collection("bookings").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status: status || "cancelled",
        cancelReason,
        cancelledAt: new Date(),
      },
    }
  );

  return NextResponse.json({
    success: true,
    message: "Booking cancelled successfully",
  });
}
