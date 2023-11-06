import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from "react";

const UserTable = ({ records }) => {

  console.log("records", records);
  const [tableData, setTableData] = React.useState({});


  useEffect(() => {
    // setUserData(records);
    const t_data =
      Object.keys(records).length > 0 &&
      records.map((item, index) => {
        return {
          id: index + 1,
          ...item,
        };
      });
    setTableData(t_data);
  }, [records]);

  const columns = [
    { field: 'id', headerName: 'No.', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
    {
      field: 'address',
      headerName: 'Address',
      width: 200,
    },
    { field: 'edit', headerName: 'Edit', width: 70, renderCell: renderEditCell },
    { field: 'delete', headerName: 'Delete', width: 70, renderCell: renderDeleteCell },
  ];

  function renderEditCell(params) {
    const handleEditClick = () => {
      // Handle the edit button click event
      const selectedFormData = params.row;
      console.log("selectedFormData", selectedFormData);
    };

    return (
      <IconButton onClick={handleEditClick}>
        <EditIcon />
      </IconButton>
    );
  }

  function renderDeleteCell(params) {
    const handleDeleteClick = () => {
      // Handle the edit button click event
      // const selectedFormData = params.row;
      // const encrypted = CryptoJS.AES.encrypt(
      //   JSON.stringify(selectedFormData),
      //   constant.SESSION_OBJECT_SECRET_KEY
      // ).toString();
      // setSessionStorageObject(constant.PROPERTY_SESSION_KEY, encrypted);
      // navigate(`/user/add-property`);
    };

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
    <div style={{ height: 400, width: '100%' }}>
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
          overflowX: 'scroll',
          width: `100%`
        }}
        onRowSelectionModelChange={handleSelectionChange}
      />
    </div>
  );
};

export default UserTable;
