import styled from "@emotion/styled";
import { Colors } from "./colors";
import { Heading, Text, Button } from "components/ui";
import { Price } from 'components/price';

interface IBuyingProps{ // type = "login" => 로그인, type = "start" => 시작하기
    title?: string;
    discount: number | undefined;
    price: number;
}
export const Buying: React.FC<IBuyingProps> = ({discount, price}) => {
    return (
        <Box>
        <HeaderBox>
            <Heading level={5} bold>새 회사, 직무에 빠르게 적응하는 신입사원의 업무 관리 워크북</Heading>
        </HeaderBox>

        <Products>
            <div style = {{display : 'flex', flexDirection : 'row'}}>
                <img style = {{marginLeft : '9px', width : '33.86px', height : '46px', alignSelf : 'center'}} src="/Workbook.png"></img>
                <div style = {{width : '105px', height : '20px', marginLeft : '23.14px', alignSelf : 'center'}}>
                    <Text size='14px'>워크북</Text>
                </div>
            </div>
            <Price price={price} discount={discount} />
        </Products>
        <Line/>
            <Text style={{width : '372px', height : '40px', marginTop : '24px', color : `#4E4B66`}} size='16px'>상품 설명을 짧게 적습니다(최대 60자)상품 설명을 짧게 적습니다(최대 60자)상품 설명을 짧게 적습니다</Text>
        <div style = {{marginTop : '24px'}}>
            <Button style={{width : '372px', height : '60px'}}>구매하기</Button>
        </div>        
        </Box>
    )
}

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
    justify-content : space-between;
`;

const Line = styled.div`
    height: 0px;
    width: 371px;
    margin-top: 22px;
    border-radius: nullpx;
    border: 1px dashed;
    border-color : ${Colors.black};
`;