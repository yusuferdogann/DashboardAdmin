import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { tr } from 'date-fns/locale/tr'


// import  {Calendar}  from 'react-date-range';
import { DateRangePicker } from 'react-date-range';
import { border, fontSize, width } from '@mui/system';
import { useState } from 'react';




// const data = ['Bugun','Dun', 'Bu Hafta']
// const veri = document.querySelectorAll('.rdrStaticRangeLabel')
// console.log("Ver-------",veri[0].innerText)
// const name = 'Bugun'
const Level1 = ()=>{

    const [holdDate,setHoldDate] = useState({startDate:'',endDate:''})


const handleSelect = (date)=>{


    console.log(date.selection); // native Date object
    const startDay = date.selection.startDate;
    const endDay = date.selection.endDate;

   const finiststart =  new Intl.DateTimeFormat('tr-TR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(startDay)
   const finishend   = new Intl.DateTimeFormat('tr-TR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(endDay)
   setHoldDate({startDate:finiststart,endDate:finishend})

    console.log("hod-----------",holdDate)
}

  const selectionRange =  {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
    locale:{tr},
    fontSize:'16px'
  }
 
    return (
    //   <Calendar
    //     date={new Date()}
    //     onChange={handleSelect}
    //   />
   <div className='flex mt-10 border border-slate-300  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 bg-white'>
    <div>
    <DateRangePicker
        style={{height:'300px',width:'700px',fontSize:'16px'}}
        ranges={[selectionRange]}
        onChange={handleSelect}
        locale={tr}
      />
    </div>
      <h1>BAŞLANGIÇ TARİHİ</h1>
      <span>{holdDate?.startDate}</span>
      <h1>BİTİŞ TARİHİ</h1>

   </div>
    )
  
}

export default Level1

