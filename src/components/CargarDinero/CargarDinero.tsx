import { MoneyLoadProvider } from "@/context/MoneyLoadContext";
import CargarDineroSteps from "./CargarDineroSteps";

export default function CargarDinero() {
  return (
    <MoneyLoadProvider>
      <CargarDineroSteps />
    </MoneyLoadProvider>
  );
}