// src/hooks/useServicios.ts
import { useQuery } from "@tanstack/react-query";
import {
  obtenerTodosLosServicios,
  buscarServicios,
  obtenerServicioPorId,
} from "@/services/serviceService";

export const useServicios = () =>
  useQuery({
    queryKey: ["servicios"],
    queryFn: obtenerTodosLosServicios,
  });
  
export const useBuscarServicios = (query: string) =>
  useQuery({
    queryKey: ["buscarServicios", query],
    queryFn: () => buscarServicios(query),
    enabled: !!query,
  });

export const useServicioPorId = (id: number) =>
  useQuery({
    queryKey: ["servicio", id],
    queryFn: () => obtenerServicioPorId(id),
    enabled: !!id,
  });
