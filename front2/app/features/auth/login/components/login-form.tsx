import { useNavigate } from "react-router";
import { toast } from "sonner"; // Importa solo la función toast
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";

export function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulación de autenticación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Toast de éxito
      toast.success("Inicio de sesión exitoso", {
        description: "Redirigiendo al dashboard...",
      });

      // Redirección después de 1.5 segundos
      setTimeout(() => {
        navigate("/dashboard"); // Forma estándar para react-router
      }, 1500);
    } catch (error) {
      // Toast de error
      toast.error("Error de autenticación", {
        description: "Credenciales incorrectas",
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
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Ingrese su contraseña" 
                required
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