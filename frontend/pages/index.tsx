import { useEffect, useState, useCallback } from "react";

const STREAM_URL = "http://localhost:8000/stream";

function ErrorMessage({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div>
      <p>Error: {error}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
}

function LoadingMessage() {
  return <p>Loading stream data...</p>;
}

function ReceivedData({ dataChunks }: { dataChunks: { timestamp: string; log: string }[] }) {
  return (
    <pre>
      {dataChunks.map(({ timestamp, log }, index) => (
        <div key={index}>
          <span>[{timestamp}]</span> {log}
        </div>
      ))}
    </pre>
  );
}

export default function IndexPage() {
  const [dataChunks, setDataChunks] = useState<{ timestamp: string; log: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStream = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setDataChunks([]);

    try {
      const response = await fetch(STREAM_URL);

      if (!response.ok) {
        throw new Error(`Failed to fetch stream. Status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Response body is null");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let isCancelled = false;

      while (!isCancelled) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value);
        setDataChunks((prev) => [
          ...prev,
          { timestamp: new Date().toLocaleTimeString(), log: chunk },
        ]);
      }

      setIsLoading(false);

      return () => {
        isCancelled = true;
        reader.cancel();
      };
    } catch (error) {
      console.error("Error fetching stream:", error);
      setError(error instanceof Error ? error.message : String(error));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const cleanup = fetchStream();
    return cleanup;
  }, [fetchStream]);

  return (
    <div>
      <h1>Server Log Viewer</h1>

      {error && <ErrorMessage error={error} onRetry={fetchStream} />}

      <div>
        <h2>Logs:</h2>
        {isLoading && dataChunks.length === 0 ? (
          <LoadingMessage />
        ) : (
          <ReceivedData dataChunks={dataChunks} />
        )}
      </div>

      <div>
        <p>Total logs received: {dataChunks.length}</p>
      </div>
    </div>
  );
}
