import axios from 'axios';

export function bootpay(data, extra){ 

  BootPay.request({
    price: data.discountPrice, //할인 후 가격
    application_id: process.env.NEXT_PUBLIC_BT_KEY,
    name: data.title,
    pg: extra.pg,
    method: extra.method,
    show_agree_window: 0,
    items: [
      {
        item_name: data.itemName,
        qty: 1, //수량
        unique: data.itemId,
        price: data.price, //원가격
        cat1: data.type
      }
    ],
    user_info: {
      username: data.userId,
      email: data.useremail,
      addr: '사용자 주소',
      phone: '010-1234-4567'
    },
    order_id: data.orderId,
    extra: {
      escrow: false,
      quota: [1,2,3,4,5,6],
      seller_name: '어드바이스트'
    }
  }).error(function (data) {
    //결제 진행시 에러가 발생하면 수행됩니다.
    console.log(data);
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
      console.log(data);
  }).done(function (data) {
    //결제가 정상적으로 완료되면 수행됩니다
    //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
    console.log(data);


//    const url = 'https://advist.herokuapp.com/pay/verify/6076c06c0d681b003ed1c747?orderId='+ order_id;
    const url = 'https://advist.herokuapp.com/pay/verify/6076c06c0d681b003ed1c747?orderId=1';
    axios.get(url).then((res) => {
      console.log("result : " + res.data);
    });
//    console.log("result : " + result.data);
  });
}