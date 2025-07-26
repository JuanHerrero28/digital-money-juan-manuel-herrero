import { useEffect, useState } from "react";
import styled from "styled-components";
import { usePagarServicios } from "@/context/PagarServiciosContext";
import { useAtom } from "jotai";
import { accountIdAtom, tokenAtom } from "@/state/sessionAtoms";
import { obtenerTarjetas } from "@/services/cardService";
import { crearTransaccion } from "@/services/transaccionesService";
import { toast } from "react-toastify";
import { Tarjeta } from "@/types/Tarjeta";

const Container = styled.div`
  background-color: white;
  min-height: 350px;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
`;

const Header = styled.div`
  background-color: #201f22;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ServicioNombre = styled.span`
  color: #c1fd35;
  font-size: 1.1rem;
  font-weight: bold;
`;

const Monto = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const ListaTarjetas = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TarjetaItem = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
`;

const Izquierda = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const PuntoVerde = styled.div`
  width: 14px;
  height: 14px;
  background-color: #c1fd35;
  border-radius: 50%;
`;

const TextoTarjeta = styled.span`
  font-size: 1rem;
  color: #201f22;
`;

const Radio = styled.input``;

const BotonPagar = styled.button`
  background-color: #c1fd35;
  color: #201f22;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  float: right;
  margin-top: 2rem;
  cursor: pointer;
`;

export default function SeleccionarTarjeta() {
  const { servicioNombre, monto, tarjetaId, setTarjetaId, avanzarPaso, setPaso } =
    usePagarServicios();

  const [accountId] = useAtom(accountIdAtom);
  const [token] = useAtom(tokenAtom);
  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([]);

  // 🐞 LOG: Al montar el componente
  console.log("🔄 Monto recibido desde contexto en SeleccionarTarjeta:", monto);

  useEffect(() => {
    const fetchTarjetas = async () => {
      if (!token || !accountId) return;

      try {
        const data = await obtenerTarjetas(token, accountId);
        setTarjetas(data);
      } catch {
        toast.error("No se pudieron cargar las tarjetas.");
      }
    };

    fetchTarjetas();
  }, [accountId, token]);

  const handlePago = async () => {
    // 🐞 LOG: Justo antes de validar
    console.log("🧾 Monto recibido en handlePago:", monto);

    if (!tarjetaId) {
      toast.error("Seleccioná una tarjeta para continuar.");
      return;
    }

    if (!token || !accountId) {
      toast.error("Sesión no válida.");
      return;
    }

    const montoValido = Number(monto);

    // 🐞 LOG: Validación de número
    console.log("🔢 Monto convertido a número:", montoValido);

    if (isNaN(montoValido) || montoValido <= 0) {
      toast.error("El monto debe ser mayor a cero.");
      return;
    }

    try {
      await crearTransaccion(token, accountId, {
        amount: -montoValido,
        dated: new Date().toISOString(),
        description: `Pago de servicio: ${servicioNombre}`,
      });

      toast.success("Pago realizado con éxito.");
      avanzarPaso();
    } catch {
      toast.error("Hubo un problema al realizar el pago.");
      setPaso(5);
    }
  };

  return (
    <Container>
      <Box>
        <Header>
          <ServicioNombre>{servicioNombre}</ServicioNombre>
          <Monto>${(typeof monto === "number" ? monto : 0).toFixed(2)}</Monto>
        </Header>

        <h4 style={{ marginTop: "2rem", color: "#201f22" }}>Tus tarjetas</h4>

        <ListaTarjetas>
          {tarjetas.map((tarjeta) => (
            <TarjetaItem key={tarjeta.id}>
              <Izquierda>
                <PuntoVerde />
                <TextoTarjeta>
                  Terminada en {String(tarjeta.number_id).slice(-4)}
                </TextoTarjeta>
              </Izquierda>
              <Radio
                type="radio"
                name="tarjeta"
                checked={tarjetaId === tarjeta.id}
                onChange={() => setTarjetaId(tarjeta.id)}
              />
            </TarjetaItem>
          ))}
        </ListaTarjetas>

        <BotonPagar onClick={handlePago}>Pagar</BotonPagar>
      </Box>
    </Container>
  );
}

