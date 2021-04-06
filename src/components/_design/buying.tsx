import styled from "@emotion/styled";
import { Colors } from "./colors"
import { Typography } from "components/ui"
import React from 'react';

const { Heading } = Typography;

interface IBuyingProps{ // type = "login" => 로그인, type = "start" => 시작하기
    title?: string;
}
export const Buying: React.FC<IBuyingProps> = ({}) => {


    const Box = styled.div`
        height: 376px;
        width: 428px;
        left: 0px;
        top: 0px;
        border-radius: 20px;

        background: ${Colors.white};

        border: 1px solid;        
        border-color : ${Colors.black};
        box-sizing: border-box;
        border-radius: 20px;
    `;

    const HeaderBox = styled.div`
        height: 65px;
        width: 372px;
        margin-left: 28px;
        margin-top: 28px;
        border-radius: nullpx;

    `;


    return (
        <Box>
        <HeaderBox>
            <Heading level={5} bold>새 회사, 직무에 빠르게 적응하는 신입사원의 업무 관리 워크북</Heading>
        </HeaderBox>
        <img src="/Workbook.png"></img>
        </Box>
    )
}