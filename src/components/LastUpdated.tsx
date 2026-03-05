export default function LastUpdated({ date }: { date?: string }) {
  return (
    <p className="text-sm text-gray-400 mt-8">
      Data last updated: {date || 'March 2026'} · Source: FBI Crime Data Explorer
    </p>
  );
}
