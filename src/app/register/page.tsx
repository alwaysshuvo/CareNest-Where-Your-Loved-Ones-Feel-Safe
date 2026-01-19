"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { User, Eye, EyeOff, ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

/* Animations */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function RegisterPage() {
  const { status } = useSession();
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  /* Redirect logged-in users */
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/my-bookings");
    }
  }, [status, router]);

  /* Upload image to IMGBB */
  const uploadImage = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      if (!data.success) throw new Error();

      return data.data.display_url;
    } catch {
      toast.error("Image upload failed");
      return null;
    }
  };

  /* Register Handler (BUILD SAFE) */
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const nid = formData.get("nid") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!nid || !name || !email || !phone || !password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters with uppercase & lowercase letters"
      );
      setLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadImage();

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nid,
          name,
          email,
          phone,
          password,
          image: imageUrl,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Account created successfully");
      router.push("/login");
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return null;

  return (
    <>
      <Toaster position="top-right" />

      <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          {/* LEFT */}
          <div className="relative hidden md:block">
            <Image
              src="/assets/register.png"
              alt="CareNest"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-purple-900/40" />
            <div className="absolute bottom-8 left-8 text-white max-w-sm">
              <h2 className="text-3xl font-bold mb-2">
                Join CareNest Today
              </h2>
              <p className="text-sm text-purple-100">
                Trusted care services for your loved ones.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center p-8 sm:p-10"
          >
            <motion.form
              variants={item}
              onSubmit={handleRegister}
              className="space-y-4"
            >
              {/* Profile Image */}
              <div className="flex justify-center">
                <label className="relative cursor-pointer">
                  <div className="h-28 w-28 rounded-full border-2 border-dashed border-purple-300 flex items-center justify-center overflow-hidden bg-purple-50">
                    {imageFile ? (
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-10 w-10 text-purple-400" />
                    )}
                  </div>
                  <div className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                    <ImagePlus size={16} />
                  </div>
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      setImageFile(e.target.files?.[0] || null)
                    }
                  />
                </label>
              </div>

              <input name="nid" placeholder="NID Number" className="input" />
              <input name="name" placeholder="Full Name" className="input" />
              <input name="email" type="email" placeholder="Email" className="input" />
              <input name="phone" placeholder="Contact Number" className="input" />

              <div className="relative">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  className="input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button
                disabled={loading}
                className="w-full rounded-lg bg-purple-600 py-3 text-white font-medium hover:bg-purple-700 disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </motion.form>

            <p className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 font-medium">
                Login here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
