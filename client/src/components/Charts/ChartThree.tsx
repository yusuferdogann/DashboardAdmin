import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { userAuth } from '../../auth/userAuth';
import { get } from '../../server/Apiendpoint';


interface ChartThreeState {
  series: number[];
}


const ChartThree: React.FC = () => {

  const [threeChartData,setThreeChartData] = useState([])
  const [donutData,setDonutData] = useState({
    series: [],
  })
  const [returnData,setReturnData] = useState()
  const [lastData,setLastData] = useState([{}])
  const [responseArray,setResponseArray] = useState()
  const [getResponse,setGetResponse] = useState()
  const {token} = userAuth()
  const [label,setLabel] = useState()
  const [checkLoading,setCheckLoading] = useState()

  

  let sum = 0
  const takeData = getResponse?.data.data
  returnData?.map(x => sum += x);
  var b = returnData?.map(x=>x*100)
  var resultPurple = b?.map(y => y / sum)
  const ttayta =  resultPurple?.map(a => a.toFixed(0))
  // console.log("percent------------------------------",ttayta)

  const returnValue = takeData
  setTimeout(()=>{
      const newArr1 = returnValue?.map((v,index) =>({...v, percent: ttayta[index]}))
      setLastData(newArr1)

  },1000)
  useEffect(() => {
    const config = {
        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer: "+token
        }
            };
    const fetchData = async () => {
        const dataResult = await get('/getfacility',config);
        const getDonutData = await get('/getfacilitygraficdata',config);
        setCheckLoading(getDonutData)

        const responseResult = dataResult
        // console.log("getFacility------------------------------",responseResult?.data.data)
        setResponseArray(responseResult?.data?.data)

        responseArray?.map((name)=>{
          // console.log("name----",name.facilityname)
          setLabel(name.facilityname)
          // console.log("result-label--------",label)

        })
        let DonutLabel = []
        for (let i = 0; i < responseArray?.length; i++) {
          const element = responseArray[i];
          // console.log("element--------",element.facilityname)
          DonutLabel.push(element.facilityname)
          // console.log("self ------",DonutLabel)
          setLabel(DonutLabel)
        }

        setGetResponse(responseResult)
        // console.log("get-Donut-Data------------------------------",getDonutData.data.data)
      
          // const initialArr = [
          //   {name: 'eve'},
          //   {name: 'john'},
          //   {name: 'jane'},
          //   {name: 'yusuf'}

          // ]
      
     
      // const newArr2 = initialArr.map(v => Object.assign(v, {isActive: true}))
      // console.log("array1----",newArr1)
      // console.log("array2----",newArr2)

      //  console.log("bismillah----------------",lastData)
        setReturnData(getDonutData?.data?.data)
        setThreeChartData(responseResult?.data?.data)
        setDonutData({
          series: getDonutData?.data?.data,
        })

      }

   
    
      
      fetchData()

},[donutData])
const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#00ff8e', '#00ffb3', '#00ffea', '#00a0fe'],
  labels: label,
  legend: {
    show: false,
    position: 'bottom',
  },

  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};


// console.log("tt--------",lastData)
// let sum = 0
// returnData?.map(x => sum += x);
// var b = returnData?.map(x=>x*100)
// var resultPurple = b?.map(y => y / sum)
// var ttayta = resultPurple?.map(a=>a.toFixed(2))
// console.log(b)
// console.log(resultPurple)
// console.log(ttayta)
// const newObject = Object.assign({0:threeChartData,1:ttayta})
// console.log("newData----",newObject)

     
// console.log(sum);
  // const [state, setState] = useState<ChartThreeState>({
  //   series: [12213, 4334, 2212, 1256],
  // });

  // const handleReset = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     series: [65, 34, 12, 56],
  //   }));
  // };
  // handleReset;

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5" 
    style={threeChartData.length>=6 ? {height:'96%'} : {height:'100%'}}>
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Tesislere Göre Karbon Emisyonu
          </h5>
        </div>
        <div>
          {/* <div className="relative z-20 inline-block">
            <select
              name=""
              id=""
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="" className="dark:bg-boxdark">
                Aylık
              </option>
              <option value="" className="dark:bg-boxdark">
                Yıllık
              </option>
            </select>
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                  fill="#637381"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                  fill="#637381"
                />
              </svg>
            </span>
          </div> */}
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
         
          {checkLoading?.status === 200 ? <ReactApexChart
            options={options}
            series={donutData?.series}
            type="donut"
            height={350}
    
          /> : 'Grafik Verileri Yükleniyor...'}
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3" style={threeChartData .length >=6 ? {overflowY:'scroll',height:"20%"} : null} >
      {
        lastData?.map((data,index)=>(
          <div className="sm:w-1/2 w-full px-8" key={index}>
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#00ff8e]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> {data?.facilityname} </span>
              <span>{data?.percent}%</span>
             
            </p>
          </div>
        </div>
        ))
      }
        
      </div>
    </div>
  );
};

export default ChartThree;
