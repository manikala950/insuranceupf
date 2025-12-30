import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, UploadCloud, FileText, ArrowLeft } from "lucide-react";

type FileMeta = {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  url?: string;
};

export default function UploadClaim() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    claimId: "",
    customer: "",
    policy: "",
    amount: "",
    date: "",
    notes: "",
  });

  const [files, setFiles] = useState<FileMeta[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const MAX_FILE_MB = 15;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files;
    if (!selected) return;

    const accepted: FileMeta[] = [];

    Array.from(selected).forEach((file) => {
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        setError(`File "${file.name}" exceeds ${MAX_FILE_MB}MB`);
        return;
      }

      const id = crypto.randomUUID();
      const url = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;

      accepted.push({
        id,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        url,
      });
    });

    setFiles((prev) => [...prev, ...accepted]);
    setError(null);
    e.target.value = "";
  }

  function removeFile(id: string) {
    setFiles((prev) => {
      const removed = prev.find((f) => f.id === id);
      if (removed?.url) URL.revokeObjectURL(removed.url);
      return prev.filter((f) => f.id !== id);
    });
  }

  function humanSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.claimId || !form.customer || !form.policy || !form.amount) {
      setError("All required fields must be filled");
      return;
    }

    const formData = new FormData();
    formData.append("claimId", form.claimId);
    formData.append("customerName", form.customer);
    formData.append("policy", form.policy);
    formData.append("claimAmount", form.amount);
    formData.append("claimDate", form.date);
    formData.append("notes", form.notes);

    files.forEach((f) => formData.append("files", f.file));

    setSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/claims/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Backend response:", response.data);
      alert("Claim uploaded successfully");
      navigate(-1);
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.response?.data?.message || "Upload failed. Check backend & CORS.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Upload Claim</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CLAIM DETAILS */}
          <Card>
            <CardHeader>
              <CardTitle>Claim Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input name="claimId" placeholder="Claim ID" value={form.claimId} onChange={handleInputChange} />
              <Input name="customer" placeholder="Customer Name" value={form.customer} onChange={handleInputChange} />
              <Input name="policy" placeholder="Policy" value={form.policy} onChange={handleInputChange} />
              <Input name="amount" placeholder="Amount" value={form.amount} onChange={handleInputChange} />
              <Input type="date" name="date" value={form.date} onChange={handleInputChange} />
              <Textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleInputChange} />
            </CardContent>
          </Card>

          {/* DOCUMENTS */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <Button type="button" onClick={() => fileInputRef.current?.click()}>
                <UploadCloud className="mr-2" /> Choose Files
              </Button>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              {files.map((f) => (
                <div key={f.id} className="flex justify-between items-center border p-3 rounded">
                  <div className="flex items-center gap-2">
                    <FileText />
                    <div>
                      <p className="font-medium">{f.name}</p>
                      <p className="text-xs">{humanSize(f.size)}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => removeFile(f.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Uploading..." : "Submit Claim"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
}
