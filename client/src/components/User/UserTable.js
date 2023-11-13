import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDateFormate } from "../../Services/util";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfDocument from "../generateInvoice/Invoice";
import InvoiceData from "../../jsonData/InvoiceData";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import PatientData from "../generateInvoice/PatientData";

const UserTable = ({ records }) => {
  const [tableData, setTableData] = useState({});
  const [selectedPatientData, setSelectedPatientData] = useState({});
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handlePdfViewerClose = () => {
    setShowPdfViewer(false);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const filteredData =
      Object.keys(records).length > 0 &&
      records
        .filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((item, index) => ({
          ...item,
          id: index + 1,
          date: getDateFormate(item.date),
        }));

    setTableData(filteredData);
  }, [records, searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const columns = [
    { field: "id", headerName: "No.", width: 70 },
    { field: "date", headerName: "Date", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "age", headerName: "Age", width: 80 },
    { field: "gender", headerName: "Gender", width: 100 },
    {
      field: "address",
      headerName: "Address",
      width: 180,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 70,
      renderCell: renderEditCell,
    },
    {
      field: "letterPad",
      headerName: "Letter Pad",
      width: 70,
      renderCell: renderDownloadLetterPad,
    },
    // { field: 'delete', headerName: 'Delete', width: 70, renderCell: renderDeleteCell },
  ];

  function renderEditCell(params) {
    const handleEditClick = () => {
      // Handle the edit button click event
      const selectedFormData = params.row;
      const { _id } = selectedFormData;
      navigate(`/patient/${_id}`);
    };

    return (
      <IconButton onClick={handleEditClick}>
        <EditIcon />
      </IconButton>
    );
  }

  function renderDownloadLetterPad(params) {
    const handleDownloadLetterPadClick = () => {
      // Handle the edit button click event
      const selectedFormData = params.row;
      setShowPdfViewer(true);
      setSelectedPatientData(selectedFormData);
      console.log("row", params.row);
    };

    return (
      <IconButton onClick={handleDownloadLetterPadClick}>
        <FilePresentIcon />
      </IconButton>
    );
  }

  function renderDeleteCell(params) {
    const handleDeleteClick = () => {};

    return (
      <IconButton onClick={handleDeleteClick}>
        <DeleteIcon />
      </IconButton>
    );
  }

  function getDataByIndex(array, indices) {
    const result = [];
    for (const index of indices) {
      if (index >= 0 && index < array.length) {
        result.push(array[index]?._id);
      }
    }
    return result;
  }

  const handleSelectionChange = (selectedItems) => {
    const properties = getDataByIndex(tableData, selectedItems);
    // selectedProperties(properties);
  };

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleSearchChange}
          value={searchText}
        />
        <DataGrid
          rows={tableData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{
            overflowX: "scroll",
            width: `100%`,
          }}
          onRowSelectionModelChange={handleSelectionChange}
        />
      </div>
      {/* Dialog for PDF Viewer */}
      <Dialog
        open={showPdfViewer}
        onClose={handlePdfViewerClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          PDF Viewer
          <IconButton onClick={handlePdfViewerClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <PDFViewer width="100%" height="600px">
            {/* <PdfDocument
              invoicedata={InvoiceData}
              patient={selectedPatientData}
            /> */}
                <PatientData patient={selectedPatientData} />

          </PDFViewer>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserTable;
