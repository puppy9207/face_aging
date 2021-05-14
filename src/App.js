import './App.css';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import MainContainerTemplate from './components/MainContainer';
import LeftContainerTemplate from './components/LeftContainer';
import RightContainerTemplate from './components/RightContainer';
import CropTemplate from './components/CropImage';
import imgA from './static/logo.png';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const TopBarTemplateBlock = styled.div`

  position: fixed; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: #978875;
  width:100%;
  height:3rem;
  color:white;
  margin-top:-5rem;
  padding:8px 12px 12px 2.5rem;
  display:flex;
  z-index:2;
`;

function App() {
  return (
    <>
    <GlobalStyle />
    <TopBarTemplateBlock>
      <Grid container>
        <Grid item sm={3} xs={12}><a href="#"><img width="25%" src={ imgA }/></a></Grid>
        <Grid item sm={6} xs={0} ></Grid>
        <Grid item sm={1} xs={0}><p>BEST STYLE</p></Grid>
        <Grid item sm={1} xs={0}><p>머리스타일링</p></Grid>
        <Grid item sm={1} xs={0}><p>사용자</p></Grid>
      </Grid>
    </TopBarTemplateBlock>
    <MainContainerTemplate>
      <LeftContainerTemplate>
        <CropTemplate></CropTemplate>
        </LeftContainerTemplate>
      <RightContainerTemplate></RightContainerTemplate>
    </MainContainerTemplate>
    </>
  );
}

export default App;
