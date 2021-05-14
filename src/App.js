import './App.css';
import { createGlobalStyle } from 'styled-components';
import TopBarTemplate from './components/TopBar';
import MainContainerTemplate from './components/MainContainer';
import LeftContainerTemplate from './components/LeftContainer';
import RightContainerTemplate from './components/RightContainer';
import CropTemplate from './components/CropImage';
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <>
    <GlobalStyle />
    <TopBarTemplate></TopBarTemplate>
    <MainContainerTemplate>
      <LeftContainerTemplate>
        <CropTemplate></CropTemplate>
        </LeftContainerTemplate>
      <RightContainerTemplate>호호호</RightContainerTemplate>
    </MainContainerTemplate>
    </>
  );
}

export default App;
