import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../API/axiosInstance"

export default function SignIn() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/login/', credentials);
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            navigate('/');
        } catch (err) {
            alert(
                err.response?.data?.detail ||
                err.response?.data?.non_field_errors?.[0] ||
                "Login failed. Please try again."
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md px-6 py-10">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-semibold text-gray-900">Login</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            onChange={handleChange}
                            autoComplete="username"
                            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 sm:text-sm"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Password
                            </label>

                        </div>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            onChange={handleChange}
                            autoComplete="current-password"
                            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 sm:text-sm"
                        />
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                className="w-5 h-5 accent-gray-400 cursor-pointer"
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                                id="showPassword"
                            />
                            <label
                                htmlFor="showPassword"
                                className="text-[14px] ml-1 cursor-pointer select-none"
                            >
                                Show password
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-gray-600 cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}
