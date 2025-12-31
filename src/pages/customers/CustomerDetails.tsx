import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Customer {
  id: number;
  name: string;
  email: string;
  number: string;
  state: string;
  district: string;
  mandal: string;
  bankname: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function CustomerDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/api/customers/${id}`)
      .then((res) => res.json())
      .then(setCustomer)
      .catch(() => alert("Failed to load customer"));
  }, [id]);

  if (!customer) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      <Button onClick={() => navigate(-1)}>Back</Button>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Customer Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p><b>Name:</b> {customer.name}</p>
          <p><b>Email:</b> {customer.email}</p>
          <p><b>Mobile:</b> {customer.number}</p>
          <p><b>State:</b> {customer.state}</p>
          <p><b>District:</b> {customer.district}</p>
          <p><b>Mandal:</b> {customer.mandal}</p>
          <p><b>Bank Name:</b> {customer.bankname}</p>
        </CardContent>
      </Card>
    </div>
  );
}
