import BalanceCard from "./components/BalanceCard";
import ActionButtons from "./components/ActionButtons";
import SearchBar from "./components/SearchBar";
import RecentActivity from "./components/RecentActivity";
import styled from "styled-components";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function DashboardHome() {
  return (
    <Wrapper>
      <BalanceCard amount="10.890.534,17" />
      <ActionButtons />
      <SearchBar />
      <RecentActivity />
    </Wrapper>
  );
}
