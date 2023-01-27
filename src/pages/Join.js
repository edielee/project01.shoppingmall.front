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

function Join() {
  const [inputId, setInputId] = React.useState("");
  const [inputPw, setInputPw] = React.useState("");
  const [inputName, setInputName] = React.useState("");
  const [inputAdress, setInputAdress] = React.useState("");
  const [inputNumber, setInputNumber] = React.useState("");
  const [inputBirth, setInputBirth] = React.useState("");

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };
  const handleInputName = (e) => {
    setInputName(e.target.value);
  };
  const handleInputAdress = (e) => {
    setInputAdress(e.target.value);
  };
  const handleInputNumber = (e) => {
    setInputNumber(e.target.value);
  };
  const handleInputBirth = (e) => {
    setInputBirth(e.target.value);
  };

  async function postData() {
    try {
      const response = await fetch("http://localhost:8989/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          id: inputId,
          pw: inputPw,
          name: inputName,
        }),
      })
        .then((data) => data.text())
        .then((data) => {
          return data;
        });

      return response;
    } catch (e) {
      console.log(e);
    }
  }

  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/pages/Login");
  };
  // login 버튼 클릭 이벤트
  const signSubmit = async () => {
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
    } else if (inputName === "") {
      Swal.fire({
        title: "경고",
        html: "이름을 입력해주세요",
        icon: "error",
      });
    } else if (inputAdress === "") {
      Swal.fire({
        title: "경고",
        html: "주소를 입력해주세요",
        icon: "error",
      });
    } else if (inputNumber === "") {
      Swal.fire({
        title: "경고",
        html: "전화번호를 입력해주세요",
        icon: "error",
      });
    } else if (inputBirth === "") {
      Swal.fire({
        title: "경고",
        html: "생년월일을 입력해주세요",
        icon: "error",
      });
    } else {
      data = await postData();
    }

    if (data === "성공") {
      Swal.fire({
        title: "성공",
        html: "회원가입에 성공하였습니다",
        icon: "success",
      });
      navigate("/pages/Login");
    } else if (data === "실패") {
      Swal.fire({
        title: "실패",
        html: "회원가입에 성공하였습니다. 관리자에게 문의해주세요.",
        icon: "error",
      });
    }
  };

  return (
    <Positioner>
      <ShadowedBox>
        <Contents>
          <Wrapper>
            <Title>회원가입</Title>
            <InputWithLabel
              label="NAME"
              name="name"
              placeholder="이름을 입력해주세요"
              onChange={handleInputName}
            ></InputWithLabel>
            <InputWithLabel
              label="ID"
              name="ID"
              placeholder="아이디를 입력해주세요"
              onChange={handleInputId}
            ></InputWithLabel>
            <InputWithLabel
              label="PASSWORD"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleInputPw}
            ></InputWithLabel>
            <InputWithLabel
              label="BIRTH"
              name="birth"
              placeholder="생년월일을 입력해주세요"
              onChange={handleInputBirth}
            ></InputWithLabel>
            <InputWithLabel
              label="ADRESS"
              name="adress"
              placeholder="주소를 입력해주세요"
              onChange={handleInputAdress}
            ></InputWithLabel>
            <InputWithLabel
              label="NUMBER"
              name="number"
              placeholder="전화번호를 입력해주세요"
              onChange={handleInputNumber}
            ></InputWithLabel>

            <AuthButton onClick={signSubmit}>JOIN</AuthButton>
            <AuthButton onClick={goLogin}>LOGIN</AuthButton>
          </Wrapper>
        </Contents>
      </ShadowedBox>
    </Positioner>
  );
}

export default Join;
