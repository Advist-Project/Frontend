import { Buying, SmallCard } from "./_design/buying-card";

interface IBuyingListProps {
  data: any[];
}
export const BuyingList: React.FC<IBuyingListProps> = ({ data }) => {
  return (
    <>
      {data.map((option) => (
        <Buying key={option.optionId}
                title={option.title}
                price={option.price}
                discountPrice={option.discountPrice}
                desc={option.desc}/>
        // <Buying key={i}
        //             title="새 회사, 직무에 빠르게 적응하고 싶은 신입사원을 위한 업무 관리 워크북"
        //             price={50000}
        //             discountPrice={0}
        //             desc="상품 설명을 짧게 적습니다(최대 60자)상품 설명을 짧게 적습니다(최대 60자)상품 설명을 짧게 적습니다" />
    ))}
    </>
  )
}

interface ISmallListProps {
  data: any[];
}
export const SmallList: React.FC<ISmallListProps> = ({ data }) => {
  console.log(data);

  return (
    <>
      {new Array(2).fill(0).map((_, i) => (
        // <SmallList key={data[i]._id}
        //             title={data[i].title}
        //             price={data[i].options[0].price}
        //             discount={0}
        <SmallCard key={i}
                    title="워크북 작성 1:1 코칭(1회)"
                    price={200000}
                    discountPrice={100000}
        />
    ))}
    </>
  )
}