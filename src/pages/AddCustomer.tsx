import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

/* ================= TYPES ================= */
interface CustomerForm {
  fullName: string;
  email: string;
  mobileNumber: string;
  aadharNo: string;
  panNo: string;
  address: string;
  bankName: string;
  bankAccount: string;
  ifsc: string;
  agentId: string;
  state: string;
  district: string;
  mandal: string;
}

interface CustomerFiles {
  aadharFile: File | null;
  panFile: File | null;
  photo: File | null;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function AddCustomer() {
  const navigate = useNavigate();

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState<CustomerForm>({
    fullName: "",
    email: "",
    mobileNumber: "",
    aadharNo: "",
    panNo: "",
    address: "",
    bankName: "",
    bankAccount: "",
    ifsc: "",
    agentId: "",
    state: "",
    district: "",
    mandal: "",
  });

  /* ================= FILES ================= */
  const [files, setFiles] = useState<CustomerFiles>({
    aadharFile: null,
    panFile: null,
    photo: null,
  });

  /* ================= LOCATION ================= */
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [mandals, setMandals] = useState<string[]>([]);

  /* ================= ERRORS ================= */
  const [aadhaarError, setAadhaarError] = useState<string>("");

  /* ================= LOAD STATES ================= */
  useEffect(() => {
    fetch(`${API_URL}/locations/states`)
      .then((res) => res.json())
      .then((data: string[]) => setStates(data))
      .catch(() => alert("Failed to load states"));
  }, []);

  /* ================= INPUT HANDLERS ================= */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;

    setFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  /* ================= STATE CHANGE ================= */
  const handleStateChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;

    setForm((prev) => ({
      ...prev,
      state,
      district: "",
      mandal: "",
    }));

    setDistricts([]);
    setMandals([]);

    const res = await fetch(
      `${API_URL}/locations/districts?state=${state}`
    );
    setDistricts(await res.json());
  };

  /* ================= DISTRICT CHANGE ================= */
  const handleDistrictChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value;

    setForm((prev) => ({
      ...prev,
      district,
      mandal: "",
    }));

    const res = await fetch(
      `${API_URL}/locations/mandals?state=${form.state}&district=${district}`
    );
    setMandals(await res.json());
  };

  /* ================= MANDAL CHANGE ================= */
  const handleMandalChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, mandal: e.target.value }));
  };

  /* ================= AADHAAR CHECK ================= */
  const checkAadhaar = async () => {
    if (form.aadharNo.length !== 12) return;

    try {
      const res = await axios.get<boolean>(
        `${API_URL}/api/customers/check-aadhaar/${form.aadharNo}`
      );
      setAadhaarError(res.data ? "❌ Aadhaar already exists" : "");
    } catch {
      setAadhaarError("");
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (aadhaarError) {
      alert("Fix Aadhaar error before submitting");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.fullName);
    formData.append("email", form.email);
    formData.append("number", form.mobileNumber);
    formData.append("aadhaar", form.aadharNo);
    formData.append("pan", form.panNo);
    formData.append("address", form.address);
    formData.append("bankName", form.bankName);
    formData.append("bankAccount", form.bankAccount);
    formData.append("ifsc", form.ifsc);
    formData.append("agentId", form.agentId);
    formData.append("state", form.state);
    formData.append("district", form.district);
    formData.append("mandal", form.mandal);

    if (files.aadharFile) formData.append("aadharFile", files.aadharFile);
    if (files.panFile) formData.append("panFile", files.panFile);
    if (files.photo) formData.append("photo", files.photo);

    try {
      await axios.post(`${API_URL}/api/customers/add`, formData);
      alert("✅ Customer added successfully");
      navigate(-1);
    } catch (error) {
      const err = error as AxiosError<string>;
      const msg = err.response?.data?.toLowerCase() || "";

      if (msg.includes("email")) alert("❌ Email already exists");
      else if (msg.includes("number")) alert("❌ Mobile number already exists");
      else if (msg.includes("aadhaar")) alert("❌ Aadhaar already exists");
      else if (msg.includes("pan")) alert("❌ PAN already exists");
      else if (msg.includes("bank")) alert("❌ Bank account already exists");
      else alert("❌ Failed to add customer");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex flex-col items-center pt-8 px-4 bg-muted/20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-primary"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <Card className="w-full max-w-3xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Add New Customer
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <Input name="fullName" placeholder="Full Name" onChange={handleChange} required />
            <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <Input name="mobileNumber" placeholder="Mobile Number" maxLength={10} onChange={handleChange} required />

            <div>
              <Input
                name="aadharNo"
                placeholder="Aadhaar (12 digits)"
                maxLength={12}
                onChange={handleChange}
                onBlur={checkAadhaar}
                required
              />
              {aadhaarError && <p className="text-red-500 text-sm">{aadhaarError}</p>}
            </div>

            <Input name="panNo" placeholder="PAN Number" maxLength={10} onChange={handleChange} required />
            <Input name="agentId" placeholder="AP-01-22-0001" onChange={handleChange} required />

            <select className="border rounded-md p-2" value={form.state} onChange={handleStateChange} required>
              <option value="">Select State</option>
              {states.map((s) => <option key={s}>{s}</option>)}
            </select>

            <select className="border rounded-md p-2" value={form.district} onChange={handleDistrictChange} disabled={!form.state} required>
              <option value="">Select District</option>
              {districts.map((d) => <option key={d}>{d}</option>)}
            </select>

            <select className="border rounded-md p-2" value={form.mandal} onChange={handleMandalChange} disabled={!form.district} required>
              <option value="">Select Mandal</option>
              {mandals.map((m) => <option key={m}>{m}</option>)}
            </select>

            <Input name="bankName" placeholder="Bank Name" onChange={handleChange} required />
            <Input name="bankAccount" placeholder="Bank Account Number" onChange={handleChange} required />
            <Input name="ifsc" placeholder="IFSC Code" onChange={handleChange} required />

            <div className="md:col-span-2">
              <Input name="address" placeholder="Address" onChange={handleChange} required />
            </div>

            <input type="file" name="aadharFile" onChange={handleFileChange} required />
            <input type="file" name="panFile" onChange={handleFileChange} required />
            <input type="file" name="photo" onChange={handleFileChange} required />

            <div className="md:col-span-2">
              <Button type="submit" className="w-full h-11">
                Add Customer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
