"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function ProfileForm({ user, onCancel }) {
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [image, setImage] = useState(user.image || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, image }),
      });

      if (!res.ok) throw new Error();

      Swal.fire("Updated", "Profile updated successfully", "success");
      window.location.reload();
    } catch {
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto py-20">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <form
        onSubmit={handleUpdate}
        className="bg-white rounded-xl shadow p-6 space-y-4"
      >
        <div>
          <label className="text-sm font-medium">Profile Image URL</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            value={user.email}
            disabled
            className="input bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
