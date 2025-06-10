// import React from 'react'
import Cardcomp from './Cardcomp'

export default function Maincontent() {

  const API_KEY_DIAGNOSES = "55e6038573e24ef3b85250c57778c161";
const API_KEY_AVG_LENGTH_OF_STAY = "88e6038573e24ef3b85250c57778c2025";
  return (
    <div className='w-[95%] h-fit p-2  rounded-xl border-1 border-gray-300 m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
     {/* Card for Diagnosis Data by Age Group */}
      <Cardcomp
        title="Diagnosis Data by Age Group"
        text="Access comprehensive data on diagnoses categorized by different age groups, showing counts for various medical conditions."
        endpointPath="/diagnoses"
        apiKey={API_KEY_DIAGNOSES}
      />

      {/* Card for Average Length of Stay Data */}
      <Cardcomp
        title="Average Length of Stay"
        text="Obtain insights into the average duration of hospital stays for various diagnoses, useful for resource planning."
        endpointPath="/average_length_of_stay"
        apiKey={API_KEY_AVG_LENGTH_OF_STAY}
      />
    </div>
  )
}
