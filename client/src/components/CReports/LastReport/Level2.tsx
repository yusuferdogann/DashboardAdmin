import { Input } from "@material-tailwind/react";

const Level2 = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 xl:grid-cols-2 2xl:gap-3.5 dark:bg-boxdark items-center mt-10 border border-slate-300  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5 bg-white">
        <div><span>Kurululuş Adı(opsiyonel)</span></div>
        <div><Input variant="standard" label="Kurululuş Adı(opsiyonel)" /></div>
        <div><span>Kurululuş Adı</span></div>
        <div><Input variant="standard" label="Kurululuş Adı" /></div>
        <div><span>Üretim Konusu</span></div>
        <div><Input variant="standard" label="Üretim Konusu" /></div>
        <div><span>Posta Kodu</span></div>
        <div><Input variant="standard" label="Posta Kodu" /></div>
        <div><span>P.O. Box</span></div>
        <div><Input variant="standard" label="P.O. Box" /></div>
        <div><span>Şehir</span></div>
        <div><Input variant="standard" label="Şehir" /></div>
        <div><span>Ülke</span></div>
        <div><Input variant="standard" label="Ülke" /></div>
        <div><span>Ülke Kodu</span></div>
        <div><Input variant="standard" label="Ülke Kodu" /></div>
        <div><span>Ana Emisyon Kaynağının Koorinatı(Enlem)</span></div>
        <div><Input variant="standard" label="Ana Emisyon Kaynağının Koorinatı(Enlem)" /></div>
        <div><span>Ana Emisyon Kaynağının Koorinatı(Boylam)</span></div>
        <div><Input variant="standard" label="Ana Emisyon Kaynağının Koorinatı(Boylam)" /></div>
        <div><span>Yetkili Temsilcinin Adı</span></div>
        <div><Input variant="standard" label="Yetkili Temsilcinin Adı" /></div>
        <div><span>E-Mail</span></div>
        <div><Input variant="standard" label="E-Mail" /></div>
        <div><span>Telefon</span></div>
        <div><Input variant="standard" label="Telefon" /></div>
    </div>
  )
}

export default Level2