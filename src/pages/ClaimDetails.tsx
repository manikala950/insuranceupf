import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ===================== TYPES ===================== */

interface Document {
  id: number;
  fileName: string;
}

interface Claim {
  id: number;
  claimId: string;
  customerName: string;
  claimAmount: number;
  status: string;
  claimType: "NORMAL" | "ACCIDENTAL";
  documents?: Document[];
}

/* ===================== CHECKLIST DATA ===================== */

const NORMAL_CHECKLIST = {
  "Identity & Verification": [
    "Death Certificate",
    "Medical Cause of Death Certificate",
    "Aadhaar of Deceased",
    "Aadhaar of Nominee",
    "Relationship Proof",
    "Address Proof",
    "Legal Heir Certificate",
  ],
  "Insurance & Financial": [
    "Policy Copy",
    "Bank Passbook",
    "FD",
    "Mutual Fund",
  ],
};

const ACCIDENTAL_CHECKLIST = {
  "Mandatory Documents": [
    "Death Certificate",
    "Aadhaar of Deceased",
    "Aadhaar of Nominee",
    "Bank Passbook",
  ],
  "Accident Proof": [
    "FIR",
    "Post Mortem",
    "Inquest",
    "Hospital Records",
    "Police Final Report",
  ],
};

/* ===================== MANDATORY RULES ===================== */

const MANDATORY_DOCS: Record<"NORMAL" | "ACCIDENTAL", string[]> = {
  NORMAL: ["Death Certificate", "Policy"],
  ACCIDENTAL: ["Death Certificate", "FIR", "Post Mortem"],
};

/* ===================== COMPONENT ===================== */
const API_URL = import.meta.env.VITE_API_URL;
export default function ClaimDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claim, setClaim] = useState<Claim | null>(null);

  const role = localStorage.getItem("role") || "AGENT";
  const DOC_API = `${API_URL}/api/claims/documents`;

  /* ===================== FETCH CLAIM ===================== */

  useEffect(() => {
    axios
      .get(`${API_URL}/api/claims/${id}`)
      .then((res) => {
        setClaim({
          ...res.data,
          documents: res.data.documents || [],
        });
      });
  }, [id]);

  if (!claim) return <p className="p-6">Loading...</p>;

  /* ===================== HELPERS ===================== */

  function isUploaded(name: string): boolean {
    return (
      claim.documents?.some((d) =>
        d.fileName.toLowerCase().includes(name.toLowerCase().split(" ")[0])
      ) || false
    );
  }

  const checklist =
    claim.claimType === "NORMAL" ? NORMAL_CHECKLIST : ACCIDENTAL_CHECKLIST;

  const missingDocs = MANDATORY_DOCS[claim.claimType].filter(
    (doc) => !isUploaded(doc)
  );

  /* ===================== PDF EXPORT ===================== */

  function exportPDF() {
    const pdf = new jsPDF();
    let y = 10;

    pdf.text("Claim Document Checklist", 10, y);
    y += 10;
    pdf.text(`Claim ID: ${claim.claimId}`, 10, y);
    y += 10;
    pdf.text(`Claim Type: ${claim.claimType}`, 10, y);
    y += 10;

    Object.entries(checklist).forEach(([section, items]) => {
      pdf.text(section, 10, y);
      y += 6;

      items.forEach((item) => {
        pdf.text(
          `${isUploaded(item) ? "[✔]" : "[ ]"} ${item}`,
          12,
          y
        );
        y += 6;
      });
      y += 4;
    });

    pdf.save(`claim-${claim.claimId}-checklist.pdf`);
  }

  /* ===================== ACTIONS ===================== */

  async function updateStatus(status: "Approved" | "Rejected") {
    try {
      await axios.put(
        `${API_URL}/api/claims/${claim.id}/status`,
        { status }
      );

      setClaim({ ...claim, status });
      alert(`Claim ${status}`);
    } catch (err) {
      alert("Failed to update status");
    }
  }

  /* ===================== UI ===================== */

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <Button variant="outline" onClick={() => navigate(-1)}>
        Back
      </Button>

      {/* CLAIM DETAILS */}
      <Card>
        <CardHeader>
          <CardTitle>Claim Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p><b>Claim ID:</b> {claim.claimId}</p>
          <p><b>Customer:</b> {claim.customerName}</p>
          <p><b>Type:</b> {claim.claimType}</p>
          <p><b>Status:</b> {claim.status}</p>
          <p><b>Amount:</b> ₹{claim.claimAmount}</p>
          <p className="text-sm text-gray-500">
            Action performed by: {role}
          </p>
        </CardContent>
      </Card>

      {/* CHECKLIST */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Document Checklist</CardTitle>
          <Button variant="outline" onClick={exportPDF}>
            Export PDF
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {Object.entries(checklist).map(([section, items]) => (
            <div key={section}>
              <h3 className="font-semibold">{section}</h3>
              {items.map((item) => (
                <p key={item}>
                  {isUploaded(item) ? "✅" : "☐"} {item}
                </p>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* MISSING DOC WARNING */}
      {missingDocs.length > 0 && (
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle className="text-red-600">
              Missing Mandatory Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            {missingDocs.map((d) => (
              <p key={d}>⚠ {d}</p>
            ))}
          </CardContent>
        </Card>
      )}

      {/* DOCUMENTS */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {claim.documents.length === 0 && (
            <p className="italic text-gray-500">No documents uploaded</p>
          )}

          {claim.documents.map((d) => (
            <div key={d.id} className="flex justify-between border-b pb-2">
              <span>{d.fileName}</span>
              <div className="flex gap-2">
                <a
                  href={`${DOC_API}/preview/${d.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" variant="outline">View</Button>
                </a>
                <a href={`${DOC_API}/download/${d.id}`}>
                  <Button size="sm" variant="secondary">Download</Button>
                </a>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* APPROVAL ACTIONS – AGENT + ADMIN */}
      <div className="flex gap-4">
        <Button
          disabled={missingDocs.length > 0}
          className="bg-green-600 text-white disabled:opacity-50"
          onClick={() => updateStatus("Approved")}
        >
          Approve
        </Button>

        <Button
          variant="destructive"
          onClick={() => updateStatus("Rejected")}
        >
          Reject
        </Button>
      </div>
    </div>
  );
}
