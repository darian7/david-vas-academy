import React from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

import logoDV from "../../../assets/login/Logo-DV.png";

export const TradingView = () => {
  return <div style={{ paddingTop: 15 }} >
    <div className="logo-dv" style={{ paddingRight: 60, paddingTop: 0, paddingBottom: 20 ,textAlign: "end" }}>
      <img src={logoDV} alt="David-Vas" />
    </div>
    <TradingViewWidget
      width={1600}
      height={800}
      symbol="US100"
      interval="60"
      timezone="America/Bogota"
      theme={Themes.DARK}
      locale="es"
      allow_symbol_change
      watchlist={[
        "EURUSD",
        "GBPUSD",
        "GBPJPY",
        "EURJPY",
        "USDJPY",
        "AUDUSD"
      ]}
      studies={[
        "MASimple@tv-basicstudies",
        "RSI@tv-basicstudies"
      ]}
      container_id="tradingview_e3153"
    />
  </div>;
};
