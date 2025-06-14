// src/services/accountService.ts

export const getAccount = async (token: string) => {
    try {
      const res = await fetch(`https://digitalmoney.digitalhouse.com/api/account`, {
        headers: {
          Authorization: token,
        },
      });
  
      if (!res.ok) {
        console.error("Error al obtener la cuenta", res.status);
        return null;
      }
  
      return await res.json();
    } catch (err) {
      console.error("Error de red al obtener cuenta:", err);
      return null;
    }
  };
  
  export const updateAlias = async (accountId: number, token: string, alias: string) => {
    try {
      const res = await fetch(`https://digitalmoney.digitalhouse.com/api/accounts/${accountId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ alias }),
      });
  
      if (!res.ok) {
        throw new Error("Error al actualizar el alias");
      }
  
      return await res.json();
    } catch (err) {
      console.error("Error al hacer PATCH del alias:", err);
      throw err;
    }
  };