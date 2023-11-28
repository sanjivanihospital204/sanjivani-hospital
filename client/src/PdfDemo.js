import { createContext } from "react";
// import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

// elements
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import './App.css';
import PdfDocument from './components/generateInvoice/Invoice';
import InvoiceData from './jsonData/InvoiceData';
import PatientData from "./components/generateInvoice/PatientData";
import PatientBill from "./components/generateInvoice/PatientBill";
import InvoiceTableRow from "./components/generateInvoice/InvoiceTableRow";

export const MessageBarContext = createContext();


const PdfDemo = () => {
  const fileName = "Invoice.pdf";
  const selectedPatientData = {};

  return (
    <div className="App">
      <PDFViewer width={800} height={500} showToolbar={false}>
      {/* <PatientData patient={selectedPatientData} /> */}
      {/* <PatientBill patient={selectedPatientData} /> */}

<InvoiceTableRow items={InvoiceData.items} />


        {/* <PdfDocument invoicedata={InvoiceData} /> */}
      </PDFViewer>

      <div className='download-link'>
        <PDFDownloadLink
          document={<PdfDocument invoicedata={InvoiceData} />}
          fileName={fileName}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading..." : "Download Invoice"
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default PdfDemo;
