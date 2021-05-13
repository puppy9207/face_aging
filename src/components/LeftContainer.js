import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
const LeftTemplateBlock = styled.div`
  background: #D7D7D7;
  height: 50rem;
  border-radius: 16px;
  padding:10px;
`;

function LeftContainerTemplate({ children }) {
  return <Grid item sm={9} xs={12}>
          <LeftTemplateBlock>
            {children}
          </LeftTemplateBlock></Grid>
}

export default LeftContainerTemplate;