"use client";

import { useState } from "react";
import ProfileForm from "./ProfileForm";
import Image from "next/image";

export default function ProfileView({ user }) {
  const [edit, setEdit] = useState(false);

  if (edit) {
    return <ProfileForm user={user} onCancel={() => setEdit(false)} />;
  }

  return (
    <section className="max-w-xl mx-auto py-20">
      <h1 className="text-3xl font-bold mb-2">My Profile</h1>
      <p className="text-gray-500 mb-8">
        View your personal information
      </p>

      <div className="bg-white rounded-xl shadow p-6 text-center">
        <Image
          src={user.image || "/assets/avatar.png"}
          alt="Profile"
          width={120}
          height={120}
          className="mx-auto rounded-full object-cover"
        />

        <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
        <p className="text-gray-600 mt-1">
          📞 {user.phone || "Not added"}
        </p>

        <p className="mt-6 text-sm text-gray-500">
          Want to change something?
        </p>

        <button
          onClick={() => setEdit(true)}
          className="mt-3 rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-700"
        >
          Edit Profile
        </button>
      </div>
    </section>
  );
}
