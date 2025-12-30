import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await signIn(email, password);

    if (!res.success) {
      setError(res.message);
      return;
    }

    // Redirect based on role
    if (res.role === "admin") navigate("/admin");
    if (res.role === "agent") navigate("/agent");
    if (res.role === "user") navigate("/customer");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md p-6 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">UP Life Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>

          <div className="text-xs text-muted-foreground mt-4">
            <p><b>Admin:</b> admin@uplife.com / admin123</p>
            <p><b>Agent:</b> agent@uplife.com / agent123</p>
            <p><b>User:</b> user@uplife.com / user123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
