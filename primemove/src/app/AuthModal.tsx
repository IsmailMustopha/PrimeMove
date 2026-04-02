"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CircleDashed, Lock, Mail, User } from "lucide-react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

type propType = {
  open: boolean;
  onClose: () => void;
};

type stepType = "login" | "signup" | "otp";

function AuthModal({ open, onClose }: propType) {
  const [step, setStep] = useState<stepType>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const session = useSession()
  console.log(session);
  

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      console.log(data);
      setStep("otp")
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      setErr(error.response.data.message ?? "something went wrong");
      console.log(error);
    }
  };
  
  const handleVerifyEmail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/verify-email", {
        email,
        otp: otp.join(""),
      });
      console.log(data);
      setStep("login");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setErr(error.response.data.message ?? "something went wrong");
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    console.log(res);
  };

  const handleGoogleLogin = async () => {
    await signIn("google")
  };

  const handleChangeOtp = (index: number, value: string) => {
    // Regex to allow only numbers (0-9)
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    // Move focus to the next input if a value is entered
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    // Move focus to the previous input if the value is deleted
    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  return (
    <>
      {open && (
        <>
          {/* Overlay / Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          >
            <div className="relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-black">
              {/* Close Button */}
              <div
                className="absolute right-4 top-4 text-gray-500 hover:text-black transition cursor-pointer"
                onClick={onClose}
              >
                X
              </div>

              {/* Header Content */}
              <div className="mb-6 text-center">
                <h1 className="text-3xl font-extrabold tracking-widest">
                  RYDEX
                </h1>
                <p className="mt-1 text-xs text-gray-500">
                  Premium Vehicle Booking
                </p>
              </div>

              {/* Social Login Button */}
              <button
                onClick={handleGoogleLogin}
                className="w-full h-11 rounded-xl border border-black/20 flex items-center justify-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition"
              >
                <Image src="/google.png" alt="google" width={20} height={20} />
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-black/10" />
                <div className="text-xs text-gray-500">OR</div>
                <div className="flex-1 h-px bg-black/10" />
              </div>

              <div>
                {step === "login" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h1 className="text-xl font-semibold">Welcome back</h1>
                    <div className="mt-5 space-y-4">
                      <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                        <Mail size={18} className="text-gray-500" />
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          type="text"
                          placeholder="email"
                          className="w-full bg-transparent outline-none text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                        <Lock size={18} className="text-gray-500" />
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          type="password"
                          placeholder="***********"
                          className="w-full bg-transparent outline-none text-sm"
                        />
                      </div>

                      <div>
                        <button
                          className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex justify-center items-center"
                          disabled={loading}
                          onClick={handleLogin}
                        >
                          {!loading ? (
                            "Login"
                          ) : (
                            <CircleDashed
                              size={18}
                              color="white"
                              className="animate-spin"
                            />
                          )}
                        </button>
                      </div>

                      <p className="mt-6 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{" "}
                        <div
                          onClick={() => setStep("signup")}
                          className="inline-block text-black font-medium hover:underline cursor-pointer"
                        >
                          Sign Up
                        </div>
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h1 className="text-xl font-semibold">Create Account</h1>
                    <div className="mt-5 space-y-4">
                      <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                        <User size={18} className="text-gray-500" />
                        <input
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          type="text"
                          placeholder="Full Name"
                          className="w-full bg-transparent outline-none text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                        <Mail size={18} className="text-gray-500" />
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          type="text"
                          placeholder="Email"
                          className="w-full bg-transparent outline-none text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                        <Lock size={18} className="text-gray-500" />
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          type="password"
                          placeholder="***********"
                          className="w-full bg-transparent outline-none text-sm"
                        />
                      </div>

                      {err && <p className="text-red-500">*{err}</p>}

                      <div>
                        <button
                          className="w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition flex justify-center items-center"
                          disabled={loading}
                          onClick={handleSignUp}
                        >
                          {!loading ? (
                            "Sign Up"
                          ) : (
                            <CircleDashed
                              size={18}
                              color="white"
                              className="animate-spin"
                            />
                          )}
                        </button>
                      </div>

                      <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <div
                          onClick={() => setStep("login")}
                          className="inline-block text-black font-medium hover:underline cursor-pointer"
                        >
                          Login
                        </div>
                      </p>
                    </div>
                  </motion.div>
                )}

                {step == "otp" && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-xl font-semibold">Verify Email</h2>

                    <div className="mt-6 flex justify-between gap-2">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          value={digit}
                          maxLength={1}
                          className="w-10 h-12 sm:w-12 text-center text-lg font-semibold rounded-xl bg-white border border-black/20 outline-none"
                          onChange={(e) => handleChangeOtp(i, e.target.value)}
                        />
                      ))}
                    </div>

                    {err && <p className="text-red-500">*{err}</p>}

                    <button
                      onClick={handleVerifyEmail}
                      className="mt-6 w-full h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition"
                      disabled={loading}
                    >
                      {!loading ? (
                        "Verify and Create Account"
                      ) : (
                        <CircleDashed
                          size={18}
                          color="white"
                          className="animate-spin"
                        />
                      )}
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}

export default AuthModal;
