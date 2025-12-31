import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ================= TYPES ================= */

interface CustomerForm {
  custId?: string;
  name: string;
  email: string;
  number: number;
  aadhaar: number;
  pan: string;
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
  aadharFile?: File;
  panFile?: File;
  photo?: File;
}

const API_URL = import.meta.env.VITE_API_URL;

/* ================= COMPONENT ================= */

export default function EditCustomer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<CustomerForm>({
    name: "",
    email: "",
    number: 0,
    aadhaar: 0,
    pan: "",
    address: "",
    bankName: "",
    bankAccount: "",
    ifsc: "",
    agentId: "",
    state: "",
    district: "",
    mandal: "",
  });

  const [files, setFiles] = useState<CustomerFiles>({});
  const [loading, setLoading] = useState(true);

  /* ================= LOAD CUSTOMER ================= */
  useEffect(() => {
    if (!id) return;

    axios
      .get<CustomerForm>(`${API_URL}/api/customers/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("❌ Failed to load customer"))
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= HANDLERS ================= */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "number" || name === "aadhaar"
          ? Number(value)
          : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setFiles((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  /* ================= SUBMIT ================= */

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    (Object.keys(form) as (keyof CustomerForm)[]).forEach((key) => {
      const value = form[key];
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    if (files.aadharFile) formData.append("aadharFile", files.aadharFile);
    if (files.panFile) formData.append("panFile", files.panFile);
    if (files.photo) formData.append("photo", files.photo);

    try {
      await axios.put(
        `${API_URL}/api/customers/${id}`,
        formData
      );
      alert("✅ Customer updated successfully");
      navigate(-1);
    } catch (error) {
      const err = error as AxiosError<string>;
      alert(err.response?.data || "❌ Update failed");
    }
  };

  if (loading) {
    return <p className="p-6">Loading customer...</p>;
  }

  /* ================= UI ================= */

  return (
    <form
      onSubmit={submit}
      className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <Input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <Input name="number" value={form.number} onChange={handleChange} placeholder="Mobile Number" required />
      <Input name="aadhaar" value={form.aadhaar} onChange={handleChange} placeholder="Aadhaar" required />
      <Input name="pan" value={form.pan} onChange={handleChange} placeholder="PAN" required />
      <Input name="agentId" value={form.agentId} onChange={handleChange} placeholder="Agent ID" required />
      <Input name="state" value={form.state} onChange={handleChange} placeholder="State" required />
      <Input name="district" value={form.district} onChange={handleChange} placeholder="District" required />
      <Input name="mandal" value={form.mandal} onChange={handleChange} placeholder="Mandal" required />
      <Input name="bankName" value={form.bankName} onChange={handleChange} placeholder="Bank Name" required />
      <Input name="bankAccount" value={form.bankAccount} onChange={handleChange} placeholder="Bank Account" required />
      <Input name="ifsc" value={form.ifsc} onChange={handleChange} placeholder="IFSC Code" required />

      <Input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        className="md:col-span-2"
        required
      />

      {/* FILES */}
      <input type="file" name="aadharFile" onChange={handleFileChange} />
      <input type="file" name="panFile" onChange={handleFileChange} />
      <input type="file" name="photo" onChange={handleFileChange} />

      <div className="md:col-span-2">
        <Button type="submit" className="w-full">
          Update Customer
        </Button>
      </div>
    </form>
  );
}
