import React, { useEffect, useState } from 'react';

// Define the type for a single diagnosis entry
interface DiagnosisEntry {
  age_group: string;
  diagnosis: string;
  count: number;
}

const API_BASE_URL = 'http://127.0.0.1:8000'; // Your FastAPI server address
const API_KEY = '55e6038573e24ef3b85250c57778c161'; // IMPORTANT: Replace with your actual API key

const DiagnosisData: React.FC = () => {
  const [data, setData] = useState<DiagnosisEntry[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/diagnoses`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': API_KEY, // Include your unique API key in the headers
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        const result: DiagnosisEntry[] = await response.json();
        setData(result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this runs once after the initial render

  if (loading) {
    return <div className="p-4">Loading diagnosis data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Diagnosis Data by Age Group</h2>
      {data && data.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Age Group</th>
              <th className="py-2 px-4 border-b">Diagnosis</th>
              <th className="py-2 px-4 border-b">Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{entry.age_group}</td>
                <td className="py-2 px-4 border-b">{entry.diagnosis}</td>
                <td className="py-2 px-4 border-b">{entry.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No diagnosis data available.</p>
      )}
    </div>
  );
};

export default DiagnosisData;