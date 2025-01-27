import { TextField } from "@mui/material"

const Streams = () => {
  return (
   <div>
     <h1>Calculation based approaches: Source Streams (excluding PFC emissions)</h1>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-7.5 dark:bg-boxdark">
  <div>
    <div className="my-3"><TextField   id="standard-basic" label="Method" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="Source stream name" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="Activity data (AD)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="AD Unit" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="Net calorific value (NCV)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="NCV Unit" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="Emission factor (EF)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="EF Unit" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="Carbon content" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="C-Content Unit" variant="standard" /></div>
  </div>
  <div>
    <div className="my-3"><TextField id="standard-basic" label="Oxidation factor (OxF)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="OxF Unit" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="Conversion factor (ConvF)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="ConvF Unit" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="Biomass content (BioC)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="BioC Unit" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="hourly GHG conc. Average" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="hourly GHG conc. Unit" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="hours operating" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="hours operating Unit" variant="standard" /></div>

  </div>
  <div>
    <div className="my-3"><TextField id="standard-basic" label="Flue gas flow (average)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="Flue gas flow (average), Unit" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="Annual amount of GHG" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="Annual amount of GHG Unit" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="GWP (tCO2e/t)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="A: Frequency" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="A: Duration" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="A: SEF(CF4)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="B: AEO" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="B: CE" variant="standard" /></div>

  </div>
  <div>
    <div className="my-3"><TextField id="standard-basic" label="B: OVC" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="F(C2F6)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="CF4 Emissions (t CF4)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="C2F6 Emissions (t C2F6)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="GWP (CF4) (tCO2e/t)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="GWP (C2F6) (tCO2e/t)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="CF4 Emissions (t CO2e)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="C2F6 Emissions (t CO2e)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="Collection efficiency, %" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="CO2e fossil (t)" variant="standard" /></div>

  </div>
  <div>
    <div className="my-3"><TextField id="standard-basic" label="CO2e bio (t)" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="Energy content (fossil), TJ" variant="standard" /></div>        
    <div className="my-3"><TextField id="standard-basic" label="Energy content (bio), TJ" variant="standard" /></div>        
  </div>
</div>
   </div>
  )
}

export default Streams