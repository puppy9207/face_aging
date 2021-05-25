import styled from 'styled-components';
import CropImage from './CropImage'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { useState } from 'react';
import Loader from "react-loader-spinner";
const LoadingTemplateBlock = styled.div`
  position:absolute;
  top:40%;
  left:50%;
  transform: translate(-50%,50%)
`
const MainTemplateBlock = styled.div`
  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  margin: 2rem 1rem 1rem 1rem;
  padding: 1rem;
`;

function MainContainerTemplate(props) {
  const [model, setModel] = useState(false);
  const [imgLink, setImgLink] = useState("initial");
  const [loading, setLoading] = useState(false);
  return <> 
  {model ? 
    <p>{imgLink}</p> 
    
    
    :loading? 
        <LoadingTemplateBlock>
            <Loader
            type="Puff"
            color="#978875"
            height={100}
            width={100} 
          />
        </LoadingTemplateBlock>


        :
        <MainTemplateBlock >
          <CropImage setModel={setModel} setImgLink={setImgLink} setLoading={setLoading} setPage={props.setPage}></CropImage>
        </MainTemplateBlock>}</>
}

export default MainContainerTemplate;