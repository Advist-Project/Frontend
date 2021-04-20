
import axios from 'axios';
import { useRouter } from 'next/router';
import { queryFormat } from 'components/formatter';

export async function getOrderData(userId: any, itemId: any, optionId: any){
  const result = await axios.get(`https://advist.herokuapp.com/pay/checkorder/${userId}?itemId=${itemId}&optionId=${optionId}`)
    console.log(result.data);
    const data = result.data.order_receipts;

    if(data){
      const router = useRouter();
      router.push({
        pathname: `${process.env.NEXT_PUBLIC_ORDER_PAGE_URL}`,
        query: queryFormat(data),
      }, '/order');
    }
}