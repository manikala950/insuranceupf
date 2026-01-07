import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ===================== TYPES ===================== */

interface Claim {
  id: number;
  claimId: string;
  customerName: string;
  claimAmount: number;
  status: string;
  claimType: "NORMAL" | "ACCIDENTAL";
}

interface SearchFilters {
  claimId: string;
  customerName: string;
  status: string;
}

/* ===================== COMPONENT ===================== */

export default function Claims() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [claims, setClaims] = useState<Claim[]>([]);
  const [search, setSearch] = useState<SearchFilters>({
    claimId: "",
    customerName: "",
    status: "",
  });

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    const res = await axios.get("http://localhost:8080/api/claims");
    setClaims(res.data || []);
  };
 


  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const updated = { ...search, [e.target.name]: e.target.value };
    setSearch(updated);

    const res = await axios.get(
      "http://localhost:8080/api/claims/search",
      { params: updated }
    );
    setClaims(res.data || []);
  };

  return (
  

      <div className={`transition-all ${collapsed ? "lg:pl-20" : "lg:pl-64"}`}>
       <Button onClick={()=>navigate(-1)}>
        BACK
       </Button>
        <main className="p-6 space-y-6">

          <h1 className="text-3xl font-bold">Insurance Claims</h1>

          {/* SEARCH */}
          <Card>
            <CardHeader>
              <CardTitle>Search Claims</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <input name="claimId" placeholder="Claim ID" className="border p-2" onChange={handleChange} />
              <input name="customerName" placeholder="Customer Name" className="border p-2" onChange={handleChange} />
              <select name="status" className="border p-2" onChange={handleChange}>
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
              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Claim ID</th>
                    <th className="border p-2">Customer</th>
                    <th className="border p-2">Type</th>
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
                      <td className="border p-2">{c.claimType}</td>
                      <td className="border p-2">₹{c.claimAmount}</td>
                      <td className="border p-2">{c.status}</td>
                      <td className="border p-2">
                        <Button
                          size="sm"
                          onClick={() => navigate(`/claims/${c.id}`)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

        </main>
      </div>
    
  );
}
