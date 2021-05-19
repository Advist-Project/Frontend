import React from "react";
import styled from "@emotion/styled";
import Image from 'next/image';

const Thumbnail = ({ url }: any) => {
  const Wrap = styled.div`
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