import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Main from "../../images/cover/kapakpdf.jpg"
import Pdf2 from "../../images/pdfpage/pdf-2.jpg"
import Pdf3 from "../../images/pdfpage/pdf-3.jpg"
import Pdf4 from "../../images/pdfpage/pdf-4.jpg"
import Pdf5 from "../../images/pdfpage/pdf-5.jpg"
import Pdf6 from "../../images/pdfpage/pdf-6.jpg"
import Pdf7 from "../../images/pdfpage/pdf-7.jpg"
import Pdf8 from "../../images/pdfpage/pdf-8.jpg"
import Pdf9 from "../../images/pdfpage/pdf-9.jpg"
import Pdf10 from "../../images/pdfpage/pdf-10.jpg"
import Pdf11 from "../../images/pdfpage/pdf-11.jpg"
import Pdf12 from "../../images/pdfpage/pdf-12.jpg"
import Pdf13 from "../../images/pdfpage/pdf-13.jpg"
import Pdf14 from "../../images/pdfpage/pdf-14.jpg"
import Pdf15 from "../../images/pdfpage/pdf-15.jpg"
import Pdf16 from "../../images/pdfpage/pdf-16.jpg"
import Pdf17 from "../../images/pdfpage/pdf-17.jpg"
import Pdf18 from "../../images/pdfpage/pdf-18.jpg"
import Pdf19 from "../../images/pdfpage/pdf-19.jpg"
import Pdf20 from "../../images/pdfpage/pdf-20.jpg"
import Pdf21 from "../../images/pdfpage/pdf-21.jpg"
import Pdf22 from "../../images/pdfpage/pdf-22.jpg"
import Pdf23 from "../../images/pdfpage/pdf-23.jpg"
import Pdf24 from "../../images/pdfpage/pdf-24.jpg"
import Pdf25 from "../../images/pdfpage/pdf-25.jpg"
import Pdf26 from "../../images/pdfpage/pdf-26.jpg"
import Pdf27 from "../../images/pdfpage/pdf-27.jpg"
import Pdf28 from "../../images/pdfpage/pdf-28.jpg"
import Pdf29 from "../../images/pdfpage/pdf-29.jpg"
import Pdf30 from "../../images/pdfpage/pdf-30.jpg"
import Pdf31 from "../../images/pdfpage/pdf-31.jpg"
import Pdf32 from "../../images/pdfpage/pdf-32.jpg"
import Pdf33 from "../../images/pdfpage/pdf-33.jpg"
import Pdf34 from "../../images/pdfpage/pdf-34.jpg"
import Pdf35 from "../../images/pdfpage/pdf-35.jpg"
import Pdf36 from "../../images/pdfpage/pdf-36.jpg"
import Pdf37 from "../../images/pdfpage/pdf-37.jpg"
import Pdf38 from "../../images/pdfpage/pdf-38.jpg"


const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: 'none',
        width: "100%"
    },
    section: {
        margin: 10,
        padding: 10,

    },
    logo: {
        width: '150px',
        height: "100px",
        borderRadius: "10px",
        margin:10,
        padding:10
    },
    duzen: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    }
});

const PdfView = () => {
    return (
        <Document
            pageMode='fullScreen'
        >
            <Page size="A4" style={styles.page}><Image src={Main} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf2} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf3} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf4} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf5} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf6} /></Page>

            <Page size="A4" style={styles.page}><Image src={Pdf7} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf8} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf9} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf10} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf11} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf12} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf13} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf14} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf15} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf16} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf17} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf18} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf19} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf20} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf21} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf22} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf23} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf24} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf25} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf26} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf27} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf28} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf29} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf30} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf31} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf32} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf33} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf34} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf35} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf36} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf37} /></Page>
            <Page size="A4" style={styles.page}><Image src={Pdf38} /></Page>
            
            
        </Document>
    )
}
export default PdfView