import styled from "@emotion/styled";
import { Colors } from "components/ui";
import { MybuyingTableBody } from 'components/mybuying-table-body';

export function MybuyingList(props: any){
    // console.log(props.data);
    return (
    <>
    {props.data? // api 데이터 전달받을 경우에만
        <MybuyingTable>
        <colgroup>
            <col width="71.8%"/>
            <col width="15.8%"/>
            <col width="13.8%"/>
        </colgroup>    
        <tbody>
            <MyBuyingHeader>            
                <td><span style={{marginLeft : '24px', width : '100px', height : '16px'}}>구매상품</span></td>
                <td>
                    <div style={{width : '91.86px', height : '16px', textAlign : 'center'}}>상태</div>
                </td>
                <td>
                    <div style={{width : '100px', height : '16px', textAlign : 'center'}}>확인</div>
                </td>
            </MyBuyingHeader>
            <MybuyingTableBody data = {props.data}/> {/* 테이블 내용 */}
        </tbody>
        </MybuyingTable>  
        : null
    }
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
    text-align: left;
    border: 1px solid ${Colors.primaryDark};
`;