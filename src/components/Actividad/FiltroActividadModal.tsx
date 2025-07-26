import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useActividadContext } from "@/context/ActividadContext";

// 🔁 Mapeos definidos fuera del componente para evitar errores de dependencias en useEffect
const mapeo: Record<string, string> = {
  Hoy: "hoy",
  Ayer: "ayer",
  "Última semana": "ultima_semana",
  "Últimos 15 días": "ultimos_15",
  "Último mes": "ultimo_mes",
  "Último año": "ultimos_3m",
};

const reverseMap: Record<string, string> = Object.entries(mapeo).reduce(
  (acc, [label, value]) => {
    acc[value] = label;
    return acc;
  },
  {} as Record<string, string>
);

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Modal = styled(motion.div)`
  background-color: white;
  width: 320px;
  border-radius: 12px;
  padding: 1.5rem;
  position: absolute;
  top: 100px;
  right: 40px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  cursor: pointer;
`;

const RadioCircle = styled.div<{ selected: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #c1fd35;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ selected }) => (selected ? "#c1fd35" : "transparent")};
`;

const ApplyButton = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  background-color: #c1fd35;
  color: black;
  font-weight: 600;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const periodos = [
  "Hoy",
  "Ayer",
  "Última semana",
  "Últimos 15 días",
  "Último mes",
  "Último año",
];

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (nuevoPeriodo: string) => void;
}

export const FiltroActividadModal = ({ visible, onClose, onSelect }: Props) => {
  const { filtros, setFiltros, setPagina } = useActividadContext();
  const [selected, setSelected] = useState("Último año");
  const [selectedTipo, setSelectedTipo] = useState("todos");

  useEffect(() => {
    if (visible) {
      if (filtros.periodo && reverseMap[filtros.periodo]) {
        setSelected(reverseMap[filtros.periodo]);
      }
      setSelectedTipo(filtros.tipo || "todos");
    }
  }, [visible, filtros.periodo, filtros.tipo]);

  const handleAplicar = () => {
  const periodoNormalizado = mapeo[selected] || null;
  if (periodoNormalizado) {
  onSelect(periodoNormalizado);
}
  setFiltros({
    ...filtros,
    periodo: periodoNormalizado,
    tipo: selectedTipo,
  });

  setPagina(1);
  onClose();
};


  const handleBorrarFiltros = () => {
  setSelected("Último año");
  setSelectedTipo("todos");
  setFiltros({
    ...filtros,
    periodo: null,
    tipo: "todos",
  });
  setPagina(1);
  onClose();
};


  return (
    <AnimatePresence>
      {visible && (
        <Overlay onClick={onClose}>
          <Modal
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Header>
              <span>Período</span>
              <span
                onClick={handleBorrarFiltros}
                style={{
                  fontWeight: 400,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Borrar filtros
              </span>
            </Header>

            <List>
              {periodos.map((p) => (
                <Item
                  key={p}
                  selected={selected === p}
                  onClick={() => setSelected(p)}
                >
                  {p}
                  <RadioCircle selected={selected === p} />
                </Item>
              ))}
            </List>
            <Header style={{ marginTop: "2rem" }}>
              <span>Tipo</span>
            </Header>

            <List>
              {["todos", "ingreso", "egreso"].map((tipo) => (
                <Item
                  key={tipo}
                  selected={selectedTipo === tipo}
                  onClick={() => setSelectedTipo(tipo)}
                >
                  {tipo === "todos"
                    ? "Todos"
                    : tipo === "ingreso"
                    ? "Ingresos"
                    : "Egresos"}
                  <RadioCircle selected={selectedTipo === tipo} />
                </Item>
              ))}
            </List>

            <ApplyButton onClick={handleAplicar}>Aplicar</ApplyButton>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
};
