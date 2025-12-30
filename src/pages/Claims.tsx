import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


/* ===================== TYPES ===================== */

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

/* ===================== COMPONENT ===================== */

export default function Claims() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [claims, setClaims] = useState<Claim[]>([]);
  const [search, setSearch] = useState<SearchFilters>({
    claimId: "",
    customerName: "",
    status: "",
  });

  /* ===================== FETCH ALL CLAIMS ===================== */

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/claims`);

      if (Array.isArray(res.data)) setClaims(res.data);
      else setClaims([]);
    } catch (error) {
      console.error("Failed to fetch claims", error);
    }
  };

  /* ===================== SEARCH CLAIMS ===================== */

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const updated = { ...search, [e.target.name]: e.target.value };
    setSearch(updated);

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/claims/search`, {
        params: updated,
      });

      if (Array.isArray(res.data)) setClaims(res.data);
      else setClaims([]);
    } catch (error) {
      console.error("Search failed", error);
    }
  };
  const navigate=useNavigate()

  /* ===================== UI ===================== */

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
    <Button onClick={()=>navigate(-1)}>
  BACK
    </Button>

      {/* Layout */}
      <div className={`transition-all duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-64"}`}>
        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold">Insurance Claims</h1>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Search Claims</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>Claim List</CardTitle>
            </CardHeader>

            <CardContent>
              {claims.length === 0 ? (
                <p className="text-center text-muted-foreground">No claims found</p>
              ) : (
                <table className="w-full border-collapse border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2">Claim ID</th>
                      <th className="border p-2">Customer</th>
                      <th className="border p-2">Policy</th>
                      <th className="border p-2">Amount</th>
                      <th className="border p-2">Status</th>
                      <th className="border p-2 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {claims.map((c) => (
                      <tr key={c.id} className="border-b">
                        <td className="p-2">{c.claimId}</td>
                        <td className="p-2">{c.customerName}</td>
                        <td className="p-2">{c.policy}</td>
                        <td className="p-2">₹{c.claimAmount}</td>
                        <td className="p-2">{c.status}</td>
                        <td className="p-2 text-center">
                          <Button size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
