import axios from 'axios';

export const getOrderData = async (userId: any, itemId: any, optionId: any) => {
  const result = await axios.get(`https://advist.herokuapp.com/pay/checkorder/${userId}?itemId=${itemId}&optionId=${optionId}`);
  const data = result.data.order_receipts;
  return data;
};