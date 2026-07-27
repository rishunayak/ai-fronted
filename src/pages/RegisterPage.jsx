import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth.js";
import Input from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";

export default function RegisterPage() {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ name, email, password }) => {
    setApiError("");
    try {
      await authRegister(name, email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setApiError(err.response?.data?.message ?? "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-up">
        <div className="rounded-2xl border border-white/10 bg-white/4 backdrop-blur-xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 shadow-lg shadow-violet-900/50">
              AI
            </div>
            <h1 className="text-2xl font-bold text-white">Create account</h1>
            <p className="text-sm text-white/40">Start processing AI tasks in seconds</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <Input
              id="name"
              label="Full name"
              placeholder="Jane Smith"
              autoComplete="name"
              error={errors.name?.message}
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Min 2 characters" },
              })}
            />
            <Input
              id="reg-email"
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
              id="reg-password"
              type="password"
              label="Password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.password?.message}
              helperText="Minimum 8 characters"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Min 8 characters" },
              })}
            />
            <Input
              id="confirm-password"
              type="password"
              label="Confirm password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (v) => v === watch("password") || "Passwords do not match",
              })}
            />

            {apiError && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {apiError}
              </p>
            )}

            <Button
              id="register-submit"
              type="submit"
              loading={isSubmitting}
              className="w-full mt-2"
              size="lg"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-white/40">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
