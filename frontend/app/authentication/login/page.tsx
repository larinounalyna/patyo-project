"use client";

import { useState } from "react";
import "./page.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";

export default function AuthenticationPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const result = await login({
        email,
        password,
      });

      console.log("Login success:", result);

      // ✅ Token already stored in login()
      // Optional: store remember flag
      if (rememberMe) {
        localStorage.setItem("remember_me", "true");
      }

      // ✅ Proper navigation
      router.push("/projects");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Login failed:", err.message);
        alert(err.message);
      } else {
        alert("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      {/* Left Panel */}
      <aside className="leftPanel">
        <Link href="/" className="brandLogo">
          <div className="brandDot">
            <svg viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="brandName">Patyo</span>
        </Link>

        <div className="panelContent">
          <h1 className="panelHeadline">Manage your projects with ease</h1>
          <p className="panelSub">
            Streamline your workflow, track progress, and collaborate seamlessly
            with your team.
          </p>
        </div>
      </aside>

      {/* Right Panel */}
      <main className="rightPanel">
        <div className="formCard">
          <Link href="/" className="mobileBrand">
            <div className="brandDot">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="brandName">Patyo</span>
          </Link>

          <h2 className="formTitle">Welcome back</h2>
          <p className="formSubtitle">Sign in to your account</p>

          <form onSubmit={handleSubmit}>
            <div className="fieldGroup">
              {/* Email */}
              <div className="field">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="field">
                <label className="label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Toggle password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide password" : "Show password"}
            </button>

            {/* Remember me */}
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>

            {/* Submit */}
            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div>
              Don&apos;t have an account?{" "}
              <Link href="/authentication/signin">Sign up</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
