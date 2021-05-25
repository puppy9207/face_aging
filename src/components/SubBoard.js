import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';
import Paper from '@material-ui/core/Paper';
const MainBoardBlock = styled.div`
  background: #ef39ee;
`;
const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'content', headerName: 'Content', width: 450 },
    { field: 'vote', headerName: 'Vote', width: 200 }
  ];
  
  const rows = [
    { id: 1, date: '2021-05-12', content: "사용자 게시판입니다. 새로운 내용이 들어갈지는 모르겠네요" ,vote:15},
    { id: 2, date: '2021-05-12', content: "사용자 게시판입니다. 새로운 내용이 들어갈지는 모르겠네요" ,vote:0},
    { id: 3, date: '2021-05-12', content: "사용자 게시판입니다. 새로운 내용이 들어갈지는 모르겠네요" ,vote:0},
    { id: 4, date: '2021-05-12', content: "사용자 게시판입니다. 새로운 내용이 들어갈지는 모르겠네요" ,vote:0},
    { id: 5, date: '2021-05-12', content: "사용자 게시판입니다. 새로운 내용이 들어갈지는 모르겠네요" ,vote:15},
    { id: 6, date: '2021-05-12', content: "사용자 게시판입니다. 새로운 내용이 들어갈지는 모르겠네요" ,vote:0},
    { id: 7, date: '2021-05-12', content: "사용자 게시판입니다. 새로운 내용이 들어갈지는 모르겠네요" ,vote:0},
    { id: 8, date: '2021-05-12', content: "사용자 게시판입니다. 새로운 내용이 들어갈지는 모르겠네요" ,vote:0},
    { id: 9, date: '2021-05-12', content: "사용자 게시판입니다. 새로운 내용이 들어갈지는 모르겠네요" ,vote:15},
    { id: 10, date: '2021-05-12', content: "사용자 게시판입니다. 새로운 내용이 들어갈지는 모르겠네요" ,vote:0},
    { id: 11, date: '2021-05-12', content: "사용자 게시판입니다. 새로운 내용이 들어갈지는 모르겠네요" ,vote:0},
    { id: 12, date: '2021-05-12', content: "사용자 게시판입니다. 새로운 내용이 들어갈지는 모르겠네요" ,vote:0},
  ];

function MainBoardTemplate() {
  return<Grid item sm={6} xs={12}><MainBoardBlock>
      
        <Paper style={{ height: 400}}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
        </Paper>
      
    </MainBoardBlock></Grid>;
}

export default MainBoardTemplate;