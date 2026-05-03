import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);
      login(response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      console.error("Response Data:", err.response?.data);
      const backendMessage = err.response?.data?.message || err.response?.data?.error;
      setError(backendMessage || `Login failed. Server responded with: ${err.response?.status} ${err.response?.statusText}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 bg-gray-50">
      <form className="card w-full max-w-md space-y-4 bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center">Login to your account</h1>

        <input
          className="input w-full p-2 border border-gray-300 rounded"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          required
        />

        <input
          className="input w-full p-2 border border-gray-300 rounded"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
          required
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button className="btn-primary w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </button>

        <p className="text-sm text-slate-600 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-700 hover:underline">Signup</Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
