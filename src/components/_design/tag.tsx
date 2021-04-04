import React from "react";
import styled from "@emotion/styled";
import { Colors } from "./colors";

// Heading
interface ITagProps {
  color: string;
}
export const Tag: React.FC<ITagProps> = ({ children, color }) => {
  const colorStyles: {[key: string]: any} = {
    'purple': { bgColor: Colors.primaryLight, color: Colors.primaryDark },
    'green': { bgColor: Colors.secondaryLight, color: Colors.secondaryDark },
    'yellow': { bgColor: Colors.tertiaryLight, color: Colors.tertiaryDark },
    'gray': { bgColor: Colors.gray5, color: Colors.gray1 },
  }
  const Tag = styled.li`
    display: inline-block;
    font-size: 14px;
    line-height: 32px;
    height: 32px;
    padding: 0 0.89em;
    margin-right: 12px;
    border-radius: 8px;
    color: ${colorStyles[color].color};
    background-color: ${colorStyles[color].bgColor};

    &:last-child { margin-right: 0; }
  `
  return (
    <Tag>#{children}</Tag>
  )
}