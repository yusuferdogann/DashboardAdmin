import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

const ExcelExportHelper = ({ data }) => {
  const createDownLoadData = () => {
    handleExport().then((url) => {
      console.log(url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "student_report.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };

    const wbout = XLSX.write(workbook, wopts);

    // The application/octet-stream MIME type is used for unknown binary files.
    // It preserves the file contents, but requires the receiver to determine file type,
    // for example, from the filename extension.
    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const s2ab = (s) => {
    // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
    // create an ArrayBuffer with a size in bytes
    const buf = new ArrayBuffer(s.length);

    console.log(buf);

    //create a 8 bit integer array
    const view = new Uint8Array(buf);

    console.log(view);
    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      console.log(s.charCodeAt(i));
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = () => {
    const title = [{ A: "A. Sheet 'A_InstData' - General information, production processes and purchased precursors " }, {}];

    let table1 = [{ A: "2. KURULUŞ BİLGİLERİ" }, {}];

    let table2 = [
      {
        A: "ID",
        B: "Toplu Ürün kategorisi",
        C: "Route",
        D: "Route 1",
        E: "Route 2",
        F: "Route 3",
        G: "Route 4",
        H: "Route 5",
        I: "Route 6"
      },
    ];
    let table3 = [
      {
        A: "ID",
        B: "Aggregated goods category",
        C: "1",
        D: "2",
        E: "3",
        F: "4",
        G: "5",
        H: "6",
        I: "Name",
        J: "Error Message"
      },
    ];
    let table4 = [
      {
        A: "ID",
        B: "Production Process",
        C: "Country Code",
        D: "Route 1",
        E: "Route 2",
        F: "Route 3",
        G: "Route 4",
        H: "Route 5",
        I: "Name",
        J: "Error"
      },
    ];
    let table5 = [
      {
        A: "#",
        B: "Method",
        C: "Kaynak Akışları",
        D: "Activity Data(AD)",
        E: "AD Unit",
        F: "Fatura Değeri(m3)",
        G: "Üretim Yüzdesi",
      },
    ];
    let table6 = [
      {
        A: "ID",
        B: "Kaynak Akış Adı",
        C: "Unit",
        D: "Üretim Yüzdesi",
        E: "NaN(Girilmesi Gereken)",
        F: "Faturadaki kWh Değeri",
      },
    ];
    let table7 = [
      {
        A: "ID",
        B: "Total Production Levels",
        C: "Production Route",
        D: "Unit",
        E: "Üretilen Adet",
        F: "Satılan Adet",
      },
    ];

    data.forEach((row) => {
      const studentDetails = row.STUDENT_DETAILS;

      table1.push({
        A: studentDetails.id,
        B: studentDetails.name,
        C: studentDetails.parentName,
        D: studentDetails.classroom,
        E: studentDetails.subject,
        F: studentDetails.division,
        G: studentDetails.status,
      });
    });

    data.forEach((row) => {
      const marksDetails = row.MARKS;

      table2.push({
        A: marksDetails?.id,
        B: marksDetails?.name,
        C: marksDetails?.maths,
        D: marksDetails?.physics,
        E: marksDetails?.chemistry,
        F: marksDetails?.english,
        G: marksDetails?.computerScience,
        H: marksDetails?.maths,
        I: marksDetails?.maths

      });
    })

    data.forEach((row) => {
      const newTable = row.TABLE3;

      table3.push({
        A: newTable?.id,
        B: newTable?.name,
        C: newTable?.parentName,


      });
    })
    data.forEach((row) => {
      const newTable = row.TABLE4;

      table4.push({
        A: newTable?.id,
        B: newTable?.name,
        C: newTable?.parentName,


      });
    })
    data.forEach((row) => {
      const newTable = row.TABLE5;

      table5.push({
        A: newTable?.id,
        B: newTable?.name,
        C: newTable?.parentName,
      });
    })
    data.forEach((row) => {
      const newTable = row.TABLE6;

      table6.push({
        A: newTable?.id,
        B: newTable?.name,
        C: newTable?.parentName,
        D: newTable?.percent,
        E: newTable?.nan,
        F: newTable?.kwh
      });
    })
    data.forEach((row) => {
      const newTable = row.TABLE7;

      table7.push({
        A: newTable?.id,
        B: newTable?.name,
        C: newTable?.parentName,
        D: newTable?.percent,
        E: newTable?.nan,
        F: newTable?.kwh
      });
    })

    table1 = [{ A: "Student Details" }]
      .concat(table1)
      .concat([""])
      .concat([{ A: "3. TOPLU ÜRÜN KATEGORİLERİ" }])
      .concat(table2)
      .concat([""])
      .concat([{ A: "4. İLGİLİ ÜRETİM SÜREÇLERİ" }])
      .concat(table3)
      .concat([""])
      .concat([{ A: "5. SATIN ALINAN ÜRÜNLER" }])
      .concat(table4)
      .concat([""])
      .concat([{ A: "6. KAYNAK AKIŞLARI VE EMİSYON KAYNAKLARI" }])
      .concat([{ A: "(a)	Hesaplamaya dayalı yaklaşımlar: Kaynak Akışları (PFC emisyonları hariç)" }])
      .concat(table5)
      .concat([""])
      .concat([{ A: "7. ELEKTRİK" }])
      .concat(table6)
      .concat([""])
      .concat([{ A: "8. ÜRETİLEN VE SATILAN ÜRÜNLER" }])
      .concat(table7)

    const finalData = [...title, ...table1];

    console.log(finalData);

    //create a new workbook
    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "student_report");

    // binary large object
    // Since blobs can store binary data, they can be used to store images or other multimedia files.

    const workbookBlob = workbook2blob(wb);

    var headerIndexes = [3, 20, 37, 54, 71, 89, 106];
    // finalData.forEach((data, index) =>
    //   data["A"] === "Enrolment No." ? headerIndexes.push(index) : null
    // );
    console.log("index----------------", headerIndexes)
    const totalRecords = data.length;

    const dataInfo = {
      titleCell: "A2",
      titleRange: "A1:H2",
      tbodyRange: `A3:H${finalData.length}`,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:H${headerIndexes[0] + 1}`
          : null,


      theadTitle1:
        headerIndexes?.length >= 1
          ? `A${22}:I${22}`
          : null,


      theadRange1:
        headerIndexes?.length >= 2
          ? `A${headerIndexes[1] + 1}:I${headerIndexes[1] + 1}`
          : null,

      theadRange2:
        headerIndexes?.length >= 3
          ? `A${headerIndexes[2] + 1}:J${headerIndexes[2] + 1}`
          : null,

      theadRange3:
        headerIndexes?.length >= 3
          ? `A${headerIndexes[3] + 1}:J${headerIndexes[3] + 1}`
          : null,

      theadRange4:
        headerIndexes?.length >= 3
          ? `A${headerIndexes[4] + 1}:J${headerIndexes[4] + 1}`
          : null,

      theadRange5:
        headerIndexes?.length >= 3
          ? `A${headerIndexes[5] + 1}:J${headerIndexes[5] + 1}`
          : null,


      theadRange6:
        headerIndexes?.length >= 3
          ? `A${headerIndexes[6] + 1}:J${headerIndexes[6] + 1}`
          : null,



      tFirstColumnRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:A${totalRecords + 20}`
          : null,
      tLastColumnRange:
        headerIndexes?.length >= 1
          ? `G${headerIndexes[0] + 1}:G${totalRecords + headerIndexes[0] + 1}`
          : null,

      tFirstColumnRange1:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[1] + 1}:A${totalRecords + headerIndexes[1] + 1}`
          : null,
      tLastColumnRange1:
        headerIndexes?.length >= 1
          ? `H${headerIndexes[0] + 1}:H${totalRecords + headerIndexes[1] + 1}`
          : null,
    };

    return addStyle(workbookBlob, dataInfo);
  };

  const addStyle = (workbookBlob, dataInfo) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      workbook.sheets().forEach((sheet) => {
        sheet.usedRange().style({
          fontFamily: "Arial",
          verticalAlignment: "center",
        });

        sheet.column("A").width(15);
        sheet.column("B").width(15);
        sheet.column("C").width(15);
        sheet.column("E").width(15);
        sheet.column("G").width(15);

        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        if (dataInfo.tbodyRange) {
          sheet.range(dataInfo.tbodyRange).style({
            horizontalAlignment: "center",
          });
        }

        sheet.range(dataInfo.theadRange).style({
          fill: "376466",
          bold: true,

          horizontalAlignment: "center",
          fontColor: "ffffff",
        });
        sheet.range(dataInfo.theadTitle1).style({
          bold: true,
          horizontalAlignment: "center",
          fontColor: "000000",
        });
        if (dataInfo.theadRange1) {
          sheet.range(dataInfo.theadRange1).style({
            fill: "376466",
            bold: true,
            horizontalAlignment: "center",
            fontColor: "ffffff",
          });
        }

        if (dataInfo.theadRange2) {
          sheet.range(dataInfo.theadRange2).style({
            fill: "376466",
            bold: true,
            horizontalAlignment: "center",
            fontColor: "ffffff",
          });
        }
        if (dataInfo.theadRange3) {
          sheet.range(dataInfo.theadRange3).style({
            fill: "376466",
            bold: true,
            horizontalAlignment: "center",
            fontColor: "ffffff",
          });
        }
        if (dataInfo.theadRange4) {
          sheet.range(dataInfo.theadRange4).style({
            fill: "376466",
            bold: true,
            horizontalAlignment: "center",
            fontColor: "ffffff",
          });
        }
        if (dataInfo.theadRange5) {
          sheet.range(dataInfo.theadRange5).style({
            fill: "376466",
            bold: true,
            horizontalAlignment: "center",
            fontColor: "ffffff",
          });
        }
        if (dataInfo.theadRange6) {
          sheet.range(dataInfo.theadRange6).style({
            fill: "376466",
            bold: true,
            horizontalAlignment: "center",
            fontColor: "ffffff",
          });
        }
        if (dataInfo.tFirstColumnRange) {
          sheet.range(dataInfo.tFirstColumnRange).style({
            bold: true,
          });
        }

        if (dataInfo.tLastColumnRange) {
          sheet.range(dataInfo.tLastColumnRange).style({
            bold: true,
          });
        }

        if (dataInfo.tFirstColumnRange1) {
          sheet.range(dataInfo.tFirstColumnRange1).style({
            bold: true,
          });
        }

        if (dataInfo.tLastColumnRange1) {
          sheet.range(dataInfo.tLastColumnRange1).style({
            bold: true,
          });
        }
      });

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <button
      onClick={() => {
        createDownLoadData();
      }}
      className="btn btn-primary float-end"
    >
      Export
    </button>
  );
};

export default ExcelExportHelper;