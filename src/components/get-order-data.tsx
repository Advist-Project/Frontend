import axios from 'axios';

export async function getOrderData(userId: any, itemId: any, optionId: any){
  const result = await axios.get(`https://advist.herokuapp.com/pay/checkorder/${userId}?itemId=${itemId}&optionId=${optionId}`)
    console.log(result.data);
    const data = result.data.order_receipts;
    return data;
}