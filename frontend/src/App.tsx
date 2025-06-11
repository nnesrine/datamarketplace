
import Nav from './Nav'
import './App.css'
import Maincontent from './Maincontent'
import DiagnosisData from './DiagnosisData'
import AverageLengthOfStayData from './AverageLengthOfStayData'
import Desc from './Desc'
import DescB from './DescB'
function App() {
 

  return (
    <>
      <Nav/>
      <Desc/>
      <Maincontent/>
      <div className='w-1.5 h-10'></div>
      <DescB/>
       <div className='w-1.5 h-7'></div>
      <DiagnosisData/>
      <div className='w-1.5 h-7'>

      </div>
      <AverageLengthOfStayData/>
    </>
  )
}

export default App
