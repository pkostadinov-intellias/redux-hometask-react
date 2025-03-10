import React from "react";
import { useDialog } from "../../context/DialogContext";
import { useAppDispatch } from "../../stores/hooks";
import { addCryptoCoin, removeCryptoCoin } from "../../stores/portfolioSlice";
import CryptoChart from "./CryptoChart";
import { generateCryptoChartData } from "../../utils/generateCryptoData";

const CryptoDialog: React.FC = () => {
  const { isOpen, selectedCoin, closeDialog } = useDialog();
  const dispatch = useAppDispatch();
  const chartData = generateCryptoChartData(selectedCoin?.price);

  if (!isOpen || !selectedCoin) return null;

  const priceChangeClass =
    selectedCoin.priceChangePercentage24h >= 0 ? "positive" : "negative";

  const handleBuy = () => {
    dispatch(addCryptoCoin({ coin: selectedCoin, quantity: 1 }));
  };

  const handleSell = () => {
    dispatch(removeCryptoCoin({ coin: selectedCoin, quantity: 1 }));
  };

  return (
    <div className="dialog-overlay" onClick={closeDialog}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="close-button-container">
          <button className="close-button" onClick={closeDialog}>
            ✖
          </button>
        </div>

        <div className="dialog-layout">
          <div className="dialog-right">
            <div className="crypto-header">
              <img
                src={selectedCoin.image}
                alt={selectedCoin.name}
                className="crypto-image-large"
              />
              <div className="crypto-info">
                <h3>{selectedCoin.name}</h3>
                <span className="crypto-rank">
                  ({selectedCoin.symbol.toUpperCase()})
                </span>
              </div>
            </div>

            <div className="chart-container">
              <CryptoChart chartData={chartData} />
            </div>

            <div className="crypto-details">
              <div className="crypto-card">
                <div className="crypto-info">
                  <h3>Market Cap Rank</h3>
                  <span className="crypto-rank">
                    #{selectedCoin.marketCapRank}
                  </span>
                </div>
              </div>

              <div className="crypto-card">
                <div className="crypto-info">
                  <h3>Current Price</h3>
                  <span className="crypto-price">
                    ${selectedCoin.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="crypto-card">
                <div className="crypto-info">
                  <h3>24h Change</h3>
                  <div>
                    <div className={`crypto-change ${priceChangeClass}`}>
                      ${selectedCoin.priceChange24h.toFixed(2)}
                    </div>
                    <div className={`crypto-change ${priceChangeClass}`}>
                      ({selectedCoin.priceChangePercentage24h.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="trading-buttons bigger-buttons">
              <button className="buy-button bigger-button" onClick={handleBuy}>
                Buy 1 {selectedCoin.symbol.toUpperCase()}
              </button>
              <button
                className="sell-button bigger-button"
                onClick={handleSell}
              >
                Sell 1 {selectedCoin.symbol.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDialog;
