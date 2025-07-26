// src/services/depositTransferService.ts
export const crearDeposito = async (
  token: string,
  accountId: number,
  body: {
    amount: number;
    dated: string;
    origin: string;
    destination: string;
  }
) => {
    console.log("📤 Enviando depósito:", body);
  const response = await fetch(
    `https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/deposits`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    }
  );
  if (!response.ok) {
    throw new Error("Error al crear el depósito");
  }
  return response.json();
};

export const crearTransferencia = async (
  token: string,
  accountId: number,
  body: {
    amount: number; // debe ser negativo
    dated: string;
    destination: string;
    origin: string;
  }
) => {
  // ⚠️ Reordenamos las propiedades
  const orderedBody = {
    amount: body.amount,
    dated: body.dated,
    destination: body.destination,
    origin: body.origin,
  };
  console.log("📤 Enviando transferencia:", body);

  const response = await fetch(
    `https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/transferences`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(orderedBody),
    }
  );

  if (!response.ok) {
    throw new Error("Error al crear la transferencia");
  }

  return response.json();
};

export const getTransfers = async (token: string, accountId: number) => {
  const response = await fetch(
    `https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/transferences`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  if (!response.ok) throw new Error("Error al obtener las transferencias");

  const res = await response.json();
  console.log("📦 Transferencias recibidas desde API:", res);
  return res;
};


