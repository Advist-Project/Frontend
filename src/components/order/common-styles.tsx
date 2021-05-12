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