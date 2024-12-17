import React, { useState } from "react";
import axios from "axios";

// Forgot Password Component
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/api/auth/forgot-password", { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyItems: "center",
        alignContent: "center",
      }}
      className=" flex h-screen justify-center z-20 items-center"
    >
      <div
        style={{ backgroundColor: "#6CB4EE" }}
        className=" p-8 rounded-lg  w-96"
      >
        <h2 className="text-2xl  font-bold mb-6 text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Sending..." : "Reset Password"}
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

export default ForgotPassword;
