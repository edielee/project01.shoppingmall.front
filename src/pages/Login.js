import React from "react";
import styled from "styled-components";
import oc from "open-color";
import { Link, useNavigate } from "react-router-dom";
import InputWithLabel from "../Components/Input";
import AuthButton from "../Components/Button";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";

//axios.defaults.withCredentials = true;

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

const A = styled.a`
  text-decoration: none;
`;

//암호화
export const encrypt = (val) => {
  var ciphertext = CryptoJS.AES.encrypt(val, "secret key 123").toString();
  return ciphertext;
};

function Login() {
  const NAVER_ID = process.env.REACT_APP_NAVER_ID;
  const NVAER_SECRET = process.env.REACT_APP_NVAER_SECRET;

  const [inputId, setInputId] = React.useState("");
  const [inputPw, setInputPw] = React.useState("");

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    let lastpw = encrypt(e.target.value).toString();
    setInputPw(lastpw);
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

  const gokakao = () => {
    //카카오로그인 인가코드받기
    const REST_API_KEY = "125918d406dfdfeea64d6683e17f1805";
    const REDIRECT_URI = "http://localhost:8989/kakao";
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = KAKAO_AUTH_URI; // url 주소 변경
  };

  const loginSubmit = async () => {
    let data = "";

    console.log("inputPw", inputPw);
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

      navigate("/pages/Home");
    } else if (data.message === "로그인에 실패하였습니다.") {
      Swal.fire({
        title: "실패",
        html: "로그인에 실패하였습니다. 아이디/비밀번호를 확인하여 주세요",
        icon: "error",
      });
    }
  };

  //네이버 로그인
  const client_id = "_rDoCDO_oqjowZs5rmMm";
  let naver_api_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    client_id +
    "&redirect_uri=" +
    encodeURI("http://localhost:8989/callback") +
    "&state=1234";

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
            {/* 네이버에서 직접 등록한 애플리케이션 정보로(시크릿키/콜백URL) 네이버 로그인 인증을 요청합니다.
                네이버에 요청하면, 로그인 화면 혹은 정보제공동의화면이 노출되고 로그인을 하여 정상유무 판단이 되면 콜백URL로 API 토큰발급 요청하게됨. 
                //http://127.0.0.1:3000/pages/Login
            */}
            <A href={naver_api_url}>
              <AuthButton>NAVER</AuthButton>
            </A>
            <AuthButton onClick={gokakao}>KAKAO</AuthButton>
          </Wrapper>
        </Contents>
      </ShadowedBox>
    </Positioner>
  );
}

export default Login;
