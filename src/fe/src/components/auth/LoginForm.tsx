import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { redirect } from "react-router";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

interface Props {
  switchToRegister: () => void;
}

const LoginForm = ({ switchToRegister }: Props) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = { username: "", password: "" };
    if (!form.username.trim()) newErrors.username = "Username required";
    if (!form.password) newErrors.password = "Password required";
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);

      if (res.data?.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);

        toast.success("Login successful!");
        navigate("/");
        return res.data.user;
      } else {
        toast.error("Invalid login response");
        return null;
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md shadow-lg rounded-2xl p-8 form-modal">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            >
              {showPassword ? (
                <IoIosEyeOff size={18} />
              ) : (
                <IoIosEye size={18} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <button
          className="text-blue-600 font-semibold"
          onClick={switchToRegister}
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
