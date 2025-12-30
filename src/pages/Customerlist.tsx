import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, Eye, Trash2, Search } from "lucide-react";


/* ================= TYPES ================= */
interface Customer {
  custId: string;
  name: string;
  email: string;
  number: number;
  state: string;
  district: string;
  mandal: string;
}

export default function CustomersList() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filtered, setFiltered] = useState<Customer[]>([]);

  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [mandals, setMandals] = useState<string[]>([]);

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [mandal, setMandal] = useState("");

  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/customers/all`)
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
        setFiltered(data);
      });

    fetch(`${process.env.REACT_APP_API_URL}/locations/states`)
      .then(res => res.json())
      .then(setStates);
  }, []);

  /* ================= FILTER ================= */
  const applyFilter = (
    s = state,
    d = district,
    m = mandal,
    id = searchId,
    name = searchName
  ) => {
    let result = customers;

    if (s) result = result.filter(c => c.state === s);
    if (d) result = result.filter(c => c.district === d);
    if (m) result = result.filter(c => c.mandal === m);
    if (id) result = result.filter(c =>
      c.custId.toLowerCase().includes(id.toLowerCase())
    );
    if (name) result = result.filter(c =>
      c.name.toLowerCase().includes(name.toLowerCase())
    );

    setFiltered(result);
  };

  /* ================= DROPDOWNS ================= */
  const handleState = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setState(value);
    setDistrict("");
    setMandal("");
    setMandals([]);

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/locations/districts?state=${value}`
    );
    setDistricts(await res.json());

    applyFilter(value, "", "", searchId, searchName);
  };

  const handleDistrict = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDistrict(value);
    setMandal("");

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/locations/mandals?state=${state}&district=${value}`
    );
    setMandals(await res.json());

    applyFilter(state, value, "", searchId, searchName);
  };

  const handleMandal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setMandal(value);
    applyFilter(state, district, value, searchId, searchName);
  };

  /* ================= DELETE ================= */
  const deleteCustomer = async (id: string) => {
    if (!confirm("Delete customer?")) return;

    await fetch(`${process.env.REACT_APP_API_URL}/api/customers/${id}`, { method: "DELETE" });

    const updated = customers.filter(c => c.custId !== id);
    setCustomers(updated);
    setFiltered(updated);
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 space-y-6">
      <Button onClick={() => navigate(-1)}>BACK</Button>

      {/* ================= FILTER CARD ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Customers</CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-5 gap-4">
          <input
            className="border rounded-md p-2"
            placeholder="Customer ID"
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
          />

          <input
            className="border rounded-md p-2"
            placeholder="Customer Name"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
          />

          <select className="border rounded-md p-2" value={state} onChange={handleState}>
            <option value="">Select State</option>
            {states.map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            className="border rounded-md p-2"
            value={district}
            onChange={handleDistrict}
            disabled={!state}
          >
            <option value="">Select District</option>
            {districts.map(d => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <select
            className="border rounded-md p-2"
            value={mandal}
            onChange={handleMandal}
            disabled={!district}
          >
            <option value="">Select Mandal</option>
            {mandals.map(m => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <Button onClick={() => applyFilter()} className="md:col-span-2">
            <Search className="w-4 h-4 mr-1" /> Search
          </Button>

          <Button
            variant="outline"
            onClick={() => setFiltered(customers)}
            className="md:col-span-3"
          >
            Reset
          </Button>
        </CardContent>
      </Card>

      {/* ================= TABLE ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg">
            <thead className="bg-muted text-left">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">State</th>
                <th className="p-3">District</th>
                <th className="p-3">Mandal</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length ? (
                filtered.map(c => (
                  <tr
                    key={c.custId}
                    className="border-t hover:bg-muted/30 transition"
                  >
                    <td className="p-3">{c.custId}</td>
                    <td className="p-3 font-medium">{c.name}</td>
                    <td className="p-3">{c.state}</td>
                    <td className="p-3">{c.district}</td>
                    <td className="p-3">{c.mandal}</td>
                    <td className="p-3 flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(`/customers/view/${c.custId}`)
                        }
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(`/customers/edit/${c.custId}`)
                        }
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteCustomer(c.custId)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-500"
                  >
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
