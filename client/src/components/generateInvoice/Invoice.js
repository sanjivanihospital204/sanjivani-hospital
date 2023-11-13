import React from "react";
import { Page, Document, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../../images/illustration_avatar.png";
import InvoiceTitle from "./InvoiceTitle";
import InvoiceNo from "./InvoiceNo";
import BillTo from "./BillTo";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import InvoiceItemsTable from "./InvoiceItemsTable";
import PatientData from "./PatientData";

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 84,
        height: 70,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

const PdfDocument = ({ invoicedata, patient }) => {
    return (
        <Document>
            {/* <Page size="A4" style={styles.page} > */}
                {/* <Image style={styles.logo} src={logo} /> */}
                {/* <InvoiceTitle title={'Invoice'} /> */}
                <PatientData patient={patient} />
                {/* <InvoiceNo invoice={invoicedata} /> */}
                {/* <BillTo invoice={invoicedata} /> */}
                {/* <InvoiceItemsTable invoice={invoicedata} /> */}
                {/* <InvoiceThankYouMsg /> */}
            {/* </Page> */}
        </Document>
    );
}

export default PdfDocument;