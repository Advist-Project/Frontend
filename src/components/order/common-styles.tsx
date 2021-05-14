import styled from "@emotion/styled";
import { Colors } from "components/ui";

export const Hr = styled.hr`
border: 0px;
border-bottom: 1px ${Colors.gray3} solid;
margin: 0;
`;

export const Headline = styled.div`
display: flex;
align-items: baseline;
`;
export const Title = styled.h2`
font-weight: 700;
line-height: 32px;
font-size: 20px;
word-break: keep-all;
white-space: nowrap;
`
export const Desc = styled.p`
line-height: 26px;
font-size: 16px;
word-break: keep-all;
margin-left: 20px;
`;


// 입력폼
export const Input = styled.input`
  &:focus {
    outline: none;
  }
  &:focus, &.fail {
    border-color: ${Colors.primary};
  }

  &.fail + .msg,
  &:focus + .msg {
    display: block !important;
  }
  &.success + .msg {
    display: none !important;
  }
`;
export const Msg = styled.p`
  display: none;
  margin-top: 8px;
  font-size: 14px;
  line-height: 22px;
  color: ${Colors.primary};
  text-align: right;

  &.visible {
    display: block;
  }
`;