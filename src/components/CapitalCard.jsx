function CapitalCard({ data, title, isBlue }) {
  if (!data) return null;

  const stcgNet = data.stcg.profits - data.stcg.losses;
  const ltcgNet = data.ltcg.profits - data.ltcg.losses;

  return (
    <div>
      <h2 className={`font-semibold mb-4 ${isBlue ? "text-white" : "text-black"}`}>
        {title}
      </h2>

      <div className="grid grid-cols-3 text-sm mb-2">
        <div></div>
        <div className="text-center text-gray-400">Short-term</div>
        <div className="text-center text-gray-400">Long-term</div>
      </div>

      <div className="grid grid-cols-3 text-sm mb-2">
        <div>Profits</div>
        <div className="text-center">₹ {data.stcg.profits}</div>
        <div className="text-center">₹ {data.ltcg.profits}</div>
      </div>

      <div className="grid grid-cols-3 text-sm mb-2">
        <div>Losses</div>
        <div className="text-center">₹ {data.stcg.losses}</div>
        <div className="text-center">₹ {data.ltcg.losses}</div>
      </div>

      <div className="grid grid-cols-3 text-sm mb-3 font-medium">
        <div>Net Capital Gains</div>
        <div className="text-center">₹ {stcgNet}</div>
        <div className="text-center">₹ {ltcgNet}</div>
      </div>

      {!isBlue && (
        <div className="mt-3 font-semibold text-lg">
          Realised Capital Gains: ₹ {stcgNet + ltcgNet}
        </div>
      )}

      {isBlue && (
        <div className="mt-3 font-semibold text-lg">
          Effective Capital Gains: ₹ {stcgNet + ltcgNet}
        </div>
      )}
    </div>
  );
}

export default CapitalCard;