import React from "react";
import styled from "@emotion/styled";
import Image from 'next/image';

const Thumbnail = ({ url }: any) => {
  const Wrap = styled.div`
    overflow: hidden;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: url(${url}) center/cover no-repeat;
  `;
  return (
      <Wrap>
      <Image
        src="/thumb.png"
        alt=""
        width={412}
        height={232}
      />
    </Wrap>
  )
};

export default React.memo(Thumbnail);