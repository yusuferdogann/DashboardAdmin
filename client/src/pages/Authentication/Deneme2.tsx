import { keys } from '@mui/system';
import React, { useState } from 'react'

const Deneme2 = () => {

    interface Deneme{
        
            name: String
            source: Array<String>
            unit: Array<String>

        

    }

    const Countries = [
        {
          id: 1,
          name: "Scope-1",
          states: [
            {
              name: "Stationary Combustion",
              cities: ["Dogalgaz", "Komur", "LPG"]
            },
            {
                name: "Mobile Combustion",
                cities: ["tt", "gg", "vv"]
              },
              {
                name: "Emision Combustion",
                cities: ["Dogalgaz", "Komur", "LPG"]
              },
              {
                name: "Stationary Combustion",
                cities: ["Dogalgaz", "Komur", "LPG"]
              },
          ],
        },
        {
          id: 2,
          name: "Scope-2",
          states: [
            {
              name: "Mobile Combustion Combustion",
              cities: ["Dogalgaz", "Komur", "LPG"]
            },
          ],
        },
       
      ];


      const [data, setData] = useState(Countries);
      const [country, setCountry] = useState([]);
      const [state,setState] = useState([])
      const [citiy,setCitiy] = useState()
      const [cities, setCities] = useState([])
      const [states, setStates] = useState<Array<String>>([]);


      const changeCountry = (event) => {
        setCountry(event.target.value);
        setStates(Countries.find((ctr) => ctr.name === event.target.value).states);
        // setData(states)
      };
      const changeState=(event)=>{
        setCities(states.find((state) => state.name === event.target.value).cities);
    
      }


      return (
        <div>
          {
            <>
              <select
                className="form-control"
                value={country}
                onChange={changeCountry}
                multiple={false}
              >
               <option>Select Scope</option>
                {data.map((ctr,index) => (
                  <option  key={index}>{ctr.name}</option>
                ))}
              </select>
    
              <select
                className="form-control"
                value={state}
                onChange={changeState}
                multiple={false}
              >
               <option>Select source</option>
                {states.map((state,index) => (
                  <option  key={index}>{state.name}</option>
                ))}
              </select>
    
    
              <select
                className="form-control"
                value={citiy}
                onChange={changeState}
                multiple={false}
              >
               <option>Select source</option>
                {cities.map((citiy,index) => (
                  <option  key={index}>{citiy}</option>
                ))}
              </select>
            </>
          }
        </div>
      );
}

export default Deneme2