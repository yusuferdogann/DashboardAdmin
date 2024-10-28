import React from 'react';

const MultiCardCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const cards = [
    {
      name:'ANKARA SUBE',
      image: 'https://cdn.pixabay.com/photo/2023/12/15/22/37/mountains-8451480_1280.jpg',
      title: 'Card 1',
      description: '12500m2',
    },
    {
      name:'KONYA SUBE',
      image: 'https://cdn.pixabay.com/photo/2023/12/15/22/37/mountains-8451480_1280.jpg',
      title: 'Card 2',
      description: '12323m2',
    },
    {
      name:'ANTALYA SUBE',
      image: 'https://cdn.pixabay.com/photo/2023/12/15/22/37/mountains-8451480_1280.jpg',
      title: 'Card 3',
      description: '12323m2',
    },
    {
      name:'NIGDE SUBE',
      image: 'https://cdn.pixabay.com/photo/2023/12/15/22/37/mountains-8451480_1280.jpg',
      title: 'Card 4',
      description: '12323m2',
    },
    {
      name:'SEYDISEHIR SUBE',
      image: 'https://cdn.pixabay.com/photo/2023/12/15/22/37/mountains-8451480_1280.jpg',
      title: 'Card 5',
      description: '12323m2',
    },
  ];

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
          <div className="flex  grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 ">
            {cards.slice(currentIndex, currentIndex + 3).map((card, index) => (
                                     <div>
                            {/* group relative flex items-center gap-2.5 rounded-sm
                        py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out
                        hover:bg-graydark dark:hover:bg-meta-4 bg-graydark dark:bg-meta-4 active */}
                            <a href="#" className="flex flex-col items-center bg-white  duration-300 hover:bg-[#efefef66] dark:hover:bg-meta-4  ease-in-out border-gray-200 shadow-default md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 ">
                                <i style={{ fontSize: '50px' }} className="fa-solid fa-industry px-3"></i>
                                <div className="flex flex-col justify-between p-4 w-100 leading-normal">
                                    <div className='flex justify-between  items-center'>
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{card.name}</h5>
                                    </div>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-4">
                                        <div className='flex justify-between'><span className='font-normal'>Çalışan Sayısı:</span><span className='font-semibold'>{card.title}</span></div>
                                    </p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
                                        <div className='flex justify-between'><span className='font-normal'>Toplu Kapalı Alan:</span><span className='font-semibold'>{card.description}</span></div>
                                    </p>
                                </div>
                            </a>
                        </div>
            ))}
          </div>
          <div className="flex items-center justify-between relative  bottom-30">
            <button style={{top:"0",zIndex:"999"}} className="flex h-11.5 w-11.5 ms-[-2rem] items-center justify-center rounded-full bg-[#c2c2c2] text-white shadow-default duration-300  ease-in-out dark:bg-meta-4 hover:bg-[#8f8f8f]" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i></button>
            <button className="flex h-11.5 w-11.5 items-center justify-center me-[-2rem] rounded-full bg-[#c2c2c2] text-white shadow-default dark:bg-meta-4 hover:bg-[#8f8f8f] duration-300  ease-in-out"  onClick={handleNext}><i class="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiCardCarousel;