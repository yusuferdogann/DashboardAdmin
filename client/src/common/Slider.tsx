import React from 'react';
import { userAuth } from '../auth/userAuth';

const MultiCardCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const cards = [
    {
      name:'ASELSAN ANKARA SUBE',
      image: 'https://cdn.pixabay.com/photo/2023/12/15/22/37/mountains-8451480_1280.jpg',
      title: '1200',
      description: '12500m2',
      totalCo2:'2.500/ton'
    },
    {
      name:'ASELSAN KONYA SUBE',
      image: 'https://cdn.pixabay.com/photo/2023/12/15/22/37/mountains-8451480_1280.jpg',
      title: '460',
      description: '12323m2',
      totalCo2:'1.500/ton'
    },
    {
      name:'ANTALYA SUBE',
      image: 'https://cdn.pixabay.com/photo/2023/12/15/22/37/mountains-8451480_1280.jpg',
      title: 'Card 3',
      description: '12323m2',
      totalCo2:'2000/ton'
    },
    {
      name:'NIGDE SUBE',
      image: 'https://cdn.pixabay.com/photo/2023/12/15/22/37/mountains-8451480_1280.jpg',
      title: 'Card 4',
      description: '12323m2',
    },
    // {
    //   name:'SEYDISEHIR SUBE',
    //   image: 'https://cdn.pixabay.com/photo/2023/12/15/22/37/mountains-8451480_1280.jpg',
    //   title: 'Card 5',
    //   description: '12323m2',
    // },
  ];
  const {facilityRes} = userAuth();
  // console.log("facility-data---------",facilityRes)
  // console.log("card-data---------",cards)


  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };
if(currentIndex>cards.length-3) {
  console.log(currentIndex)
  setCurrentIndex(0)
  console.log("hi")
}
  return (
    <div className="" >
      <div className=" ">
        <div className="relative">
          {
            facilityRes.length===0 ? <div style={{height:"200px"}} className='h-full'><span className='text-center h-full flex  justify-center items-center text-lg '>Tesis bilgileri şuan için yok. Lütfen yeni bir tesis ekleyin</span></div> :

            <div className="flex  grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 ">
            {facilityRes?.slice(currentIndex, currentIndex + 4).map((card, index) => (
                          
                           <div>
                          
                           <a href="#" className="flex flex-col items-center bg-white  duration-300 hover:bg-[#efefef66] dark:hover:bg-meta-4  ease-in-out border-gray-200 shadow-default md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 ">
                               <i style={{ fontSize: '50px' }} className="fa-solid fa-industry px-3"></i>
                               <div className="flex flex-col justify-between p-4 w-100 leading-normal">
                                   <div className='flex justify-between  items-center'>
                                   <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{card.facilityname}</h5>
                                   </div>
                                   <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-4">
                                       <div className='flex justify-between'><span className='font-normal'>Çalışan Sayısı:</span><span className='font-semibold'>{card.title}</span></div>
                                   </p>
                                   <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
                                       <div className='flex justify-between'><span className='font-normal'>Toplu Kapalı Alan:</span><span className='font-semibold'>{card.description}</span></div>
                                   </p>
                                   <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
                                       <div className='flex justify-between'><span className='font-normal'>Toplam Emilsyon:</span><span className='font-semibold'>{card.totalarea}</span></div>
                                   </p>
                               </div>
                           </a>
                       </div> 
            ))}
          </div>
          }
          <div className="flex items-center justify-between relative  bottom-30">
            <button  className="flex h-11.5 w-11.5 ms-[-2rem] items-center justify-center rounded-full bg-[#c2c2c2] text-white shadow-default duration-300  ease-in-out dark:bg-meta-4 hover:bg-[#8f8f8f]" onClick={handlePrev}><i className="fa-solid fa-chevron-left"></i></button>
            <button  className="flex h-11.5 w-11.5 items-center justify-center me-[-2rem] rounded-full bg-[#c2c2c2] text-white shadow-default dark:bg-meta-4 hover:bg-[#8f8f8f] duration-300  ease-in-out"  onClick={handleNext}><i className="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiCardCarousel;