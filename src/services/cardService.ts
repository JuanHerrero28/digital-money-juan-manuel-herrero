
export const crearTarjeta = async (
  token: string,
  accountId: number,
  tarjeta: {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
  }
) => {
  const body = {
    number_id: Number(tarjeta.number),
    first_last_name: tarjeta.name,
    expiration_date: `${tarjeta.expiry.slice(0, 2)}/20${tarjeta.expiry.slice(2)}`,
    cod: Number(tarjeta.cvc),
  };

  const response = await fetch(
    `https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/cards`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    console.error("❌ Error al crear tarjeta:");
    console.error("Status:", response.status);
    console.error("Response:", responseData);
    throw new Error(`No se pudo crear la tarjeta (${response.status})`);
  }

  return responseData;
};

export const obtenerTarjetas = async (token: string, accountId: number) => {
  const res = await fetch(
    `https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/cards`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  if (res.status === 401) throw new Error("Token expirado o inválido");
  if (!res.ok) throw new Error("Error al obtener tarjetas");

  const data = await res.json();

  // Forzamos que siempre sea un array
  return Array.isArray(data) ? data : [];
};


export const eliminarTarjeta = async (token: string, accountId: number, cardId: number) => {
  const res = await fetch(`https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) throw new Error("Error al eliminar tarjeta");

  return true;
};
