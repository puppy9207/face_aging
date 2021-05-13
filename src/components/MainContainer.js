import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
const MainTemplateBlock = styled.div`
  height: 100%;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  margin: 5rem 1rem 1rem 1rem;
  padding: 1rem;
`;

function MainContainerTemplate({ children }) {
  return <MainTemplateBlock>
    <Grid container spacing={1}>
    {children}
    </Grid>
    </MainTemplateBlock>;
}

export default MainContainerTemplate;