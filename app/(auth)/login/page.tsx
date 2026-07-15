"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  setLoading(true);

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  console.log("Login Data:", data);
  console.log("Login Error:", error);

  if (error) {
    setLoading(false);
    alert(error.message);
    return;
  }

  const session = await supabase.auth.getSession();

  console.log("Current Session:", session);

  setLoading(false);

  alert("Login Successful!");

  router.push("/dashboard");
}

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111827",
      }}
    >
      <div
        style={{
          width: 400,
          background: "#1f2937",
          padding: 35,
          borderRadius: 12,
        }}
      >
        <h1
          style={{
            color: "white",
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Creator Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          style={{
            color: "#9ca3af",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Don't have an account?
        </p>

        <button
          onClick={() => router.push("/signup")}
          style={{
            ...buttonStyle,
            background: "#374151",
            marginTop: 10,
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #374151",
  background: "#111827",
  color: "white",
  fontSize: "15px",
} as const;

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
} as const;