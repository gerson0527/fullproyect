// src/components/LoginForm.tsx
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast"
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { AuthService } from "../../../../services/auth.service";

export function LoginForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await AuthService.login(formData);
      console.log(userData);
      if (userData.success === false) {
        toast({
          title: "Error de autenticación",
          description: userData.message,
          variant: "destructive"
        });
        // Eliminamos el navigate("/") aquí ya que no tiene sentido redirigir en caso de error
        setIsLoading(false);
        return; 
      }
      
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a la aplicación",
        variant: "success"
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      toast({
        title: "Error de autenticación",
        description: error instanceof Error ? error.message : 'Credenciales incorrectas',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Usuario</Label>
              <Input 
                id="username" 
                placeholder="Ingrese su usuario" 
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Ingrese su contraseña" 
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button 
              className="w-full" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Ingresar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}