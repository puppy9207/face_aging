import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
const RightTemplateBlock = styled.div`
  background: #898989;
  height:50rem;
  border-radius: 16px;
  padding:10px;
`;

function RightContainerTemplate({ children }) {
  return <Grid item sm={3} xs={12}>
          <RightTemplateBlock>
            {children}
          </RightTemplateBlock></Grid>
}

export default RightContainerTemplate;