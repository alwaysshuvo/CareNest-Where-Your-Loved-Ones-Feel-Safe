import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import ProfileView from "@/components/profile/ProfileView";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) redirect("/login");

  const client = await clientPromise;
  const db = client.db("carenestDB");

  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });

  return <ProfileView user={user} />;
}
