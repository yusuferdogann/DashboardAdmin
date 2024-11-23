import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { userAuth } from '../../auth/userAuth';
import { get } from '../../server/Apiendpoint';
const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#00ff8e', '#00a0fe','#9ea4e7'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE','#9ea4e7'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
    
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100000,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = (props) => {

  const {token} = userAuth()
  // const [result,setResult] = useState()
  const [result,setResult] = useState({
    series: [
      {
        name: 'Kapsam 1',
        // data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
        data: [],
        
      },
      {
        name: 'Kapsam 2',
        // data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
        data:[]
      },
      {
        name: 'Kapsam 3',
        // data: [40, 65, 16, 80, 25, 13, 72, 33, 11, 22, 81, 73],
        data:[]
      },
    ],
  })
  
  useEffect(()=>{
    
    const config = {
      headers:{
          "Content-Type":"application/json",
          Authorization:"Bearer: "+token
      }
          };

          const fetchData = async () => {
            const dataResult = await get('/getgraficdata',config);
            console.log("result-data---------",dataResult?.data?.data)
            // day.push(dataResult.data.data)
            // for (let i = 0; i < result.length; i++) {
            //   const element = result[i];
            //   day.push(element)
            //   setData(element)

            // }
            setResult({
              series: [
                {
                  name: 'Kapsam 1',
                  // data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
                  data: dataResult?.data.data?.Scope1GrafikData,
                  
                },
                {
                  name: 'Kapsam 2',
                  // data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
                  data: dataResult?.data.data?.Scope2GrafikData,

                },
                {
                  name: 'Kapsam 3',
                  // data: [40, 65, 16, 80, 25, 13, 72, 33, 11, 22, 81, 73],
                  data: dataResult?.data.data?.Scope3GrafikData,

                },
              ],
            })
          

          }
          fetchData()
},[])


  // console.log(state.series[0].data[10])
//  state.series[0].data[10] = 10 

 

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex w-full">
            {/* <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#00a0fe]"></span>
            </span> */}
            <div className="w-full">
              <p className="font-semibold text-black dark:text-white" >Aylara Göre Karbon Emisyonu Dağılımı</p>
              {/* <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p> */}
            </div>
          </div>
          {/* <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Sales</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div> */}
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            {/* <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Gün
            </button> */}
            {/* <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Hafta
            </button> */}
            {/* <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Ay
            </button> */}
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={result?.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
