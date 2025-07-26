// src/components/PagarServicios/PagarServiciosSteps.tsx
import { usePagarServicios } from "@/context/PagarServiciosContext";
import SeleccionarServicio from "./SeleccionarServicio";
import IngresarCuenta from "./IngresarCuenta";
import SeleccionarTarjeta from "./SeleccionarTarjeta";
import PagoExitoso from "./PagoExitoso";
import PagoFallido from "./PagoFallido";


export default function PagarServiciosSteps() {
  const { paso } = usePagarServicios();

  switch (paso) {
    case 1:
      return <SeleccionarServicio />;
    case 2:
      return <IngresarCuenta />;
    case 3:
      return <SeleccionarTarjeta />;
    case 4:
      return <PagoExitoso />;
    case 5:
      return <PagoFallido/>;
    default:
      return <SeleccionarServicio />;
  }
}
