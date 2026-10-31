import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => navigate("/dashboard", { replace: true }), 1000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <section className="bg-white rounded-lg shadow p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-4">Login to All Seasons Foam CRM (Demo)</h1>
        <p className="bg-yellow-100 border border-yellow-300 rounded-md p-3 mb-4 text-yellow-800 text-sm">
          Demo Mode — opening the sample dashboard. No credentials are required.
        </p>
        <Link to="/dashboard" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Enter demo</Link>
      </section>
    </div>
  );
}
