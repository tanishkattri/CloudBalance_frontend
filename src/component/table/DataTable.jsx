import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const MuiDataTable = ({ columns, rows, pageSize = 10 }) => {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 25, 50, 100]}
        disableSelectionOnClick
        sx={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          fontFamily: 'Inter, sans-serif',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
            fontSize: '1rem',
            borderBottom: '1px solid #e0e0e0',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f0f0f0',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f9f9f9',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#f5f5f5',
            borderTop: '1px solid #e0e0e0',
          },
        }}
      />
    </div>
  );
};

export default MuiDataTable;
