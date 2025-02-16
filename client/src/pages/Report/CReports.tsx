import Streams from "../../components/CReports/Eminst/Streams"
import Aggregated from "../../components/CReports/InstData/Aggregated"
import Purchased from "../../components/CReports/InstData/Purchased"
import Verifier from "../../components/CReports/InstData/Verifier"
import LastReport from "../../components/CReports/LastReport"
import Level1 from "../../components/CReports/LastReport/Level1"
import Level2 from "../../components/CReports/LastReport/Level2"
import Level3 from "../../components/CReports/LastReport/Level3"
import Level4 from "../../components/CReports/LastReport/Level4"
import Level5 from "../../components/CReports/LastReport/Level5"
import Level6 from "../../components/CReports/LastReport/Level6"
import Level7 from "../../components/CReports/LastReport/Level7"
import Level8 from "../../components/CReports/LastReport/Level8"

// yeni tasarim------------
import ExcelEditor2 from "../../components/Excel/yeni2"


// Payment-----------------
// import ExcelEditor2 from "../../components/Excel/Payment"

// import ExcelEditor from "../../pages/Report/Modal"



// import ExcelEditor from "../../components/Excel/calisankod"


// import ExcelEditor from "../../components/Excel/ExcelImport"

// import ExcelEditor from "../../components/Excel/test"
// import ExcelEditor from "../../components/Excel/harman"

// import Konum from "../../components/CReports/konum"
const CReports = () => {
  return (
    <div>
      {/* <h1>A. Sheet "A_InstData" - General information, production processes and purchased precursors </h1> */}
    {/* <Verifier/> */}
     {/* <Aggregated/> */}
    {/* <Purchased/> */}

    {/* <Streams/> */}
     {/* <LastReport/> */}
     {/* <Level1/> */}
     {/* <Level2/> */}
     {/* <Level3/> */}
     {/* <Level4/> */}
     {/* <Level5/> */}
     {/* <Level6/> */}
     {/* <ExcelEditor/> */}
     <ExcelEditor2/>

     {/* <ExceImport/> */}
     {/* elektrik */}
     {/* <Level7/> */}
    {/* <Konum/> */}
     {/* uretim */}
     {/* <Level8/> */}
    </div>
  )
}

export default CReports