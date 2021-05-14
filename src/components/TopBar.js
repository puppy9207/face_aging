import React from 'react';
import styled from 'styled-components';
import imgA from '../static/logo.png';
const TopBarTemplateBlock = styled.div`

  position: fixed; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: #96CCF5;
  width:100%;
  height:3rem;
  color:white;
  margin-top:-5rem;
  padding:12px 12px 10px 2.5rem;
  display:flex;
  z-index:2;
`;

function TopBarTemplate() {
  return <TopBarTemplateBlock>
    <img src={ imgA } />
</TopBarTemplateBlock>;
}

export default TopBarTemplate;