import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

import { redirect } from "next/navigation";
import ProfileView from "@/components/profile/ProfileView";

/* 🔹 User type (must match ProfileView) */
interface User {
  name: string;
  email: string;
  image?: string;
  phone?: string;
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  // 🔒 Not logged in → login page
  if (!session?.user?.email) {
    redirect("/login");
  }

  const client = await clientPromise;
  const db = client.db("carenestDB");

  const user = await db
    .collection<User>("users")
    .findOne({ email: session.user.email });

  // ❗ VERY IMPORTANT: null handle
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">
          User profile not found
        </p>
      </div>
    );
  }

  // ✅ Now TypeScript is happy
  return <ProfileView user={user} />;
}
