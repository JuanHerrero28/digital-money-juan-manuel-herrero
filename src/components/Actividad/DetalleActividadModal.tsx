import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled(motion.div)`
  background: #201f22;
  border-radius: 12px;
  padding: 2rem;
  color: white;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
`;

const Estado = styled.div`
  color: #c1fd35;
  font-weight: bold;
  font-size: 1rem;
  border: 1px solid #c1fd35;
  border-radius: 8px;
  padding: 0.25rem 0.75rem;
  margin-bottom: 1.5rem;
  width: fit-content;
`;

const Titulo = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const Monto = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #c1fd35;
  margin-bottom: 1rem;
`;

const Destinatario = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;

  span {
    font-weight: bold;
    color: #c1fd35;
  }
`;

const Dato = styled.div`
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 0.3rem;
`;

const Fecha = styled.div`
  font-size: 0.8rem;
  color: #aaa;
  margin-bottom: 1rem;
  text-align: left;
`;

const Botones = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
`;

const Boton = styled.button<{ primario?: boolean }>`
  flex: 1;
  background: ${({ primario }) => (primario ? "#c1fd35" : "#3a393e")};
  color: ${({ primario }) => (primario ? "#201f22" : "#fff")};
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

type DetalleActividad = {
  id: number;
  amount: number;
  dated: string;
  destination: string;
  origin: string;
  description?: string;
  type?: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  detalle: DetalleActividad | null;
};

export function DetalleActividadModal({ visible, onClose, detalle }: Props) {
  const comprobanteRef = useRef(null);
  if (!visible || !detalle) return null;

  const esPagoDeServicio = detalle.description?.toLowerCase().includes("pago de servicio");
  const nombreServicio = detalle.description?.replace("Pago de servicio: ", "").trim();

  const handleDownload = async () => {
    if (!comprobanteRef.current) return;

    const canvas = await html2canvas(comprobanteRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    const nombreArchivo = esPagoDeServicio
      ? `comprobante_pago_servicio_${detalle.id}.pdf`
      : `comprobante_${detalle.id}.pdf`;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(nombreArchivo);
  };

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContainer
          ref={comprobanteRef}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 150 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            <h3 style={{ margin: 0, color: "#c1fd35" }}>Digital Money House</h3>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#ccc" }}>
              Comprobante de operación
            </p>
          </div>

          <Fecha>
            Creada el{" "}
            {new Date(detalle.dated).toLocaleDateString("es-AR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            a las{" "}
            {new Date(detalle.dated).toLocaleTimeString("es-AR", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            hs.
          </Fecha>

          <Estado>
            {detalle.type === "Deposit" ? "Acreditado" : "Aprobada"}
          </Estado>

          <Titulo>
            {esPagoDeServicio
              ? "Pago de servicio"
              : detalle.type === "Deposit"
              ? "Depósito de dinero"
              : "Transferencia de dinero"}
          </Titulo>

          <Monto>
            {detalle.amount.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </Monto>

          <Destinatario>
            {esPagoDeServicio ? (
              <>
                Se abonó el servicio <span>{nombreServicio}</span>
              </>
            ) : detalle.type === "Deposit" ? (
              <>
                Recibiste desde <span>{detalle.origin}</span>
              </>
            ) : (
              <>
                Le transferiste a <span>{detalle.destination}</span>
              </>
            )}
          </Destinatario>

          <Dato>Número de operación: {detalle.id}</Dato>

          <Botones>
            <Boton onClick={onClose}>Ir al inicio</Boton>
            <Boton primario onClick={handleDownload}>
              Descargar comprobante
            </Boton>
          </Botones>
        </ModalContainer>
      </Overlay>
    </AnimatePresence>
  );
}
