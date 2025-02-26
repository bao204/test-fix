"use client";
import { useState } from "react";
import { Employee } from "../models/employee";
import { useLogin } from "../login/useLogin";
import { Button } from "../components/button/Button";
import Link from "next/link";

interface LoginProps {
  onLoginSuccess: (employee: Employee) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, handleLogin } = useLogin(onLoginSuccess);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      {/* Form đăng nhập */}
      <div className="w-full max-w-md bg-white p-10 rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Sign in to your account
        </h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-indigo-500"
              required
            />
          </div>

          <div className="flex justify-center">
            <Link href="/forgot_password" className="text-sm text-indigo-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <div className="flex justify-center">
            <Button
              label={loading ? "Signing in..." : "Sign in"}
              onClick={() => handleLogin(email, password)}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
