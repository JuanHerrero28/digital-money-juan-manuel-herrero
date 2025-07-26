// src/components/DashboardHome/DashboardHome.tsx
import BalanceCard from "./components/BalanceCard";
import ActionButtons from "./components/ActionButtons";
import SearchBar from "./components/SearchBar";
import RecentActivity from "./components/RecentActivity";
import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type Props = {
  setActiveSection: (section: string) => void;
};

export default function DashboardHome({ setActiveSection }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Wrapper>
      <BalanceCard setActiveSection={setActiveSection} />
      <ActionButtons setActiveSection={setActiveSection} />
      <SearchBar onSearch={setSearchTerm} />
      <RecentActivity setActiveSection={setActiveSection} searchTerm={searchTerm} />
    </Wrapper>
  );
}

