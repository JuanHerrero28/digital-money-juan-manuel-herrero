import styled from "styled-components";
import { useActividad } from "@/hooks/useActividad";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import { FiltroActividadModal } from "./FiltroActividadModal"; // Asegurate que el path sea correcto
import { DetalleActividadModal } from "./DetalleActividadModal";
import type { TransferenciaExtendida } from "@/hooks/useActividad";



const PageContainer = styled.div`
  padding: 2rem;
  background-color: #f2f1f1;
  min-height: 100vh;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: white;
  font-size: 1rem;
  margin-right: 1rem;
`;

const FilterButton = styled.button`
  background-color: #c1fd35;
  color: #201f22;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: bold;
`;

const Title = styled.h2`
  margin: 1rem 0;
  color: #201f22;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #c1fd35;
`;

const Description = styled.div`
font-size: 0.75rem;
  color: #201f22;
`;

const Right = styled.div`
  text-align: right;
`;

const Amount = styled.div<{ tipo: string }>`
font-size: 0.75rem;
  font-weight: bold;
  color: ${({ tipo }) => (tipo === "ingreso" ? "green" : "red")};
`;

const DateText = styled.div`
  font-size: 0.65rem;
  color: #7a7a7a;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 0.75rem;
  background-color: ${({ active }) => (active ? "#c1fd35" : "white")};
  border: 1px solid #ccc;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;

export default function ActivityPage() {
  const {
    actividades,
    isLoading,
    error,
    filtros,
    setFiltros,
    pagina,
    setPagina,
    totalPaginas,
  } = useActividad();

  const [showFiltroModal, setShowFiltroModal] = useState(false);
  const [, setPeriodoSeleccionado] = useState("Último año");
  const [detalleSeleccionado, setDetalleSeleccionado] = useState<TransferenciaExtendida | null>(null);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({ ...filtros, search: e.target.value });
  };

  const handleFiltroSeleccionado = (nuevoPeriodo: string) => {
    setPeriodoSeleccionado(nuevoPeriodo);
    setFiltros({ ...filtros, periodo: nuevoPeriodo }); // Podés mapear esto a fechas si querés
    setPagina(1);
    setShowFiltroModal(false);
  };

  return (
    <PageContainer>
      <TopBar>
        <SearchInput
          type="text"
          placeholder="Buscar en tu actividad"
          value={filtros.search}
          onChange={handleSearchChange}
        />
        <FilterButton onClick={() => setShowFiltroModal(true)}>
          <FiFilter /> Filtrar
        </FilterButton>
      </TopBar>

      <Title>Tu actividad</Title>

      {isLoading && <p>Cargando...</p>}
      {error && <p>Error al obtener las transferencias</p>}
      {!isLoading && actividades.length === 0 && (
        <p>No hay actividad registrada.</p>
      )}

      <List>
        {actividades.map((item) => (
          <Item key={item.id} onClick={() => setDetalleSeleccionado(item)}>
            <Left>
              <Circle />
              <Description>{item.descripcion}</Description>
            </Left>
            <Right>
              <Amount tipo={item.tipo}>
                {item.amount.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </Amount>
              <DateText>
                {new Date(item.dated).toLocaleDateString("es-AR", {
                  weekday: "long",
                })}
              </DateText>
            </Right>
          </Item>
        ))}
      </List>

      <Pagination>
        {Array.from({ length: totalPaginas }, (_, i) => (
          <PageButton
            key={i + 1}
            active={i + 1 === pagina}
            onClick={() => setPagina(i + 1)}
          >
            {i + 1}
          </PageButton>
        ))}
      </Pagination>

      {/* Modal de Filtros */}
      <FiltroActividadModal
        visible={showFiltroModal}
        onClose={() => setShowFiltroModal(false)}
        onSelect={handleFiltroSeleccionado}
      />
      <DetalleActividadModal
        visible={!!detalleSeleccionado}
        detalle={detalleSeleccionado}
        onClose={() => setDetalleSeleccionado(null)}
      />
    </PageContainer>
  );
}
