import { useEffect, useState } from "react";
import "./App.css";

import { fetchHoldings, fetchCapitalGains } from "./services/api";
import CapitalCard from "./components/CapitalCard";
import HoldingsTable from "./components/HoldingsTable";

function App() {
  const [holdings, setHoldings] = useState([]);
  const [gains, setGains] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  const [showNotes, setShowNotes] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const holdingsData = await fetchHoldings();
      const gainsData = await fetchCapitalGains();

      setHoldings(holdingsData);
      setGains(gainsData);
      setLoading(false);
    };

    loadData();
  }, []);

  // Select single
  const handleSelect = (item) => {
    setSelected((prev) => {
      const exists = prev.includes(item);
      return exists ? prev.filter((i) => i !== item) : [...prev, item];
    });
  };

  // Select all
  const handleSelectAll = () => {
    if (selected.length === holdings.length) {
      setSelected([]);
    } else {
      setSelected(holdings);
    }
  };

  // After Harvesting
  const calculateAfterHarvesting = () => {
    let stcgProfit = gains.stcg.profits;
    let stcgLoss = gains.stcg.losses;

    let ltcgProfit = gains.ltcg.profits;
    let ltcgLoss = gains.ltcg.losses;

    selected.forEach((item) => {
      if (item.stcg.gain > 0) {
        stcgProfit += item.stcg.gain;
      } else {
        stcgLoss += Math.abs(item.stcg.gain);
      }

      if (item.ltcg.gain > 0) {
        ltcgProfit += item.ltcg.gain;
      } else {
        ltcgLoss += Math.abs(item.ltcg.gain);
      }
    });

    return {
      stcg: { profits: stcgProfit, losses: stcgLoss },
      ltcg: { profits: ltcgProfit, losses: ltcgLoss },
    };
  };

  // Savings
  const calculateSavings = () => {
    const pre =
      (gains.stcg.profits - gains.stcg.losses) +
      (gains.ltcg.profits - gains.ltcg.losses);

    const afterData = calculateAfterHarvesting();

    const post =
      (afterData.stcg.profits - afterData.stcg.losses) +
      (afterData.ltcg.profits - afterData.ltcg.losses);

    return pre - post;
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  const savings = calculateSavings();

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header + Tooltip */}
      <div className="flex items-center gap-2 mb-4 relative">
        <h1 className="text-xl font-semibold">Tax Harvesting</h1>

        <span
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="text-blue-500 text-sm cursor-pointer underline"
        >
          How it works?
        </span>

        {showTooltip && (
          <div className="absolute top-8 left-32 w-72 bg-black text-white text-xs rounded-lg p-3 shadow-lg z-50">
            <div className="absolute -top-2 left-6 w-3 h-3 bg-black rotate-45"></div>
            <p>
              Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus.
            </p>
            <span className="text-blue-400 mt-2 inline-block">Know More</span>
          </div>
        )}
      </div>

      {/* Dropdown */}
      <div className="bg-white rounded-xl shadow mb-6">
        <div
          onClick={() => setShowNotes(!showNotes)}
          className="flex justify-between items-center p-4 cursor-pointer"
        >
          <p className="text-sm font-medium">Important Notes & Disclaimers</p>
          <span>{showNotes ? "▲" : "▼"}</span>
        </div>

        {showNotes && (
          <div className="p-4 text-sm text-gray-700 bg-blue-50 border space-y-2">
            <p>• Tax-loss harvesting is currently not allowed under Indian tax regulations.</p>
            <p>• Tax harvesting does not apply to derivatives or futures.</p>
            <p>• Prices are fetched from Coingecko.</p>
            <p>• Only realized losses are considered.</p>
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <CapitalCard data={gains} title="Pre Harvesting" />
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-5 rounded-xl shadow">
          <CapitalCard data={calculateAfterHarvesting()} title="After Harvesting" isBlue />

          {savings > 0 && (
            <p className="text-yellow-200 mt-3">
              🎉 You save ₹{savings.toFixed(0)}
            </p>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-xl shadow">
        <HoldingsTable
          holdings={holdings}
          selected={selected}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          showAll={showAll}        
          setShowAll={setShowAll}  
      />
      </div>

    </div>
  );
}

export default App;