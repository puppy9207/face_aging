import React from 'react';
import styled from 'styled-components';
const MainTemplateBlock = styled.div`
  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  margin: 2rem 1rem 1rem 1rem;
  padding: 1rem;
`;

function MainContainerTemplate({ children }) {
  return <MainTemplateBlock>
    {children.loading?<p>Loading</p>:children}
    </MainTemplateBlock>;
}

export default MainContainerTemplate;