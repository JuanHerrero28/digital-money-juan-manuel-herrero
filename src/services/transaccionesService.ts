// src/services/transaccionesService.ts

export const crearTransaccion = async (
  token: string,
  accountId: number,
  body: {
    amount: number;
    dated: string;
    description: string;
  }
) => {
  // Validación del monto
  const montoValido = Number(body.amount);
if (isNaN(montoValido) || montoValido === 0) {
  console.error("❌ Monto inválido. No puede ser cero o no numérico.");
  throw new Error("Monto inválido. No puede ser cero o no numérico.");
}

  const orderedBody = {
    amount: -Math.abs(montoValido), // Asegura que sea negativo
    dated: body.dated,
    description: body.description,
  };

  console.log("📤 Enviando transacción:", orderedBody);

  const response = await fetch(
    `https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/transactions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // sin "Bearer"
      },
      body: JSON.stringify(orderedBody),
    }
  );

  if (!response.ok) {
    const errorRes = await response.json();
    console.error("❌ Error al crear transacción:", errorRes);
    throw new Error("Error al crear la transacción");
  }

  return response.json();
};


export const getTransacciones = async (token: string, accountId: number) => {
  const response = await fetch(
    `https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/activity`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("❌ Error al obtener transacciones:", errorData);
    throw new Error("Error al obtener las transacciones");
  }

  const res = await response.json();
  console.log("📦 Transacciones recibidas desde API:", res);
  return res;
};

export const getTransaccionPorId = async (
  token: string,
  accountId: number,
  transactionId: number
) => {
  const response = await fetch(
    `https://digitalmoney.digitalhouse.com/api/accounts/${accountId}/transactions/${transactionId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("❌ Error al obtener transacción por ID:", errorData);
    throw new Error("Error al obtener la transacción por ID");
  }

  const data = await response.json();
  console.log("📦 Transacción individual:", data);
  return data;
};
