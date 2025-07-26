import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getTransacciones } from "@/services/transaccionesService";
import { useAtomValue } from "jotai";
import { accountIdAtom, tokenAtom } from "@/state/sessionAtoms";
import { depositsAtom } from "@/state/depositAtoms";
import { useActividadContext } from "@/context/ActividadContext";

type Transferencia = {
  id: number;
  amount: number;
  origin: string;
  destination: string;
  dated: string;
  type?: string;
  description?: string;
};

export type TransferenciaExtendida = Transferencia & {
  fecha: Date;
  tipo: "ingreso" | "egreso";
  descripcion: string;
};

export function useActividad() {
  const token = useAtomValue(tokenAtom);
  const accountId = useAtomValue(accountIdAtom);
  const deposits = useAtomValue(depositsAtom);
  const { filtros, setFiltros, pagina, setPagina } = useActividadContext();
  const porPagina = 10;

  const { data: transaccionesData, isLoading, error } = useQuery<Transferencia[]>({
    queryKey: ["actividad", accountId],
    queryFn: () => getTransacciones(token!, accountId!),
    enabled: !!token && !!accountId,
  });

  const actividades = useMemo(() => {
    if (!transaccionesData && deposits.length === 0) return [];

    const allData = transaccionesData ?? [];

    const filtrarPorPeriodo = (fecha: Date): boolean => {
      if (!filtros.periodo) return true;

      const hoy = new Date();
      const dia = 1000 * 60 * 60 * 24;

      switch (filtros.periodo) {
        case "hoy":
          return fecha.toDateString() === hoy.toDateString();
        case "ayer":
          return fecha.toDateString() === new Date(hoy.getTime() - dia).toDateString();
        case "ultima_semana":
          return fecha > new Date(hoy.getTime() - dia * 7);
        case "ultimos_15":
          return fecha > new Date(hoy.getTime() - dia * 15);
        case "ultimo_mes":
          return fecha > new Date(hoy.setMonth(hoy.getMonth() - 1));
        case "ultimos_3m":
          return fecha > new Date(hoy.setMonth(hoy.getMonth() - 3));
        default:
          return true;
      }
    };

    return allData
      .map((t): TransferenciaExtendida => {
        const tipo = t.amount >= 0 ? "ingreso" : "egreso";
        let descripcion = "";

        if (t.type === "Deposit") {
          descripcion = `Depósito desde ${t.origin}`;
        } else if (t.type === "Transfer") {
          descripcion = tipo === "ingreso"
            ? `Te transfirieron desde ${t.origin}`
            : `Transferiste a ${t.destination}`;
        } else if (t.description?.startsWith("Pago de servicio:")) {
          descripcion = t.description;
        } else {
          descripcion = "Actividad desconocida";
        }

        return {
          ...t,
          fecha: new Date(t.dated),
          tipo,
          descripcion,
        };
      })
      .filter((t) => {
        const coincideTexto = t.descripcion.toLowerCase().includes(filtros.search.toLowerCase());
        const coincideTipo = filtros.tipo === "todos" || filtros.tipo === t.tipo;
        const coincideFecha = filtrarPorPeriodo(t.fecha);
        return coincideTexto && coincideTipo && coincideFecha;
      })
      .sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
  }, [transaccionesData, deposits, filtros]);

  const totalPaginas = Math.ceil(actividades.length / porPagina);
  const actividadesPagina = actividades.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina
  );

  return {
    actividades: actividadesPagina,
    isLoading,
    error,
    filtros,
    setFiltros,
    pagina,
    setPagina,
    totalPaginas,
  };
}
