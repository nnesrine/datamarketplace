import  { useEffect, useState } from "react";

const DiagnosisByAge = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<{ [key: string]: any[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "55e6038573e24ef3b85250c57778c161";

  useEffect(() => {
    fetch("https://datamarketplace.onrender.com/diagnosis-by-age", {
      headers: {
        "x-api-key": API_KEY
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Diagnosis by Age Group</h2>
      {Object.entries(data).map(([group, diagnoses]) => (
        <div key={group}>
          <h3>{group}</h3>
          <ul>
            {diagnoses.map((d, idx) => (
              <li key={idx}>
                {d.diagnosis}: {d.count}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DiagnosisByAge;
