import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";


interface FormState {
  Name: string;
  email: string;
  Number: string;
  Aadhaar: string;
  Pan: string;
  Address: string;
}

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    Name: "",
    email: "",
    Number: "",
    Aadhaar: "",
    Pan: "",
    Address: "",
  });

  const [loading, setLoading] = useState(true);

  // FIXED: useCallback to avoid ESLint warning
  const loadCustomer = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/customers/${id}`);
      const data = await res.json();
      setForm({
        Name: data.Name,
        email: data.email,
        Number: String(data.Number),
        Aadhaar: String(data.Aadhaar),
        Pan: data.Pan,
        Address: data.Address,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load customer");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCustomer();
  }, [loadCustomer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Customer updated successfully!");
      navigate("/customerslist");
    } catch (err) {
      console.error(err);
      alert("Failed to update customer");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-8 px-4 bg-muted/20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-primary font-medium self-start max-w-2xl w-full"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Customers
      </button>

      <Card className="w-full max-w-2xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-primary">
            Edit Customer ({id})
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
          >
            <Input name="Name" value={form.Name} onChange={handleChange} required placeholder="Full Name" />
            <Input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" />
            <Input name="Number" value={form.Number} maxLength={10} onChange={handleChange} required placeholder="Mobile" />
            <Input name="Aadhaar" value={form.Aadhaar} maxLength={12} onChange={handleChange} required placeholder="Aadhaar" />
            <Input name="Pan" value={form.Pan} maxLength={10} onChange={handleChange} required placeholder="PAN" />

            <div className="col-span-2">
              <Input name="Address" value={form.Address} onChange={handleChange} required placeholder="Address" />
            </div>

            <div className="col-span-2 mt-2">
              <Button type="submit" className="w-full h-11 text-md">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
