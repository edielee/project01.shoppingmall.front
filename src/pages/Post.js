import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import "../post.css";

const Post = (props) => {
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    props.setcompany({
      ...props.company,
      address: fullAddress,
    });
  };

  return (
    /*
    onComplete={complete} :  // 값을 선택할 경우 실행되는 이벤트
     autoClose // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
    */
    <div>
      <DaumPostcode className="postmodal" autoClose onComplete={complete} />
    </div>
  );
};

export default Post;
