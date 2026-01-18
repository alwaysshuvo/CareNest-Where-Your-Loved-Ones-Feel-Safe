import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("carenestDB");

    const bookings = await db
      .collection("bookings")
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("GET bookings error:", error);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("carenestDB");

    const booking = {
      userEmail: session.user?.email,
      userName: session.user?.name,

      serviceId: body.serviceId,
      serviceTitle: body.serviceTitle,
      serviceImage: body.serviceImage, 
      
      price: body.price,

      phone: body.phone,
      address: body.address,
      date: body.date,
      notes: body.notes,

      status: "pending",
      createdAt: new Date(),
    };

    await db.collection("bookings").insertOne(booking);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST booking error:", error);
    return NextResponse.json({ message: "Booking failed" }, { status: 500 });
  }
}
