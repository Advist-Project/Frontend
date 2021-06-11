import axios from 'axios';
import Router from "next/router";

export function bootpay(data, extra){
  const itemId = data.itemInfo.itemId;
  BootPay.request({
    price: data.itemInfo.option.discountPrice, //할인 후 가격
    application_id: process.env.NEXT_PUBLIC_BT_KEY,
    name: data.itemInfo.option.title,
    pg: extra.pg,
    method: extra.method,
    show_agree_window: 0,
    items: [
      {
        item_name: data.itemInfo.itemName,
        qty: 1, //수량
        unique: data._id,
        price: data.itemInfo.option.price, //원가격
        cat1: data.itemInfo.option.type
      }
    ],
    user_info: {
      username: extra.userName,
      email: data.userEmail,
      addr: '',
      phone: extra.userPhone
    },
    order_id: data.orderId,
    extra: {
      escrow: false,
      quota: [1,2,3,4,5,6],
      seller_name: '어드바이스트'
    }
  }).error(function (data) {
    //결제 진행시 에러가 발생하면 수행됩니다.
    console.log("에러");
    console.log(data);
    Router.push(`/order/cancel/result`);
    setTimeout(function() {
      window.location.href = `/detail/${itemId}`;
    }, 2000);
  }).cancel(function (data) { 
    //결제가 취소되면 수행됩니다.
    console.log(data);
  }).ready(function (data) {
    // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
    console.log(data);
  }).confirm(function (data) {
    //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
    //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
    console.log(data);
    var enable = true; // 재고 수량 관리 로직 혹은 다른 처리
    if (enable) {
      BootPay.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
    } else {
      BootPay.removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
    }
  }).close(function (data) {
      // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
  }).done(async function (data) {
      console.log('done');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pay/verify/${data.receipt_id}?orderId=${data.order_id}`);
      switch(res.status){
        case 200:
          location.replace(`/order/complete/${data.order_id}`);
          break;
        case 500:
          location.replace(`/order/cancel/result`);
          break;
      } 
  });
}