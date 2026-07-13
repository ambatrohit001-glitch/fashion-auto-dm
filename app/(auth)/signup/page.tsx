"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    // Create authentication account
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    // Save creator profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: data.user.id,
            full_name: name,
            email: email,
          },
        ]);

      if (profileError) {
        console.error(profileError);
      }
    }

    setLoading(false);

    alert("Account created successfully!");

    router.push("/login");
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
          Create Creator Account
        </h1>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

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
          onClick={handleSignup}
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p
          style={{
            color: "#9ca3af",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Already have an account?
        </p>

        <button
          onClick={() => router.push("/login")}
          style={{
            ...buttonStyle,
            background: "#374151",
            marginTop: 10,
          }}
        >
          Login
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