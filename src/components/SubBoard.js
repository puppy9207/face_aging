import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';
import Paper from '@material-ui/core/Paper';
const MainBoardBlock = styled.div`
  background: #ef39ee;
`;
const columns = [
    { field: 'id', headerName: 'ID'},
    { field: 'firstName', headerName: 'First name'},
    { field: 'lastName', headerName: 'Last name'},
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

function MainBoardTemplate() {
  return<Grid item sm={6} xs={12}><MainBoardBlock>
      
        <Paper style={{ height: 400}}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
        </Paper>
      
    </MainBoardBlock></Grid>;
}

export default MainBoardTemplate;