import { createContext, useContext, useState, ReactNode } from "react";

type FiltrosActividad = {
  search: string;
  periodo: string | null;
  tipo: string; // "todos", "ingreso", "egreso"
};

type ActividadContextType = {
  filtros: FiltrosActividad;
  setFiltros: (f: FiltrosActividad) => void;
  pagina: number;
  setPagina: (p: number) => void;
};

const ActividadContext = createContext<ActividadContextType | undefined>(undefined);

export const ActividadProvider = ({ children }: { children: ReactNode }) => {
  const [filtros, setFiltros] = useState<FiltrosActividad>({
    search: "",
    periodo: "Último año",
    tipo: "todos",
  });

  const [pagina, setPagina] = useState(1);

  return (
    <ActividadContext.Provider
      value={{
        filtros,
        setFiltros,
        pagina,
        setPagina,
      }}
    >
      {children}
    </ActividadContext.Provider>
  );
};

export const useActividadContext = () => {
  const context = useContext(ActividadContext);
  if (!context) {
    throw new Error("useActividadContext debe usarse dentro de un ActividadProvider");
  }
  return context;
};