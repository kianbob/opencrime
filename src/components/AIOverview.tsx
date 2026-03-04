export default function AIOverview({ insights }: { insights: string[] }) {
  if (!insights.length) return null;
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
      <h3 className="font-semibold text-primary text-sm uppercase tracking-wider mb-3">Key Insights</h3>
      <ul className="space-y-2">
        {insights.map((insight, i) => (
          <li key={i} className="flex gap-2 text-sm text-gray-700">
            <span className="text-primary font-bold mt-0.5">→</span>
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
