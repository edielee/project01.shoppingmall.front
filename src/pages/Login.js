import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { shadow } from "../lib/styleUtil";
import { Link, useNavigate } from "react-router-dom";
import InputWithLabel from "../Components/Input";
import AuthButton from "../Components/Button";
import Swal from "sweetalert2";

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
function Login() {
  const [inputId, setInputId] = React.useState("");
  const [inputPw, setInputPw] = React.useState("");

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  async function postData() {
    try {
      const response = await fetch("http://localhost:8989/login", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          id: inputId,
          pw: inputPw,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          return data;
        });

      return response;
    } catch (e) {
      console.log(e);
    }
  }

  const navigate = useNavigate();
  // login 버튼 클릭 이벤트

  const goJoin = () => {
    navigate("/pages/Join");
  };

  const loginSubmit = async () => {
    let data = "";
    if (inputId === "") {
      Swal.fire({
        title: "경고",
        html: "아이디를 입력해주세요",
        icon: "error",
      });
    } else if (inputPw === "") {
      Swal.fire({
        title: "경고",
        html: "비밀번호를 입력해주세요",
        icon: "error",
      });
    } else {
      data = await postData();
    }

    if (data.message === "로그인에 성공하였습니다.") {
      Swal.fire({
        title: "성공",
        html: "로그인에 성공하였습니다",
        icon: "success",
      });
      sessionStorage.setItem("userId", inputId);
      localStorage.setItem("id", data.id);
      localStorage.setItem("pw", data.pw);
      localStorage.setItem("name", data.name);
      /*navigate("/");*/
    } else if (data.message === "로그인에 실패하였습니다.") {
      Swal.fire({
        title: "실패",
        html: "로그인에 실패하였습니다. 아이디/비밀번호를 확인하여 주세요",
        icon: "error",
      });
    }
  };

  return (
    <Positioner>
      <ShadowedBox>
        <Contents>
          <Wrapper>
            <Title>로그인</Title>
            <InputWithLabel
              label="ID"
              name="ID"
              placeholder="아이디를 입력해주세요"
              onChange={handleInputId}
            ></InputWithLabel>
            <InputWithLabel
              label="PASSWORD"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleInputPw}
              type="password"
            ></InputWithLabel>
            <AuthButton onClick={loginSubmit}>LOGIN</AuthButton>
            <AuthButton onClick={goJoin}>JOIN</AuthButton>
          </Wrapper>
        </Contents>
      </ShadowedBox>
    </Positioner>
  );
}

export default Login;
