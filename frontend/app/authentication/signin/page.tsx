"use client";

import { useState } from "react";
import "./page.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/api/auth";

export default function SigninPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!agreeToTerms) {
      alert("You must accept terms");
      return;
    }

    try {
      setLoading(true);

      const result = await signup({
        name: firstName,
        family_name: lastName,
        email,
        username: email, // safer than split
        password,
      });

      console.log("Signup success:", result);
      alert("Account created successfully");

      router.push("/projects");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong");
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
          <h1 className="panelHeadline">
            Join thousands of teams managing projects efficiently
          </h1>
          <p className="panelSub">
            Create your account and start collaborating with your team today.
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

          <h2 className="formTitle">Create your account</h2>
          <p className="formSubtitle">Get started with your free account</p>

          <form onSubmit={handleSubmit}>
            <div className="fieldGroup">
              {/* First Name */}
              <div className="field">
                <label className="label">First name</label>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="field">
                <label className="label">Last name</label>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

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

              {/* Confirm Password */}
              <div className="field">
                <label className="label">Confirm password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Show password toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide password" : "Show password"}
            </button>

            {/* Terms */}
            <label>
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              I agree to Terms
            </label>

            {/* Submit */}
            <button type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>

            <div>
              Already have an account?{" "}
              <Link href="/authentication/login">Sign in</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}