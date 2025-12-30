import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

export default function AddAgent() {
  const navigate = useNavigate();

  // ===== LOCATION LISTS =====
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [mandals, setMandals] = useState([]);

  // ===== UI SELECTIONS =====
  const [stateName, setStateName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [mandalName, setMandalName] = useState("");

  // ===== FORM DATA =====
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    aadhar: "",
    bankAccount: "",
    address: "",
    stateCode: "",
    districtCode: "",
    mandalCode: "",
    username: "",
    password: "",
    licenseNumber: "",
    agentIdPreview: ""
  });

  // ================= FETCH STATES =================
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/locations/states`)
      .then(res => res.json())
      .then(setStates)
      .catch(() => alert("Failed to load states"));
  }, []);

  // ================= STATE CHANGE =================
  const handleStateChange = async (e) => {
    const state = e.target.value;

    setStateName(state);
    setDistrictName("");
    setMandalName("");
    setDistricts([]);
    setMandals([]);

    setForm(prev => ({
      ...prev,
      stateCode: "",
      districtCode: "",
      mandalCode: "",
      agentIdPreview: ""
    }));

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/locations/districts?state=${state}`
    );
    setDistricts(await res.json());
  };

  // ================= DISTRICT CHANGE =================
  const handleDistrictChange = async (e) => {
    const district = e.target.value;

    setDistrictName(district);
    setMandalName("");
    setMandals([]);

    setForm(prev => ({
      ...prev,
      districtCode: "",
      mandalCode: "",
      agentIdPreview: ""
    }));

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/locations/mandals?state=${stateName}&district=${district}`
    );
    setMandals(await res.json());
  };

  // ================= MANDAL CHANGE =================
  const handleMandalChange = async (e) => {
    const mandal = e.target.value;
    setMandalName(mandal);

    const params = new URLSearchParams({
      state: stateName,
      district: districtName,
      mandal
    });

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/locations/code?${params.toString()}`,
      { method: "POST" }
    );

    const json = await res.json();

    setForm(prev => ({
      ...prev,
      stateCode: json.stateCode,
      districtCode: json.districtCode,
      mandalCode: json.mandalCode
    }));
  };

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form };
    delete payload.agentIdPreview;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/agent/add-agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const msg = await res.text();

        if (msg.includes("Email")) alert("❌ Email already exists");
        else if (msg.includes("Username")) alert("❌ Username already exists");
        else if (msg.includes("Aadhar")) alert("❌ Aadhar already exists");
        else if (msg.includes("Bank")) alert("❌ Bank account already exists");
        else if (msg.includes("License")) alert("❌ License number already exists");
        else alert("❌ Failed to add agent");

        return;
      }

      alert("✅ Agent added successfully!");
      navigate("/admin");

    } catch (err) {
      alert("❌ Server error. Please try again later.");
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-8 px-4 bg-muted/20">

      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 mb-6 text-primary hover:underline"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <Card className="w-full max-w-2xl rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Add New Agent
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            <Input name="name" placeholder="Full Name" onChange={handleChange} required />
            <Input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <Input name="number" placeholder="Phone Number" onChange={handleChange} required />
            <Input name="aadhar" placeholder="Aadhar Number" maxLength={12} onChange={handleChange} required />
            <Input name="bankAccount" placeholder="Bank Account" onChange={handleChange} required />

            <select className="border rounded-md p-2" value={stateName} onChange={handleStateChange} required>
              <option value="">Select State</option>
              {states.map(s => <option key={s}>{s}</option>)}
            </select>

            <select className="border rounded-md p-2" value={districtName} onChange={handleDistrictChange} required disabled={!stateName}>
              <option value="">Select District</option>
              {districts.map(d => <option key={d}>{d}</option>)}
            </select>

            <select className="border rounded-md p-2" value={mandalName} onChange={handleMandalChange} required disabled={!districtName}>
              <option value="">Select Mandal</option>
              {mandals.map(m => <option key={m}>{m}</option>)}
            </select>

            <Input name="address" placeholder="Address" onChange={handleChange} required />
            <Input name="username" placeholder="Username" onChange={handleChange} required />
            <Input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <Input name="licenseNumber" placeholder="License Number" onChange={handleChange} required />

            <div className="col-span-2">
              <Button className="w-full">Add Agent</Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
