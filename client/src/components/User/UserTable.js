import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from "react";
import { useNavigate } from 'react-router';
import { getDateFormate } from '../../Services/util';

const UserTable = ({ records }) => {

  const [tableData, setTableData] = React.useState({});
  const navigate = useNavigate();


  useEffect(() => {
    // setUserData(records);
    const t_data =
      Object.keys(records).length > 0 &&
      records.map((item, index) => {
        return {
          ...item,
          id: index + 1,
          date: getDateFormate(item.date),
        };
      });
    setTableData(t_data);
  }, [records]);

  const columns = [
    { field: 'id', headerName: 'No.', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 80 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    {
      field: 'address',
      headerName: 'Address',
      width: 180,
    },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'edit', headerName: 'Edit', width: 70, renderCell: renderEditCell },
    { field: 'delete', headerName: 'Delete', width: 70, renderCell: renderDeleteCell },
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

  function renderDeleteCell(params) {
    const handleDeleteClick = () => {
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
