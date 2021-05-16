import styled from "@emotion/styled";
import { Colors } from "components/ui";
import { MybuyingTableBody } from 'components/mybuying-table-body';

export function MybuyingList(){

    return (
    <>
        <MybuyingTable>
            <MyBuyingHeader>
                <th style = {{}}>구매상품</th>
                <th>상태</th>
                <th>확인</th>
            </MyBuyingHeader>            
            <MybuyingTableBody/> {/* 테이블 내용 */}
        </MybuyingTable>  
    </>
    )
}
export default MybuyingList;

const MybuyingTable = styled.table`
    width: 1300px;
    margin-top : 80px;
`;

const MyBuyingHeader =styled.tr`
    height: 60px;
    color: ${Colors.primaryDark}; 
    background : ${Colors.primaryLight};
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 60px;
    text-align: center;  

`;