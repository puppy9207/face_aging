import './App.css';
import { createGlobalStyle } from 'styled-components';
import TopBarTemplate from './components/TopBar';
import MainContainerTemplate from './components/MainContainer';
import LeftContainerTemplate from './components/LeftContainer';
import RightContainerTemplate from './components/RightContainer';
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
      <LeftContainerTemplate>으아아</LeftContainerTemplate>
      <RightContainerTemplate>호호호</RightContainerTemplate>
    </MainContainerTemplate>
    </>
  );
}

export default App;
