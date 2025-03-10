import { CircleDollarSign, Wallet } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, usePortfolioSelector } from "../../stores/hooks";
import { depositBalance, withdrawBalance } from "../../stores/portfolioSlice";
import TextField from "../shared/TextField";

export default function BalanceActions() {
  const portfolio = usePortfolioSelector();
  const dispatch = useAppDispatch();

  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
    setDepositAmount(value >= 0 ? value : 0);
  };

  const handleWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
    setWithdrawAmount(value >= 0 ? value : 0);
  };

  const handleDeposit = () => {
    dispatch(depositBalance(depositAmount));
    setDepositAmount(0);
  };

  const handleWithdraw = () => {
    dispatch(withdrawBalance(withdrawAmount));
    setWithdrawAmount(0);
  };

  const handleMax = () => {
    setWithdrawAmount(portfolio.balance);
  };

  return (
    <div className="crypto-container">
      <div className="portfolio-card balance-action">
        <h2>Deposite Funds</h2>
        <TextField
          type="number"
          icon={Wallet}
          placeholder="0.00$"
          value={depositAmount}
          onChange={handleDepositChange}
        />
        <button onClick={handleDeposit}>Deposit Balance</button>
      </div>

      <div className="portfolio-card balance-action">
        <h2>Withdraw Funds</h2>

        <TextField
          type="number"
          icon={CircleDollarSign}
          value={withdrawAmount}
          placeholder={`Max: ${portfolio.balance.toFixed(2)}$`}
          onChange={handleWithdrawChange}
        />

        <div className="withdrawal-actions">
          <button className="withdrawal" onClick={handleWithdraw}>
            Withdraw Balance
          </button>
          <button className="max" onClick={handleMax}>
            Max
          </button>
        </div>
      </div>
    </div>
  );
}
