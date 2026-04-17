function HoldingsTable({
  holdings,
  selected,
  onSelect,
  onSelectAll,
  showAll,
  setShowAll,
}) {

  //  Visible data logic
  const visibleHoldings = showAll ? holdings : holdings.slice(0, 6);

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Holdings</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          {/* HEADER */}
          <thead>
            <tr className="text-xs text-gray-500 border-b bg-gray-50">

              {/* Select All */}
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={
                    holdings.length > 0 &&
                    selected.length === holdings.length
                  }
                  onChange={onSelectAll}
                />
              </th>

              <th className="p-3 text-left">Asset</th>
              <th className="p-3 text-left">Holdings</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Short-term</th>
              <th className="p-3 text-left">Long-term</th>

            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {visibleHoldings.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition duration-150"
              >

                {/* Checkbox */}
                <td className="p-3">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={selected.includes(item)}
                    onChange={() => onSelect(item)}
                  />
                </td>

                {/* Asset */}
                <td className="p-3">
                  <div className="flex items-center gap-3">

                    <img
                      src={item.logo || "https://via.placeholder.com/24"}
                      alt={item.coin}
                      className="w-7 h-7 rounded-full"
                    />

                    <div>
                      <div className="font-medium">{item.coin}</div>
                      <div className="text-xs text-gray-400">
                        {item.coinName}
                      </div>
                    </div>

                  </div>
                </td>

                {/* Holdings */}
                <td className="p-3">
                  <div className="font-medium">
                    {item.totalHolding.toFixed(4)}
                  </div>
                  <div className="text-xs text-gray-400">
                    ₹{(item.totalHolding * item.currentPrice).toFixed(2)}
                  </div>
                </td>

                {/* Price */}
                <td className="p-3 font-medium">
                  ₹{item.currentPrice.toFixed(2)}
                </td>

                {/* ST Gain */}
                <td className="p-3">
                  <div
                    className={
                      item.stcg.gain >= 0
                        ? "text-green-600 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {item.stcg.gain >= 0 ? "+" : ""}
                    {item.stcg.gain.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {item.stcg.balance}
                  </div>
                </td>

                {/* LT Gain */}
                <td className="p-3">
                  <div
                    className={
                      item.ltcg.gain >= 0
                        ? "text-green-600 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {item.ltcg.gain >= 0 ? "+" : ""}
                    {item.ltcg.gain.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {item.ltcg.balance}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/*  View All Button */}
      <div className="mt-3">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-500 text-sm hover:underline"
        >
          {showAll ? "View less" : "View all"}
        </button>
      </div>

    </div>
  );
}

export default HoldingsTable;