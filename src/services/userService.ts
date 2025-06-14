import { User } from "@/types/User";

// src/services/userService.ts
export const getUserById = async (userId: string, token: string) => {
    try {
      const res = await fetch(`https://digitalmoney.digitalhouse.com/api/users/${userId}`, {
        headers: {
          Authorization: token, // sin Bearer
        },
      });
  
      if (!res.ok) {
        if (res.status === 401 || res.status === 404) {
          // Token expirado o usuario no encontrado: limpiamos y salimos sin romper
          localStorage.removeItem("token");
          
          return null;
        }
  
        // Otros errores sí deben alertar al desarrollador
        console.error("Status inesperado:", res.status);
        return null;
      }
  
      return await res.json();
    } catch (err) {
      console.error("Error de red al obtener el usuario:", err);
      return null;
    }
  };

  export const updateUserById = async (
    userId: string,
    token: string,
    data: User
  ): Promise<User> => {
    const res = await fetch(`https://digitalmoney.digitalhouse.com/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // sin 'Bearer'
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      throw new Error("Error al actualizar el usuario");
    }
  
    return await res.json();
  };

  
  