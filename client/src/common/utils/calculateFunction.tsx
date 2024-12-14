// ----------dogalgaz-------------------------------
const dogalgaz11  =  [56100 * 48 * 0.79 * 0.000000001];
const dogalgaz22  = [1 * 48 * 0.79  *  0.000000001];
const dogalgaz33  = [48 * 0.1 *  0.79 * 0.000000001];
const value11 = 1;
const value22 = 27.9;
const value33 = 273;
// --------------------------------------------------

// ------motorin-------------------------------
const motorin11  =  [74100 * 43 * 0.00084 * 0.000001];
const motorin22 = [3 * 43 * 0.00084  *  0.000001];
const motorin33  = [43 * 0.6 *  0.00084 * 0.000001];
// ------------------------------------------------

// ------LPG---------------------------------------
const lpg11 =  [64200 * 43 * 0.00084 * 0.000001];
const lpg22 = [3 * 43 * 0.00084  *  0.000001];
const lpg33 = [43 * 0.6 *  0.00084 * 0.000001];
// ------------------------------------------------

// ------Benzin---------------------------------------
const benzin11 =  [69300 * 43 * 0.00084 * 0.000001];
const benzin22 = [3 * 43 * 0.00084  *  0.000001];
const benzin33 = [43 * 0.6 *  0.00084 * 0.000001];
// ------------------------------------------------


// ----------kommur-------------------------------
const komur11 =  [101000 * 11.9 * 0.000001];
const komur22 = [10 * 11.9    * 0.000001];
const komur33 = [11.9 * 1.5  * 0.000001];
// -----------------------------------------------

// ----------bio kutle----------------------------
const biokutle11 =  [112000 * 48 * 0.79 * 0.000000001];
const biokutle22 =  [48 * 30 * 0.79  *  0.000000001];
const biokutle33 =  [48 * 4 *  0.79 * 0.000000001];
// -----------------------------------------------

// ===========benzin hesaplama===================
const benzinResult11 = benzin11.reduce((prevValue,curValue) => {
  return prevValue * curValue
});
const benzinResult22 = benzin22.reduce((prevValue,curValue) => {
  return prevValue * curValue
});
const benzinResult33 = benzin33.reduce((prevValue,curValue) => {
  return prevValue * curValue
});
// ==============================================

// ===========biolutle hesaplama===================
const biokutleResult11 = biokutle11.reduce((prevValue,curValue) => {
  return prevValue * curValue
});
const biokutleResult22 = biokutle22.reduce((prevValue,curValue) => {
  return prevValue * curValue
});
const biokutleResult33 = biokutle33.reduce((prevValue,curValue) => {
  return prevValue * curValue
});
// ==============================================

// ===========komur hesaplama===================
const komurResult11 = komur11.reduce((prevValue,curValue) => {
  return prevValue * curValue
});
const komurResult22 = komur22.reduce((prevValue,curValue) => {
  return prevValue * curValue
});
const komurResult33 = komur33.reduce((prevValue,curValue) => {
  return prevValue * curValue
});
// ==============================================

// ===========dogalgaz hesaplama===================
const dogalgazResul11 = dogalgaz11.reduce((prevValue,curValue) => {
    return prevValue * curValue
  });
const dogalgazResul22 = dogalgaz22.reduce((prevValue,curValue) => {
    return prevValue * curValue
  });
const dogalgazResul33 = dogalgaz33.reduce((prevValue,curValue) => {
    return prevValue * curValue
  });
  // ==============================================

  // =======motorin hesaplama======================
const diz11 = motorin11.reduce((prevValue,curValue) => {
    return prevValue * curValue
  });
const diz22 = motorin22.reduce((prevValue,curValue) => {
    return prevValue * curValue
  });
const diz33 = motorin33.reduce((prevValue,curValue) => {
    return prevValue * curValue
  });
  // ==============================================

   // ==========LPG hesaplama======================
const lpgResult11 = lpg11.reduce((prevValue,curValue) => {
  return prevValue * curValue
});
const lpgResult22 = lpg22.reduce((prevValue,curValue) => {
  return prevValue * curValue
});
const lpgResult33 = lpg33.reduce((prevValue,curValue) => {
  return prevValue * curValue
});
// ==============================================

// ---------dogalgaz-------------------
const arrayResult11 = dogalgazResul11 * value11;
const arrayResult22 = dogalgazResul22 * value22;
const arrayResult33 = dogalgazResul33 * value33;
// ------------------------------------

// ----------dızel yakıt------------------
const arrayResult44 = diz11 * value11;
const arrayResult55 = diz22 * value22;
const arrayResult66 = diz33 * value33;
// -----------------------------------

// ----------LPG----------------------
const arrayResult77 = lpgResult11 * value11;
const arrayResult88 = lpgResult22 * value22;
const arrayResult99 = lpgResult33 * value33;
// -----------------------------------

// ---------komur-------------------
const arrayResult110 = komurResult11 * value11;
const arrayResult111 = komurResult22 * value22;
const arrayResult112 = komurResult33 * value33;
// ------------------------------------

// ---------biokutle-------------------
const arrayResult113 = biokutleResult11 * value11;
const arrayResult114 = biokutleResult22 * value22;
const arrayResult115 = biokutleResult33 * value33;
// ------------------------------------

// ---------benzin-------------------
const arrayResult116 = benzinResult11 * value11;
const arrayResult117 = benzinResult22 * value22;
const arrayResult118 = benzinResult33 * value33;
// ------------------------------------

export const CalculateFuction = (funcKaynak,funcMiktar) =>{

    if(funcKaynak === 'Doğal Gaz'){
        return ((funcMiktar * (arrayResult11+arrayResult22+arrayResult33)))
    }
    else if(funcKaynak === 'Linyit Kömürü'){
      return ((funcMiktar * (arrayResult110+arrayResult111+arrayResult112)))
    }
    else if(funcKaynak === 'Benzin'){
      return ((funcMiktar * (arrayResult116+arrayResult117+arrayResult118)))
    }
    else if(funcKaynak === 'Dizel Yakıt'){
      return ((funcMiktar * (arrayResult44+arrayResult55+arrayResult66)))
    }
    else if(funcKaynak === "Sıvılaştırılmış Petrol Gazları (LPG)"){
      return ((funcMiktar * (arrayResult77+arrayResult88+arrayResult99)))
    }
    else if(funcKaynak === 'Yaş Biokütle'){
      return ((funcMiktar * (arrayResult113+arrayResult114+arrayResult115)))
    }
    else if(funcKaynak === 'Elektrik'){
       return ((funcMiktar  / 1000) * 0.6345)
    }
    else if(funcKaynak === 'Yangın Söndürme Tüpü'){
      return  (4 * funcMiktar )
    }
    else if(funcKaynak === 'R22'){
      return  (0.001 * 1760 * funcMiktar )
    }
    else if(funcKaynak === '134a'){
      return  (0.001  * 1300 * funcMiktar )
    }
    // else if(funcKaynak === 'R600a'){
    //   return  (0.1  * 1300 * funcMiktar )
    // }
    // R134a -
    // R134a1
    // R410a +
    // CO2 +
    // R32 -
    // HFC32 +
    // R601 +
    // R601a +

    else if(funcKaynak === 'R410a'){
      return  (0.001  * 2088 * funcMiktar )
    }
    else if(funcKaynak === 'HFC32'){
      return  (0.001  * 675 * funcMiktar )
    }
    else if(funcKaynak === 'R600A'){
      return  (0.001 * 1300 * funcMiktar )
    }
    else if(funcKaynak === 'R601'){
      return  (0.001  * 1300 * funcMiktar )
    }
    else if(funcKaynak === 'R601a'){
      return  (0.001  * 1300 * funcMiktar )
    }
    else if(funcKaynak === 'R134a1'){
      return  (0.001  * 1300 * funcMiktar )
    }
    else if(funcKaynak === 'CO2'){
      return  (0.001  * 1300 * funcMiktar )
    }
  }

// buzdolap secerken 0.1
// su sebili 0.1
// ciller 2
// endustiel sogutucu 7
// klimima 1
