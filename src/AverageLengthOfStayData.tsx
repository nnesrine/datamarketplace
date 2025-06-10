import React, { useEffect, useState } from 'react';

// Define the type for a single average length of stay entry
interface AverageLengthOfStayEntry {
  diagnosis: string;
  average_length_of_stay: number;
}

const API_BASE_URL = 'http://127.0.0.1:8000'; // Your FastAPI server address
// IMPORTANT: Replace with the actual unique API key for the /average_length_of_stay endpoint
const API_KEY_AVG_LENGTH_OF_STAY = '88e6038573e24ef3b85250c57778c2025';

const AverageLengthOfStayData: React.FC = () => {
  const [data, setData] = useState<AverageLengthOfStayEntry[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching average length of stay data...");
      try {
        const response = await fetch(`${API_BASE_URL}/average_length_of_stay`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': API_KEY_AVG_LENGTH_OF_STAY, // Include the specific API key for this endpoint
          },
        });

        console.log("Response received for average length of stay:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        const result: AverageLengthOfStayEntry[] = await response.json();
        setData(result);
        console.log("Average length of stay data set:", result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setError(e.message);
        console.error("Fetch error for average length of stay:", e);
      } finally {
        setLoading(false);
        console.log("Loading for average length of stay set to false.");
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once after initial render

  if (loading) {
    return <div className="p-4">Loading average length of stay data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Average Length of Stay by Diagnosis</h2>
      {data && data.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Diagnosis</th>
              <th className="py-2 px-4 border-b text-left">Average Length of Stay</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{entry.diagnosis}</td>
                <td className="py-2 px-4 border-b">{entry.average_length_of_stay.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No average length of stay data available.</p>
      )}
    </div>
  );
};

export default AverageLengthOfStayData;