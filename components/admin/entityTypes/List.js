import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import ModelActionMenu from '../../ModelActionMenu';
import Edit from './Edit';

export default function List({ data = [] }) {
  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell(params) {
        return (
          <ModelActionMenu
            url="/api/entity-types"
            row={params.row}
            Edit={Edit}
          />
        );
      },
    },
  ];

  return (
    <Box>
      <DataGrid rows={data} columns={columns} autoHeight />
    </Box>
  );
}
