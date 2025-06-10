// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface DiagnosisEntry {
//   diagnosis: string;
//   count: number;
// }

// type DiagnosisData = {
//   [ageGroup: string]: DiagnosisEntry[];
// };

// const API_URL = 'http://localhost:8000/diagnosis-by-age';
// const API_KEY = '8df5a20d16da479ab8180cb6aa49432d';

// const DiagnosisByAgeText: React.FC = () => {
//   const [data, setData] = useState<DiagnosisData>({});
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios
//       .get<DiagnosisData>(API_URL, {
//         headers: {
//           'x-api-key': API_KEY,
//         },
//       })
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError('Failed to fetch diagnosis data.');
//       });
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Diagnosis by Age Group</h2>
//       {error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         Object.keys(data).map((ageGroup) => (
//           <div key={ageGroup} className="mb-4">
//             <h3 className="text-lg font-semibold">{ageGroup}</h3>
//             <ul className="list-disc list-inside ml-4">
//               {data[ageGroup].map((entry, index) => (
//                 <li key={index}>
//                   {entry.diagnosis}: {entry.count}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default DiagnosisByAgeText;


import { useEffect, useState } from "react";

interface DiagnosisEntry {
  diagnosis: string;
  count: number;
}

interface AgeGroupData {
  [ageGroup: string]: DiagnosisEntry[];
}

export default function DiagnosisByAgeText() {
  const [data, setData] = useState<AgeGroupData>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/diagnosis-by-age", {
      headers: {
        "x-api-key": "55e6038573e24ef3b85250c57778c161",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch diagnosis data");
        }
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Diagnosis by Age Group</h2>
      {Object.entries(data).map(([ageGroup, entries]) => (
        <div key={ageGroup} className="mb-4">
          <h3 className="text-lg font-bold">{ageGroup}</h3>
          <ul className="list-disc pl-5">
            {entries.map((entry, idx) => (
              <li key={idx}>
                {entry.diagnosis}: {entry.count}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
