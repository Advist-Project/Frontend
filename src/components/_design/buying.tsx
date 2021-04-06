import styled from "@emotion/styled";
import { Colors } from "./colors"
import { Typography, DesignButton } from "components/ui"
import React from 'react';

interface IBuyingProps{ // type = "login" => 로그인, type = "start" => 시작하기
    title?: string;
}
export const Buying: React.FC<IBuyingProps> = ({}) => {
    let price = '50,000';
    let discountPrice = '0';

    const { Heading, Text } = Typography;
    const { Button } = DesignButton;

    const Box = styled.div`
        height: 376px;
        width: 428px;        
        padding : 28px 0px 0px 28px;
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
        border-radius: nullpx;
    `;

    const Products = styled.div`
        height: 56px;
        width: 372px;

        margin-top : 27px;

        display : flex;
        flex-direction : row;
    `;

    const Price = styled.h5`
        height: 20px;
        width: 84px;
        margin-left: 117px;
        border-radius: nullpx;
        font-family: Spoqa Han Sans Neo;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 30px;
        display: flex;
        align-items: center;

        text-decoration:line-through;
    `;

    const DiscountPrice = styled.h1`
        font-family: Spoqa Han Sans Neo;
        font-size: 28px;
        font-style: normal;
        font-weight: 700;
        line-height: 34px;
        letter-spacing: 0px;
        text-align: right;

        color : ${Colors.black};
    `;

    const Line = styled.div`
        height: 0px;
        width: 371px;
        margin-top: 22px;
        border-radius: nullpx;
        border: 1px dashed;
        border-color : ${Colors.black};
    `;

    return (
        <Box>
        <HeaderBox>
            <Heading level={5} bold>새 회사, 직무에 빠르게 적응하는 신입사원의 업무 관리 워크북</Heading>
        </HeaderBox>

        <Products>
            <img style = {{marginLeft : '9px', width : '33.86px', height : '46px', alignSelf : 'center'}} src="/Workbook.png"></img>
            <div style = {{width : '105px', height : '20px', marginLeft : '23.14px', alignSelf : 'center'}}>
                <Text size='14px'>워크북</Text>
            </div>
            <div style = {{display: 'flex', flexDirection : 'column'}}>
                <Price>{price}원</Price>
                <DiscountPrice>{discountPrice}원</DiscountPrice>
            </div>
        </Products>
        <Line/>
        <div style = {{width : '372px', height : '40px', marginTop : '24px'}}>
            <Text size='16px'>상품 설명을 짧게 적습니다(최대 60자)상품 설명을 짧게 적습니다(최대 60자)상품 설명을 짧게 적습니다</Text>
        </div>
        <div style = {{marginTop : '24px'}}>
            <Button>구매하기</Button>
        </div>
        </Box>
    )
}