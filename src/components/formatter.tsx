export function priceFormat(price: number){
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function queryFormat(data: any){

  return {
    "_id" : data._id,
    "orderId" : data.orderId,
    "userId" : data.userId,
    "useremail" : data.useremail,
    "itemId" : data.itemInfo.itemId,
    "itemImg" : data.itemInfo.itemImg,
    "itemName" : data.itemInfo.itemName,
    "itemOwner" : data.itemInfo.itemOwner,
    "optionId" : data.itemInfo.option.optionId,
    "title" : data.itemInfo.option.title,
    "type" : data.itemInfo.option.type,
    "desc" : data.itemInfo.option.desc,
    "price" : data.itemInfo.option.price,
    "deleteYN_option" : data.itemInfo.option.deleteYN,
    "discountPrice" : data.itemInfo.option.discountPrice,
    "deleteYN" : data.deleteYN,
  }
}