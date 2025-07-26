// src/context/PagarServiciosContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface PagarServiciosContextType {
  paso: number;
  setPaso: (paso: number) => void;
  avanzarPaso: () => void;
  volverPaso: () => void;

  servicioId: number | null;
  setServicioId: (id: number) => void;

  servicioNombre: string;
  setServicioNombre: (nombre: string) => void;

  cuenta: string;
  setCuenta: (cuenta: string) => void;

  monto: number;
  setMonto: (monto: number) => void;

  tarjetaId: number | null;
  setTarjetaId: (id: number) => void;

  resetFlujo: () => void;
}

const PagarServiciosContext = createContext<PagarServiciosContextType | undefined>(undefined);

export const PagarServiciosProvider = ({ children }: { children: ReactNode }) => {
  const [paso, setPaso] = useState(1);
  const [servicioId, setServicioId] = useState<number | null>(null);
  const [servicioNombre, setServicioNombre] = useState("");
  const [cuenta, setCuenta] = useState("");
  const [monto, setMonto] = useState(0);
  const [tarjetaId, setTarjetaId] = useState<number | null>(null);

  const avanzarPaso = () => setPaso((prev) => prev + 1);
  const volverPaso = () => setPaso((prev) => Math.max(prev - 1, 1));
  const resetFlujo = () => {
    setPaso(1);
    setServicioId(null);
    setServicioNombre("");
    setCuenta("");
    setMonto(0);
    setTarjetaId(null);
  };

  return (
    <PagarServiciosContext.Provider
      value={{
        paso,
        setPaso,
        avanzarPaso,
        volverPaso,
        servicioId,
        setServicioId,
        servicioNombre,
        setServicioNombre,
        cuenta,
        setCuenta,
        monto,
        setMonto,
        tarjetaId,
        setTarjetaId,
        resetFlujo,
      }}
    >
      {children}
    </PagarServiciosContext.Provider>
  );
};

export const usePagarServicios = () => {
  const context = useContext(PagarServiciosContext);
  if (!context) {
    throw new Error("usePagarServicios debe usarse dentro de PagarServiciosProvider");
  }
  return context;
};
