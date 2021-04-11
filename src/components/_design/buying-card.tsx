import styled from "@emotion/styled";
import { Colors } from "./colors";
import { Heading, Text, Button } from "components/ui";
import { Price } from 'components/price';

interface IBuyingProps{ // type = "login" => 로그인, type = "start" => 시작하기
    title?: string;
    price: number;
    discountPrice: number | undefined;
    desc?: string;
}
export const Buying: React.FC<IBuyingProps> = ({title, discountPrice, price, desc}) => {

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

    return (
        <Box>
        <HeaderBox>
            <Heading level={5} bold>{title}</Heading>
        </HeaderBox>

        <Products>
            <div style = {{display : 'flex', flexDirection : 'row', height : '60px'}}>
                <img style = {{marginLeft : '9px', marginTop : `14px`, width : '33.86px', height : '46px', alignSelf : 'center'}} src="/Workbook.png"></img>
                    <Text style = {{width : '85px', height : '20px', marginTop : `14px`, marginLeft : '23.14px', alignSelf : 'center'}} size='14px'>워크북</Text>
            </div>
            <Price price={price} discountPrice={discountPrice} />
        </Products>
        <Line/>
            <Text style={{width : '372px', height : '40px', marginTop : '24px', color : `#4E4B66`}} size='16px'>{desc}</Text>
        <div style = {{marginTop : '24px'}}>
            <Button style={{width : '372px', height : '60px'}}>구매하기</Button>
        </div>        
        </Box>
    )
}

// Small
interface ISmallProps{ // type = "login" => 로그인, type = "start" => 시작하기
    title?: string;
    price: number;
    discountPrice: number | undefined;
}
export const SmallCard: React.FC<ISmallProps> = ({title, discountPrice, price}) => {

    const Box = styled.div`
    height: 180px;
    width: 428px;        
    padding : 28px 28px 24px 28px;
    border-radius: 20px;
    background: ${Colors.white};

    border: 1px solid;        
    border-color : ${Colors.gray9};
    box-sizing: border-box;
    border-radius: 20px;
`;

const Products = styled.div`
    height: 56px;
    width: 372px;
    margin-top : 27px;

    display : flex;
    flex-direction : row;
    justify-content : space-between;
`;


    return (
        <Box>
            <Heading level={5} bold>{title}</Heading>

            <Products>
            <div style = {{display : 'flex', flexDirection : 'row', height : '60px'}}>
                <img style = {{marginLeft : '9px', marginTop : `14px`, width : '33.86px', height : '46px', alignSelf : 'center'}} src="/Workbook.png"></img>
                    <Text style = {{width : '85px', height : '20px', marginTop : `14px`, marginLeft : '23.14px', alignSelf : 'center'}} size='14px'>코칭</Text>
            </div>
                <Price price={price} discountPrice={discountPrice} />
            </Products>

        </Box>
    )
}