import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  ArrowLeft,
  UploadCloud,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

/* ===================== TYPES ===================== */

type ClaimType = "NORMAL" | "ACCIDENTAL";

type UploadedDocs = {
  [docName: string]: File;
};

/* ===================== CHECKLIST ===================== */

const NORMAL_DOCS = [
  "Death Certificate",
  "Policy Document",
  "Nominee Bank Details",
];

const ACCIDENTAL_DOCS = [
  "Death Certificate",
  "Policy Document",
  "Nominee Bank Details",
  // "FIR Copy",
  // "Post Mortem Report",
  // "Police Final Report",
];

/* ===================== COMPONENT ===================== */

export default function UploadClaim() {
  const navigate = useNavigate();

  const [claimType, setClaimType] = useState<ClaimType>("NORMAL");
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocs>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fileRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const [form, setForm] = useState({
    claimId: "",
    customer: "",
    policy: "",
    amount: "",
    date: "",
    notes: "",
  });

  const checklist =
    claimType === "NORMAL" ? NORMAL_DOCS : ACCIDENTAL_DOCS;

  /* ===================== HANDLERS ===================== */

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileUpload(docName: string, file: File) {
    setUploadedDocs((prev) => ({
      ...prev,
      [docName]: file,
    }));
  }

  /* ===================== SUBMIT ===================== */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (
      !form.claimId ||
      !form.customer ||
      !form.policy ||
      !form.amount ||
      !form.date
    ) {
      setError("Please fill all required fields");
      return;
    }

    const missingDocs = checklist.filter(
      (doc) => !uploadedDocs[doc]
    );

    if (missingDocs.length > 0) {
      setError(
        `Please upload required documents: ${missingDocs.join(", ")}`
      );
      return;
    }

    const formData = new FormData();

    // 🔗 Backend-compatible params
    formData.append("claimId", form.claimId);
    formData.append("customerName", form.customer);
    formData.append("policy", form.policy);
    formData.append("claimAmount", form.amount);
    formData.append("claimDate", form.date);
    formData.append("notes", form.notes);
    formData.append("claimType", claimType);

    Object.values(uploadedDocs).forEach((file) => {
      formData.append("files", file);
    });

    setSubmitting(true);

    try {
      await axios.post(
        "http://localhost:8080/api/claims/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Claim uploaded successfully");
      navigate(-1);
    } catch (err) {
      setError(
        err.response?.data?.message || "Upload failed"
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ===================== UI ===================== */

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-5xl mx-auto p-6 space-y-6">

        {/* HEADER */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-3xl font-bold">
            Upload Insurance Claim
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* CLAIM DETAILS */}
          <Card>
            <CardHeader>
              <CardTitle>Claim Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={claimType === "NORMAL" ? "default" : "outline"}
                  onClick={() => setClaimType("NORMAL")}
                >
                  <ShieldCheck className="mr-2" />
                  Normal Death
                </Button>

                <Button
                  type="button"
                  variant={claimType === "ACCIDENTAL" ? "default" : "outline"}
                  onClick={() => setClaimType("ACCIDENTAL")}
                >
                  <AlertTriangle className="mr-2" />
                  Accidental Death
                </Button>
              </div>

              <Input name="claimId" placeholder="Claim ID" value={form.claimId} onChange={handleInputChange} />
              <Input name="customer" placeholder="Customer Name" value={form.customer} onChange={handleInputChange} />
              <Input name="policy" placeholder="Policy Number" value={form.policy} onChange={handleInputChange} />
              <Input name="amount" placeholder="Claim Amount" value={form.amount} onChange={handleInputChange} />
              <Input type="date" name="date" value={form.date} onChange={handleInputChange} />
              <Textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleInputChange} />

            </CardContent>
          </Card>

          {/* DOCUMENT CHECKLIST + UPLOAD */}
          <Card>
            <CardHeader>
              <CardTitle>Document Checklist & Upload</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {checklist.map((doc) => (
                <div
                  key={doc}
                  className="flex items-center justify-between border p-3 rounded"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!uploadedDocs[doc]}
                      readOnly
                    />
                    <span className="font-medium">{doc}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      ref={(el) => (fileRefs.current[doc] = el)}
                      className="hidden"
                      onChange={(e) =>
                        e.target.files &&
                        handleFileUpload(doc, e.target.files[0])
                      }
                    />

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        fileRefs.current[doc]?.click()
                      }
                    >
                      <UploadCloud className="mr-2 h-4 w-4" />
                      {uploadedDocs[doc] ? "Replace" : "Upload"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {error && (
            <p className="text-red-600 font-medium">
              {error}
            </p>
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Uploading..." : "Submit Claim"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
