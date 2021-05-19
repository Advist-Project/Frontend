import React from "react";
import styled from "@emotion/styled";
import { min, Colors } from "components/ui";

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
    padding: 0.643em 0.89em;
    border-radius: 8px;
    white-space: nowrap;
    margin-right: 0.6em;
    color: ${colorStyles[color].color};
    background-color: ${colorStyles[color].bgColor};

    &:last-child { margin-right: 0; }

    ${min[1]} {
      font-size: 0.875rem;
    }
  `
  return (
    <Tag>#{children}</Tag>
  )
}