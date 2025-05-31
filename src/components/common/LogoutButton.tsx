// src/components/LogoutButton.tsx
import { useLogout } from '@/hooks/useLogout';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useState } from 'react';

const LogoutText = styled.button`
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

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 320px;
  max-width: 100%;
  text-align: center;
`;

const ModalTitle = styled.h3`
  font-size: 12pt;
  margin-bottom: 1rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
`;

const ModalButton = styled.button<{ variant?: 'cancel' | 'confirm' }>`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background-color: ${({ variant }) =>
    variant === 'cancel' ? '#f2f2f2' : '#C1FD35'};
  color: ${({ variant }) =>
    variant === 'cancel' ? '#333' : '#201F22'};

  &:hover {
    opacity: 0.9;
  }
`;

export const LogoutButton = () => {
  const { mutate: logout } = useLogout();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutConfirm = () => {
    logout(undefined, {
      onSuccess: () => {
        setShowModal(false);
        router.push('/');
      },
    });
  };

  return (
    <>
      <LogoutText onClick={() => setShowModal(true)}>Cerrar sesión</LogoutText>

      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>¿Deseás cerrar sesión?</ModalTitle>
            <ModalActions>
              <ModalButton variant="cancel" onClick={() => setShowModal(false)}>
                Cancelar
              </ModalButton>
              <ModalButton variant="confirm" onClick={handleLogoutConfirm}>
                Cerrar sesión
              </ModalButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

