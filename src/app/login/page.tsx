"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Lock, Github, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

/* Animation Variants */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  /* EMAIL LOGIN */
  const handleEmailLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (res?.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Login successful");
      router.push(callbackUrl);
    }
  };

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
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative hidden md:flex flex-col justify-end overflow-hidden bg-purple-700 p-10 text-white"
          >
            <Image
              src="/assets/login-img.png"
              alt="CareNest Trusted Care"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-purple-700/30 to-purple-600/20" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                Trusted Care <br /> Starts Here
              </h2>
              <p className="text-purple-100 text-sm max-w-sm">
                Securely manage care services for your loved ones with CareNest.
              </p>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center p-8 sm:p-10"
          >
            <motion.div variants={item} className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Login to continue with CareNest
              </p>
            </motion.div>

            {/* EMAIL LOGIN */}
            <motion.div variants={item} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-lg border px-10 py-3 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  className="w-full rounded-lg border px-10 py-3 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-purple-600"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                onClick={handleEmailLogin}
                className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 py-3 text-white font-medium shadow-md hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </motion.button>
            </motion.div>

            {/* REGISTER LINK */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-purple-600 hover:underline"
              >
                Create Account
              </Link>
            </p>

            {/* DIVIDER */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* SOCIAL LOGIN */}
            <motion.div variants={item} className="space-y-3">
              <button
                onClick={() => signIn("google", { callbackUrl })}
                className="flex w-full items-center justify-center gap-3 rounded-lg border py-3 text-sm font-medium hover:bg-gray-50"
              >
                <Image
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  width={18}
                  height={18}
                />
                Continue with Google
              </button>

              <button
                onClick={() => signIn("github", { callbackUrl })}
                className="flex w-full items-center justify-center gap-3 rounded-lg border py-3 text-sm font-medium hover:bg-gray-50"
              >
                <Github className="h-5 w-5" />
                Continue with GitHub
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
