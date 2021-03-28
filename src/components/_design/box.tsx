import React from "react";
import styled from "@emotion/styled";
import { Colors } from "./colors";
import { assignCss } from "./assignCss";

// Heading
interface IHeadingProps {
  width?: string;
  height?: string;
  round?: boolean;
  border?: number;
  shadow?: number;
  className?: string;
  style?: object[] | object;
}
export const Box: React.FC<IHeadingProps> = ({ children, width, height, round, border, shadow, style, className}) => {
  const shadowStyles: {[key: number]: string | undefined} = {
    1: '0px 8px 16px rgba(17, 17, 17, 0.06)',
    2: '0px 20px 24px rgba(17, 17, 17, 0.06)',
    3: '0px 32px 68px rgba(17, 17, 17, 0.08)'
  };

  const Box = styled.div`
    width: ${width ? width : 'auto'};
    height: ${height ? height : 'auto'};
    border-width: ${border ? border+'px' : '0px'};
    border-color: #${Colors.black};
    border-style: solid;
    border-radius: ${round ? '20px' : '0px'};
    box-shadow: ${shadow && shadow in shadowStyles ? shadowStyles[shadow] : 'none'};
  `
  return (
    <Box className={className} style={assignCss(style)}>{children}</Box>
    
  )
}