import { useState, useEffect } from "react";
import { useAuth } from "@/authContext";
import { useNavigate } from "react-router-dom";
import { FormWrapper } from "@/components/ui/FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { logFrontendError } from "@/lib/logger";

// Check if we're in demo mode
const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true' || import.meta.env.MODE === 'demo';

export default function Login() {
  const [email, setEmail] = useState(IS_DEMO_MODE ? "demo@allseasonsfoam.com" : "");
  const [password, setPassword] = useState(IS_DEMO_MODE ? "demo" : "");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [retrying, setRetrying] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Auto-login in demo mode
  useEffect(() => {
    if (IS_DEMO_MODE) {
      // Small delay to show the demo login page briefly
      const timer = setTimeout(() => {
        login("demo-jwt-token");
        navigate("/dashboard");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [login, navigate]);

  useEffect(() => {
    if (attempts >= 6) {
      setTimeout(() => {
        setRetrying(false);
        setErrorMessage("Unable to reach server. Try again later.");
        navigate("/login");
      }, 5000);
    }
  }, [attempts, navigate]);

  const tryLogin = async () => {
  try {
    const res = await apiFetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await (res as any).json();

    if (res.ok && data?.token) {
      login(data.token);
      setLoading(false);
      setRetrying(false);
      navigate("/dashboard");
      return;
    }

    // 👇 Handle bad credentials specifically — stop retrying
    if ((res as any).status === 401) {
      setErrorMessage("Your email or password is incorrect.");
      setLoading(false);
      setRetrying(false);
      return;
    }

    // 👇 Other server error — will fall into retry
    throw new Error(data?.error || "Unexpected server error");

  } catch (err) {
    logFrontendError("Login retry failure", {
      email,
      error: err instanceof Error ? err.message : String(err),
      attempt: attempts,
    });

    if (attempts < 6) {
      setTimeout(() => {
        setAttempts((prev) => prev + 1);
        tryLogin();
      }, 1000);
    } else {
      setErrorMessage("Unable to reach server. Please try again shortly.");
      setLoading(false);
      setRetrying(false);
    }
  }
};


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setRetrying(true);
    setAttempts(1);
    tryLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <FormWrapper onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold text-center text-foreground mb-4">
          Login to {IS_DEMO_MODE ? "All Seasons Foam CRM (Demo)" : "PathSix CRM"}
        </h1>

        {IS_DEMO_MODE && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-md p-3 mb-4">
            <div className="text-center text-yellow-800 text-sm">
              🚀 <strong>Demo Mode</strong> - Automatically logging you in...<br/>
              <span className="text-xs">No credentials required for this demonstration</span>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <div className="w-full max-w-sm space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading || retrying || IS_DEMO_MODE}>
              {IS_DEMO_MODE 
                ? "🚀 Demo Mode - Auto Login" 
                : retrying 
                  ? `🔄 Connecting to server... (${attempts}/6)` 
                  : "Log In"
              }
            </Button>

            {errorMessage && (
              <p className="text-red-600 text-sm text-center mt-2">{errorMessage}</p>
            )}

            <div className="text-right mt-1">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </FormWrapper>
    </div>
  );
}
