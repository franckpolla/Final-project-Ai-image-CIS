import React, { useState } from "react"; // Add React and useState import
import axios from "axios"; // Add axios import

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Extract token from URL
  const getResetToken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("token");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const token = getResetToken();
      if (!token) {
        throw new Error("No reset token found");
      }

      const response = await axios.post("/api/auth/reset-password", {
        token,
        newPassword: password,
      });

      setMessage(response.data.message);

      // Redirect to login after successful reset
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container h-screen flex justify-center items-center">
      <div
        style={{ backgroundColor: "#6CB4EE" }}
        className=" p-8 rounded-lg shadow-md w-96"
      >
        <div className="flex items-center justify-center pb-4">
          <img
            style={{
              width: "80px",
              height: "auto",
            }}
            src="/assets/Brain_tech.png"
            alt="logo image"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full bg-slate-500 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: "#6F00FF" }}
            className="w-full text-white py-2 rounded-lg hover:bg-blue-900 transition duration-300"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 font-semibold text-sm mt-4 text-center">
            {error}
          </p>
        )}
        {message && (
          <p className="text-white text-sm mt-4 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
