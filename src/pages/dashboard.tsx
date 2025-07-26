// src/pages/dashboard.tsx
import styled from "styled-components";
import { useState } from "react";
import Footer from "@/components/common/Footer";
import { LogoutButton } from "@/components/common/LogoutButton";
import DashboardHome from "@/components/DashboardHome/DashboardHome";
import ActivityPage from "@/components/Actividad/ActivityPage";
import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import MisTarjetas from "@/components/MisTarjetas/MisTarjetas";
import CargarDineroSteps from "@/components/CargarDinero/CargarDineroSteps";
import Head from "next/head";
import Header from "@/components/common/Header";
import MobileSidebarMenu from "@/components/MobileSidebarMenu";
import { MoneyLoadProvider } from "@/context/MoneyLoadContext";
import { ActividadProvider } from "@/context/ActividadContext";
import { PagarServiciosProvider } from "@/context/PagarServiciosContext";
import PagarServiciosSteps from "@/components/PagoServicios/PagarServiciosSteps";

const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: rgb(248, 216, 35);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Sidebar = styled.aside`
  width: 200px;
  background-color: #c1fd35;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  a {
    color: black;
    font-weight: 500;
    text-decoration: none;
    transition: 0.2s ease-in-out;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Main = styled.main`
  background-color: #f8f8f8;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  width: 100%;
`;

const ButtonText = styled.button`
  background: none;
  border: none;
  color: rgb(78, 78, 78);
  font-weight: 300;
  font-size: 0.9rem;
  cursor: pointer;
  text-align: left;
  padding: 0;

  &:hover {
    color: rgb(14, 14, 14);
  }
`;

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const userName = "Mauricio Brito";

  return (
    <>
      <Head>
        <title>Dashboard | DMH</title>
      </Head>
      <ActividadProvider>
        <DashboardContainer>
          {/* PASAMOS EL CONTROL DEL MENÚ MOBILE */}
          <Header onOpenMobileMenu={() => setMenuAbierto(true)} />

          {/* SOLO EL DASHBOARD RENDERIZA EL MENÚ MOBILE */}
          {menuAbierto && (
            <MobileSidebarMenu
              userName={userName}
              onClose={() => setMenuAbierto(false)}
              setActiveSection={setActiveSection}
            />
          )}

          <ContentWrapper>
            {/* Menú lateral de escritorio */}
            <Sidebar>
              <ButtonText onClick={() => setActiveSection("inicio")}>
                Inicio
              </ButtonText>
              <ButtonText onClick={() => setActiveSection("actividad")}>
                Actividad
              </ButtonText>
              <ButtonText onClick={() => setActiveSection("perfil")}>
                Tu Perfil
              </ButtonText>
              <ButtonText onClick={() => setActiveSection("CargarDinero")}>
                Cargar dinero
              </ButtonText>
              <ButtonText onClick={() => setActiveSection("pagarServicios")}>
                Pagar Servicios
              </ButtonText>
              <ButtonText onClick={() => setActiveSection("tarjetas")}>
                Tarjetas
              </ButtonText>
              <LogoutButton />
            </Sidebar>

            <Main>
              {activeSection === "inicio" && (
                <DashboardHome setActiveSection={setActiveSection} />
              )}
              {activeSection === "actividad" && <ActivityPage />}
              {activeSection === "perfil" && (
                <ProfileInfo setActiveSection={setActiveSection} />
              )}
              {activeSection === "tarjetas" && <MisTarjetas />}
              {activeSection === "CargarDinero" && (
                <MoneyLoadProvider>
                  <CargarDineroSteps />
                </MoneyLoadProvider>
              )}
              {activeSection === "pagarServicios" && (
                <PagarServiciosProvider>
                  <PagarServiciosSteps />
                </PagarServiciosProvider>
              )}
            </Main>
          </ContentWrapper>

          <Footer />
        </DashboardContainer>
      </ActividadProvider>
    </>
  );
}
