import { useAppSelector, usePortfolioSelector } from "../stores/hooks";
import CryptoDialog from "../components/Crypto/CryptoDialog";
import { selectInvestedCoins } from "../stores/portfolioSlice";
import PortfolioInfo from "../components/Portfolio/PortfolioInfo";
import Reminder from "../components/shared/Reminder";
import PortfolioList from "../components/Portfolio/PortfolioList";

export default function Portfolio() {
  const portfolio = usePortfolioSelector();
  const investedCoins = useAppSelector(selectInvestedCoins);

  return (
    <>
      <div className="page-header">
        <h1>My Crypto Portfolio</h1>
        <PortfolioInfo />
      </div>
      <Reminder
        condition={Math.floor(portfolio.balance) === 0}
        message="Your balance is low. Deposit more funds in"
        linkText="Profile"
        linkPath="/profile"
      />

      <PortfolioList coins={investedCoins} />

      <CryptoDialog />
    </>
  );
}
