import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BsList } from "react-icons/bs";
import { useUserInfo } from "@/hooks/useUserInfo";

interface HeaderProps {
  onlyLogo?: boolean;
  onOpenMobileMenu?: () => void;
}

const HeaderContainer = styled.header<{ isLogin?: boolean }>`
  width: 100%;
  height: 64px;
  background-color: ${({ isLogin }) => (isLogin ? "#C1FD35" : "#201F22")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 1rem;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  a {
    display: inline-flex;
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button<{ variant?: "outline" | "solid" }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  background-color: ${({ variant }) =>
    variant === "solid" ? "#C1FD35" : "transparent"};
  color: ${({ variant }) => (variant === "solid" ? "#201F22" : "#C1FD35")};
  border: 1px solid #c1fd35;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const MobileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #c1fd35;
  border: none;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  font-weight: bold;
  cursor: pointer;
`;

const DesktopUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  span:first-child {
    background-color: #c1fd35;
    color: #201f22;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    font-weight: bold;
  }

  span:last-child {
    color: #ffffff;
    font-size: 0.9rem;
  }
`;

export default function Header({ onlyLogo = false, onOpenMobileMenu }: HeaderProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const { fullName, initials } = useUserInfo();

  const isLoginPage = router.pathname === "/login";
  const isDashboard = router.pathname.startsWith("/dashboard");
  const logoSrc = isLoginPage ? "/assets/logo.svg" : "/assets/logo-ama.svg";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HeaderContainer isLogin={isLoginPage}>
      <LogoWrapper>
        <Link href="/">
          <Image
            src={logoSrc}
            alt="Digital Money House Logo"
            width={80}
            height={25}
            priority
          />
        </Link>
      </LogoWrapper>

      {!onlyLogo && (
        <>
          {isDashboard ? (
            isMobile ? (
              <MobileButton onClick={onOpenMobileMenu}>
                {initials}
                <BsList size={22} />
              </MobileButton>
            ) : (
              <DesktopUserInfo>
                <span>{initials}</span>
                <span>Hola, {fullName}</span>
              </DesktopUserInfo>
            )
          ) : (
            <NavButtons>
              <Link href="/login">
                <Button variant="outline">Ingresar</Button>
              </Link>
              <Link href="/register">
                <Button variant="solid">Crear cuenta</Button>
              </Link>
            </NavButtons>
          )}
        </>
      )}
    </HeaderContainer>
  );
}
