import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
  date: string;
}

interface CustomerFiles {
  aadharFile: File | null;
  panFile: File | null;
  photo: File | null;
}

interface ApiError {
  message?: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function AddCustomer() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
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
    date: "",
  });

  const [files, setFiles] = useState<CustomerFiles>({
    aadharFile: null,
    panFile: null,
    photo: null,
  });

  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [mandals, setMandals] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ================= LOAD STATES ================= */
  useEffect(() => {
    fetch(`${API_URL}/locations/states`)
      .then(res => res.json())
      .then(setStates)
      .catch(() => alert("❌ Failed to load states"));
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setFiles(p => ({ ...p, [e.target.name]: e.target.files![0] }));
  };

  const handleStateChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setForm(p => ({ ...p, state, district: "", mandal: "" }));
    setDistricts([]);
    setMandals([]);

    const res = await fetch(`${API_URL}/locations/districts?state=${state}`);
    setDistricts(await res.json());
  };

  const handleDistrictChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value;
    setForm(p => ({ ...p, district, mandal: "" }));

    const res = await fetch(
      `${API_URL}/locations/mandals?state=${form.state}&district=${district}`
    );
    setMandals(await res.json());
  };

  /* ================= DUPLICATE CHECK ================= */
  const checkDuplicate = async (field: string, value: string) => {
    if (!value) return;

    try {
      const res = await axios.get<boolean>(
        `${API_URL}/api/customers/check-${field}/${value}`
      );
      setErrors(p => ({ ...p, [field]: res.data ? "❌ Already exists" : "" }));
    } catch {
      setErrors(p => ({ ...p, [field]: "" }));
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (Object.values(errors).some(Boolean)) {
      alert("❌ Fix duplicate errors before submitting");
      return;
    }

    const fd = new FormData();
    fd.append("name", form.fullName);
    fd.append("email", form.email);
    fd.append("number", form.mobileNumber);
    fd.append("aadhaar", form.aadharNo);
    fd.append("pan", form.panNo);
    fd.append("address", form.address);
    fd.append("bankName", form.bankName);
    fd.append("bankAccount", form.bankAccount);
    fd.append("ifsc", form.ifsc);
    fd.append("agentId", form.agentId);
    fd.append("state", form.state);
    fd.append("district", form.district);
    fd.append("mandal", form.mandal);
    fd.append("date", form.date);


    if (files.aadharFile) fd.append("aadharFile", files.aadharFile);
    if (files.panFile) fd.append("panFile", files.panFile);
    if (files.photo) fd.append("photo", files.photo);

    try {
      await axios.post(`${API_URL}/api/customers/add`, fd);
      alert("✅ Customer added successfully");
      navigate(-1);
    } catch (err) {
      const error = err as AxiosError<ApiError>;

      if (typeof error.response?.data === "string") {
        alert(error.response.data);
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("❌ Failed to add customer");
      }
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex justify-center pt-8 bg-muted/20">
      <Card className="w-full max-w-3xl p-4 shadow-xl">
        <button
          onClick={() => navigate(-1)}
          className="flex gap-2 mb-4 text-primary"
        >
          <ArrowLeft /> Back
        </button>

        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Add New Customer
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <Input name="fullName" placeholder="Full Name" onChange={handleChange} required />

            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                onBlur={e => checkDuplicate("email", e.target.value)}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <Input
              name="mobileNumber"
              placeholder="Mobile Number"
              maxLength={10}
              onBlur={e => checkDuplicate("number", e.target.value)}
              onChange={handleChange}
              required
            />

            <Input
              name="aadharNo"
              placeholder="Aadhaar"
              maxLength={12}
              onBlur={e => checkDuplicate("aadhaar", e.target.value)}
              onChange={handleChange}
              required
            />

            <Input
              name="panNo"
              placeholder="PAN"
              onBlur={e => checkDuplicate("pan", e.target.value)}
              onChange={handleChange}
              required
            />

            <Input
              name="bankAccount"
              placeholder="Bank Account"
              onBlur={e => checkDuplicate("bank", e.target.value)}
              onChange={handleChange}
              required
            />

            <Input name="bankName" placeholder="Bank Name" onChange={handleChange} required />
            <Input name="ifsc" placeholder="IFSC Code" onChange={handleChange} required />
            <Input name="agentId" placeholder="Agent ID" onChange={handleChange} required />
          <Input type="date" name="date" onChange={handleChange} required />

            <select className="border p-2" value={form.state} onChange={handleStateChange} required>
              <option value="">Select State</option>
              {states.map(s => <option key={s}>{s}</option>)}
            </select>

            <select
              className="border p-2"
              value={form.district}
              onChange={handleDistrictChange}
              disabled={!form.state}
              required
            >
              <option value="">Select District</option>
              {districts.map(d => <option key={d}>{d}</option>)}
            </select>

            <select
              className="border p-2"
              value={form.mandal}
              onChange={e => setForm(p => ({ ...p, mandal: e.target.value }))}
              disabled={!form.district}
              required
            >
              <option value="">Select Mandal</option>
              {mandals.map(m => <option key={m}>{m}</option>)}
            </select>

            <Input
              name="address"
              placeholder="Address"
              className="md:col-span-2"
              onChange={handleChange}
              required
            />

            <input type="file" name="aadharFile" onChange={handleFileChange} required />
            <input type="file" name="panFile" onChange={handleFileChange} required />
            <input type="file" name="photo" onChange={handleFileChange} required />

            <Button type="submit" className="md:col-span-2">
              Add Customer
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
