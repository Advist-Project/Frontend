export function priceFormat(price: number){
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function queryFormat(data: any){
  return {
    "_id" : data._id,
    "orderId" : data.orderId,
    "userId" : data.userId,
    "useremail" : data.useremail,
    "itemId" : data.itemInfo[0].itemId,
    "itemImg" : data.itemInfo[0].itemImg,
    "itemName" : data.itemInfo[0].itemName,
    "itemOwner" : data.itemInfo[0].itemOwner,
    "optionId" : data.itemInfo[0].option[0].optionId,
    "title" : data.itemInfo[0].option[0].title,
    "type" : data.itemInfo[0].option[0].type,
    "desc" : data.itemInfo[0].option[0].desc,
    "price" : data.itemInfo[0].option[0].price,
    "deleteYN_option" : data.itemInfo[0].option[0].deleteYN,
    "discountPrice" : data.itemInfo[0].option[0].discountPrice,
    "deleteYN" : data.deleteYN,
  }
}