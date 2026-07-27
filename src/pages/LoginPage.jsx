import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth.js";
import Input from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    setApiError("");
    try {
      await login(email, password);
      const from = location.state?.from?.pathname ?? "/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(err.response?.data?.message ?? "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-up">
        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/4 backdrop-blur-xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 shadow-lg shadow-violet-900/50">
              AI
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-sm text-white/40">Sign in to your AI Task Platform account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              })}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
            />

            {apiError && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {apiError}
              </p>
            )}

            <Button
              id="login-submit"
              type="submit"
              loading={isSubmitting}
              className="w-full mt-2"
              size="lg"
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-white/40">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
