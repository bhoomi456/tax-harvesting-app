// Mock Holdings API
export const fetchHoldings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          coin: "USDC",
          coinName: "USDC",
          currentPrice: 85.41,
          totalHolding: 0.0015,
          averageBuyPrice: 1.58,
          stcg: { gain: 0.12, balance: 0.0015 },
          ltcg: { gain: 0, balance: 0 }
        },
        {
          coin: "ETH",
          coinName: "Ethereum",
          currentPrice: 216182,
          totalHolding: 0.0004,
          averageBuyPrice: 3909,
          stcg: { gain: 89.4, balance: 0.0004 },
          ltcg: { gain: 0, balance: 0 }
        },
        {
          coin: "MATIC",
          coinName: "Polygon",
          currentPrice: 22.22,
          totalHolding: 2.75,
          averageBuyPrice: 0.68,
          stcg: { gain: 59.24, balance: 2.75 },
          ltcg: { gain: 0, balance: 0 }
        },
        {
          coin: "EZ",
          coinName: "EasyFi",
          currentPrice: 0.88,
          totalHolding: 0.0005,
          averageBuyPrice: 6.53,
          stcg: { gain: -0.003, balance: 0.0005 },
          ltcg: { gain: 0, balance: 0 }
        }
      ]);
    }, 1000);
  });
};


// Mock Capital Gains API
export const fetchCapitalGains = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stcg: {
          profits: 70200.88,
          losses: 1548.53
        },
        ltcg: {
          profits: 5020,
          losses: 3050
        }
      });
    }, 1000);
  });
};