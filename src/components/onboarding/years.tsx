import styled from "@emotion/styled";
import { Colors } from "components/ui";

export function YearsInput(){

    return(
        <>
        <InputYears placeholder = "위에서 선택한 직무의 연차를 입력해주세요"></InputYears>
        </>
    )

}
export default YearsInput;

const InputYears = styled.input`
    margin-bottom : 40px;
    height: 52px;
    width: 480px;
    background: ${Colors.white};                    

    border: 1px solid;      
    border-radius: 20px;
    border-color: ${Colors.gray3};
    box-sizing: border-box;

    color : ${Colors.black};

    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    text-indent : 24px;

    &:focus{
        outline : none;
        border-width : 2px;
        border-color : ${Colors.black};  
    }
`;