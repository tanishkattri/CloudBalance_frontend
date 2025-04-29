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
            backgroundColor: '#edf2f7', 
            fontWeight: 'bold',
            fontSize: '1.05rem',
            textTransform: 'uppercase', 
            borderBottom: '2px solid #d1d5db', 
            color: '#374151', 
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f0f0f0',
            fontSize: '0.95rem',
            color: '#4b5563', 
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f9fafb', 
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#edf2f7',
            borderTop: '1px solid #d1d5db',
          },
        }}
      />
    </div>
  );
};

export default MuiDataTable;