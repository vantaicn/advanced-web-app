// Login page with React Hook Form

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Validation schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const { login, isLoading, loginError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="user@example.com"
              style={styles.input}
              disabled={isLoading}
            />
            {errors.email && <p style={styles.error}>{errors.email.message}</p>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Enter your password"
              style={styles.input}
              disabled={isLoading}
            />
            {errors.password && (
              <p style={styles.error}>{errors.password.message}</p>
            )}
          </div>

          {loginError && (
            <div style={styles.errorBox}>
              {loginError instanceof Error
                ? loginError.message
                : "Login failed"}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.button,
              opacity: isLoading ? 0.6 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={styles.demoInfo}>
          <p style={styles.demoTitle}>Demo Credentials:</p>
          <p style={styles.demoText}>Email: user@example.com</p>
          <p style={styles.demoText}>Password: password123</p>
          <p style={styles.demoText}>or</p>
          <p style={styles.demoText}>Email: admin@example.com</p>
          <p style={styles.demoText}>Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    maxWidth: "450px",
    width: "100%",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1a202c",
    marginBottom: "8px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    color: "#718096",
    marginBottom: "32px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#2d3748",
  },
  input: {
    padding: "12px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "all 0.2s",
    outline: "none",
  },
  error: {
    color: "#f56565",
    fontSize: "12px",
    marginTop: "4px",
  },
  errorBox: {
    backgroundColor: "#fed7d7",
    color: "#c53030",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#667eea",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.2s",
    marginTop: "8px",
  },
  demoInfo: {
    marginTop: "32px",
    padding: "16px",
    backgroundColor: "#f7fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  demoTitle: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: "8px",
  },
  demoText: {
    fontSize: "11px",
    color: "#718096",
    marginBottom: "4px",
  },
};
