import React from "react";
import styled from "@emotion/styled";
import Image from 'next/image';
import { max } from "components/ui";

const Thumbnail = ({ url }: any) => {
  const Wrap = styled.div`
    background: url(${url}) center/cover no-repeat;

    ${max[1]}{
      min-width: 164px;
      max-width: 164px;
    }
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