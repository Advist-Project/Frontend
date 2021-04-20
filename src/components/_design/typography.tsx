import React from "react";
import styled from "@emotion/styled";
import { assignCss } from "./assignCss";

// Heading
interface IHeadingProps {
  level?: number;
  bold?: boolean;
  className?: string;
  style?: object[] | object; 
}
export const Heading: React.FC<IHeadingProps> = ({ children, level, bold, className, style}) => {
  const tag:React.ElementType = !level ? 'h1' : level === 2 ? 'h2' : level === 3 ? 'h3' : level === 4 ? 'h4' : 'h5';
  const styles = {
    'h1': { fontSize: '60px', lineHeight: '120%' },
    'h2': { fontSize: '40px', lineHeight: '125%' },
    'h3': { fontSize: '36px', lineHeight: '128%' },
    'h4': { fontSize: '28px', lineHeight: '136%' },
    'h5': { fontSize: '20px', lineHeight: '150%' }
  }
  const Heading = styled.h5`
    font-size: ${styles[tag].fontSize};
    line-height: ${styles[tag].lineHeight};
    font-weight: ${bold ? '700' : '400'};
    word-break: keep-all;
  `
  return (
    <Heading as={tag} className={className} style={assignCss(style)}>{children}</Heading>
  )
}

// Text
interface ITextProps {
  size?: string;
  bold?: boolean;
  inline?: boolean;
  className?: string;
  style?: object[] | object;
}
export const Text: React.FC<ITextProps> = ({ children, size, bold, inline, className, style }) => {
  const tag:React.ElementType = inline ? 'span' : 'p';
  const _size = size ? size : '14px';  
  const lineHeight: {[key: string]: string | undefined} = {
    '20px': '150%',
    '16px': '162%',
    '14px': '17px',
  }
  const Text = styled.p`
    font-size: ${_size};
    line-height: ${_size in lineHeight ? lineHeight[_size] : '150%'};
    font-weight: ${bold ? '500' : '400'};
  `
  return (
    <Text as={tag} className={className} style={assignCss(style)}>{children}</Text>
  )
}