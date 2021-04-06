import React from "react";
import { Tag } from "./tag";
import styled from "@emotion/styled";

interface ITagProps {
  data: string[];
}
export const Tags: React.FC<ITagProps> = ({ data }) => {
  const color:string[] = ['purple', 'green', 'yellow', 'gray'];
  const Tags = styled.ul``

  return (
    <Tags>
      {data.map((txt, idx) => (
          <Tag key={idx} color={color[3]}>{txt}</Tag>
      ))}
    </Tags>
  )
}