import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AgentLogin: React.FC = () => {
  const [agentId, setAgentId] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"SEND_OTP" | "VERIFY_OTP">("SEND_OTP");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // ================= SEND OTP =================
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(
        "http://localhost:8080/auth/agent/send-otp",
        null,
        { params: { agentId } }
      );

      setStep("VERIFY_OTP");
      setMessage("OTP sent to registered email");
    } catch {
      setMessage("Agent ID not found");
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      // ✅ VERIFY OTP
      await axios.post(
        "http://localhost:8080/auth/agent/verify-otp",
        null,
        { params: { agentId, otp } }
      );

      // ✅ FETCH AGENT DETAILS BY AGENT ID
      const agentResponse = await axios.get(
        `http://localhost:8080/agent/by-agent-id/${agentId}`
      );

      // ✅ STORE DATA
      localStorage.setItem("agentLoggedIn", "true");
      localStorage.setItem("agentId", agentId);
      localStorage.setItem("agent", JSON.stringify(agentResponse.data));

      navigate("/agent/dashboard");
    } catch {
      setMessage("Invalid or expired OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={step === "SEND_OTP" ? handleSendOtp : handleVerifyOtp}
        className="bg-white p-8 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Agent Login
        </h2>

        {/* AGENT ID */}
        <input
          type="text"
          placeholder="Agent ID (AP-23-01-0001)"
          className="w-full p-2 mb-3 border rounded"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          required
          disabled={step === "VERIFY_OTP"}
        />

        {/* OTP */}
        {step === "VERIFY_OTP" && (
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-2 mb-3 border rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        )}

        {message && (
          <p className="text-sm mb-3 text-center text-red-500">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded"
        >
          {step === "SEND_OTP" ? "Send OTP" : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default AgentLogin;
