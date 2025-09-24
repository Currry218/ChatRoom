import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { avatarOptions } from "../../LongArray";
import { toast } from "react-toastify";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

interface Props {
  switchToLogin: () => void;
}

const RegisterForm = ({ switchToLogin }: Props) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    avatar: avatarOptions[0],
    sex: "other",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    sex: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarSelect = (src: string) => setForm({ ...form, avatar: src });
  const handleGenderSelect = (sex: string) => setForm({ ...form, sex });

  const validate = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      avatar: "",
      sex: "",
    };

    if (!form.username.trim()) newErrors.username = "Username required";

    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email invalid";

    if (!form.password)
      //|| form.password.length < 6)
      newErrors.password = "Password min 6 chars";

    if (!form.avatar) newErrors.avatar = "Select avatar";

    if (!form.sex) newErrors.sex = "Select sex";
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);

      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);

      toast.success("Registration successful!");
      window.location.href = "/";
      return res.data.user;
    } catch (err: any) {
      toast.error(err.response?.data || "Registration failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md shadow-lg rounded-2xl p-8 form-modal">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Avatar Picker */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Avatar
          </label>
          <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto">
            {avatarOptions.map((src) => (
              <img
                key={src}
                src={src}
                alt="avatar"
                className={`w-16 h-16 rounded-full cursor-pointer border-4 transition-all ${
                  form.avatar === src ? "border-red-500 " : "border-transparent"
                }`}
                onClick={() => handleAvatarSelect(src)}
              />
            ))}
          </div>
          {errors.avatar && (
            <p className="text-red-500 text-sm">{errors.avatar}</p>
          )}
        </div>

        {/* Username */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              value={form.sex}
              onChange={(e) => handleGenderSelect(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.sex && <p className="text-red-500 text-sm">{errors.sex}</p>}
          </div>
        </div>

        {/* Password */}
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
          {loading ? "Please wait..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button className="text-blue-600 font-semibold" onClick={switchToLogin}>
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
