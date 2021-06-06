import styled from "@emotion/styled";
import { min, Colors } from "components/ui";

export const Hr = styled.hr`
border: 0px;
border-bottom: 1px ${Colors.gray3} solid;
margin: 0;
`;

export const Headline = styled.div`
  ${min[1]}{
    display: flex;
    align-items: baseline;
  }
`;
export const Title = styled.h2`
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 167%;
  word-break: keep-all;
  white-space: nowrap;

  ${min[1]}{
    font-size: 20px;
  }
`
export const Desc = styled.p`
  font-size: 0.75rem;
  line-height: 160%;
  word-break: keep-all;
  margin-top: 4px;

  ${min[1]}{
    font-size: 16px;
    margin-top: 0;
    margin-left: 20px;
  }
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
  height: 22px;
  color: ${Colors.primary};
  text-align: right;

  &.visible {
    display: block;
  }
`;