import zIndex from '@mui/material/styles/zIndex';
import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
  backgroundColor:String;
  boxShadow:String,
  backdropFilter:String,
  color:String,
  background:String,
  padding:String,
  borderRadius:String,
  marginBottom:String,
  birim:String,
  opacity:String
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
  color,
  backdropFilter,
  backgroundColor,
  boxShadow,
  background,
  padding,
  marginBottom,
  borderRadius,
  birim,
  opacity
}) => {
  return (
    <div className="rounded-sm border flex justify-between items-center border-stroke bg-white py-6 px-5.5 shadow-default " style={{opacity,backdropFilter,backgroundColor,boxShadow}}>
      <div className="flex h-11.5 w-11.5 items-center justify-center">
        {children}
      </div>
      <div className="mt-1 flex items-end justify-between" >
        <div>
          <h4 className="text-title-md font-bold" style={{color,marginBottom}}>
            {total}  
          </h4>
          <span className="text-normal text-xl font-bold" style={{background,padding,borderRadius,color}}>{title ? title : "veri yok"}</span><span>{birim}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp && 'text-meta-3'
          } ${levelDown && 'text-meta-5'} `}
        >
          {rate}

          {levelUp && (
           <img src="" alt="" />
          )}
          {levelDown && (
            <img src="" alt="" />
          )}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
