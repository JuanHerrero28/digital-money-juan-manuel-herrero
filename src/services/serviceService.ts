// src/services/serviceService.ts

const API_URL = "https://digitalmoney.digitalhouse.com";

/**
 * Trae todos los servicios disponibles
 */
export const obtenerTodosLosServicios = async () => {
  const response = await fetch(`${API_URL}/service`);
  if (!response.ok) throw new Error("Error al obtener los servicios");
  return response.json();
};

/**
 * Busca servicios por texto (query)
 */
export const buscarServicios = async (query: string) => {
  const response = await fetch(`${API_URL}/service/${query}`);
  if (!response.ok) throw new Error("Error al buscar servicios");
  return response.json();
};

/**
 * Trae un servicio por su ID
 */
export const obtenerServicioPorId = async (id: number) => {
  const response = await fetch(`${API_URL}/service/${id}`);
  if (!response.ok) throw new Error("Error al obtener el servicio");
  return response.json();
};
