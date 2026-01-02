import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ================= TYPES ================= */

interface Claim {
  id: number;
  claimId: string;
  customerName: string;
  policy: string;
  claimAmount: number;
  status: string;
}

interface SearchFilters {
  claimId: string;
  customerName: string;
  status: string;
}

const API_URL = import.meta.env.VITE_API_URL;

/* ================= COMPONENT ================= */

export default function Claims() {
  const navigate = useNavigate();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [search, setSearch] = useState<SearchFilters>({
    claimId: "",
    customerName: "",
    status: "",
  });

  /* ================= FETCH ALL ================= */
  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/claims`);
      setClaims(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
      setClaims([]);
    }
  };

  /* ================= SEARCH ================= */
  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const updated = { ...search, [e.target.name]: e.target.value };
    setSearch(updated);

    try {
      const res = await axios.get(`${API_URL}/api/claims/search`, {
        params: updated,
      });
      setClaims(res.data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen p-6 bg-gray-50 space-y-6">
      <Button onClick={() => navigate(-1)}>Back</Button>

      <h1 className="text-3xl font-bold">Insurance Claims</h1>

      {/* SEARCH */}
      <Card>
        <CardHeader>
          <CardTitle>Search Claims</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <input
            name="claimId"
            placeholder="Claim ID"
            className="border p-2 rounded"
            value={search.claimId}
            onChange={handleChange}
          />

          <input
            name="customerName"
            placeholder="Customer Name"
            className="border p-2 rounded"
            value={search.customerName}
            onChange={handleChange}
          />

          <select
            name="status"
            className="border p-2 rounded"
            value={search.status}
            onChange={handleChange}
          >
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Claim List</CardTitle>
        </CardHeader>
        <CardContent>
          {claims.length === 0 ? (
            <p className="text-center text-gray-500">No claims found</p>
          ) : (
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Claim ID</th>
                  <th className="border p-2">Customer</th>
                  <th className="border p-2">Policy</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((c) => (
                  <tr key={c.id}>
                    <td className="border p-2">{c.claimId}</td>
                    <td className="border p-2">{c.customerName}</td>
                    <td className="border p-2">{c.policy}</td>
                    <td className="border p-2">₹{c.claimAmount}</td>
                    <td className="border p-2">{c.status}</td>
                    <td className="border p-2 text-center">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/claims/view/${c.id}`)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
