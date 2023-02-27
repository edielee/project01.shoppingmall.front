import React from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import oc from "open-color";

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${oc.gray[8]};
  margin-bottom: 1rem;
`;

// 화면의 중앙에 위치시킨다
const Positioner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// 너비, 그림자 설정
const ShadowedBox = styled.div`
  width: 500px;
  border: 1px solid ${oc.gray[3]};
`;

// children 이 들어가는 곳
const Contents = styled.div`
  background: white;
  padding: 2rem;
  height: auto;
`;

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const Img = styled.img`
  width: 100%;
`;

function Home() {
  const navigate = useNavigate();

  return (
    <Positioner>
      <ShadowedBox>
        <Contents>
          <Wrapper>
            <Img src="/img/03.png" />
            <Title>로그인에 성공하셨습니다. 축하드려요... </Title>
          </Wrapper>
        </Contents>
      </ShadowedBox>
    </Positioner>
  );
}

export default Home;
