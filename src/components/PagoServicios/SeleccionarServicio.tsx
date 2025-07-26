import { useServicios } from "@/hooks/useServicios";
import { usePagarServicios } from "@/context/PagarServiciosContext";
import { obtenerServicioPorId } from "@/services/serviceService"; // ✅
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";


const Container = styled.div`
  background-color: white;
  min-height: 350px;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #c1fd35;
  }
`;

const ServiceList = styled.ul`
  list-style: none;
  margin-top: 2rem;
  padding: 0;
`;

const ServiceItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

const Button = styled.button`
  background-color: #c1fd35;
  color: #201f22;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const Label = styled.h3`
  font-size: 1.5rem;
  color: #201f22;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`;

const Icon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: #555;
`;

export default function SeleccionarServicio() {
  const { setServicioId, setServicioNombre, setMonto, avanzarPaso } =
    usePagarServicios();

  const [search, setSearch] = useState("");

  const { data: servicios, isLoading, error } = useServicios();

  const handleSelect = async (id: number, name: string) => {
    try {
      const detalle = await obtenerServicioPorId(id);
      

      const monto = Number(detalle.invoice_value);
      
      if (isNaN(monto)) {
        console.error(
          "❌ Monto no válido (no es un número):",
          detalle.invoice_value
        );
        return;
      }

      if (monto <= 0) {
        toast.info("Este servicio no tiene deuda para pagar.");
        return;
      }

      setServicioId(id);
      setServicioNombre(name);
      setMonto(monto);
      

      setTimeout(() => {
        avanzarPaso();
      }, 0);
    } catch (error) {
      console.error("❌ Error al obtener el detalle del servicio:", error);
    }
  };

  const serviciosFiltrados = servicios
    ?.filter((s: any) => s.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 10);

  return (
    <Container>
      <SearchWrapper>
        <Icon />
        <SearchInput
          placeholder="Buscá entre más de 5.000 empresas"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchWrapper>
      <Label>Más recientes</Label>
      {isLoading && <p>Cargando servicios...</p>}
      {error && <p>Ocurrió un error</p>}
      <ServiceList>
        {serviciosFiltrados?.slice(0, 10).map((servicio: any) => (
          <ServiceItem key={servicio.id}>
            <span>{servicio.name}</span>
            <Button onClick={() => handleSelect(servicio.id, servicio.name)}>
              Seleccionar
            </Button>
          </ServiceItem>
        ))}
      </ServiceList>
    </Container>
  );
}
