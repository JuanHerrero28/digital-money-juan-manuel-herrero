import styled from "styled-components";
import { BsX } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { LogoutButton } from "./common/LogoutButton";
import { useUserInfo } from "@/hooks/useUserInfo";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  justify-content: flex-start;
`;

const AnimatedMenuContainer = styled(motion.div)`
  width: 240px;
  height: 100%;
  background-color: #c1fd35;
  display: flex;
  flex-direction: column;
`;

const MenuContainer = styled.div`
  width: 240px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const UserHeader = styled.div`
  background-color: #201f22;
  min-height: 120px;
  color: #c1fd35;
  padding: 1rem;
  font-weight: bold;
  font-size: 0.85rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #c1fd35;
  font-size: 1rem;
  cursor: pointer;
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.8rem;
`;

const ButtonText = styled.button<{ $active?: boolean; $secondary?: boolean }>`
  background: none;
  border: none;
  text-align: left;
  font-size: 0.9rem;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  color: ${({ $secondary }) => ($secondary ? "#201f22" : "#000")};
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

type Props = {
  userName: string;
  onClose: () => void;
  setActiveSection: (section: string) => void;
};

export default function MobileSidebarMenu({
  
  onClose,
  setActiveSection,
}: Props) {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    onClose(); // Cierra el menú
  };

  const { fullName } = useUserInfo();

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleOutsideClick}
      >
        <AnimatedMenuContainer
          initial={{ x: -240 }}
          animate={{ x: 0 }}
          exit={{ x: -240 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <MenuContainer>
            <UserHeader>
              <span>Hola, {fullName}</span>
              <CloseButton onClick={onClose}>
                <BsX size={20} />
              </CloseButton>
            </UserHeader>
            <NavList>
              <ButtonText onClick={() => handleSectionClick("inicio")}>
                Inicio
              </ButtonText>
              <ButtonText onClick={() => handleSectionClick("actividad")}>
                Actividad
              </ButtonText>
              <ButtonText onClick={() => handleSectionClick("CargarDinero")}>
                Cargar dinero
              </ButtonText>
              <ButtonText onClick={() => handleSectionClick("perfil")}>
                Tu Perfil
              </ButtonText>
              <ButtonText onClick={() => handleSectionClick("pagarServicios")}>
                Pagar Servicios
              </ButtonText>
              <ButtonText onClick={() => handleSectionClick("tarjetas")}>
                Tarjetas
              </ButtonText>
              <LogoutButton />
            </NavList>
          </MenuContainer>
        </AnimatedMenuContainer>
      </Overlay>
    </AnimatePresence>
  );
}
