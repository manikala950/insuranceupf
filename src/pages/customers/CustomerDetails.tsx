import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/customers/${id}`)
      .then(res => res.json())
      .then(setCustomer);
  }, [id]);

  if (!customer) return null;

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
          <p><b>BankName:</b> {customer.bankname}</p>

         

          
        </CardContent>
      </Card>
    </div>
  );
}
