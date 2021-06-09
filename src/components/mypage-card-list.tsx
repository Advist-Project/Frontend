import { ProductCard } from "./product-card";

interface IMypageCardListProps {
  data: any[];
}
export const MypageCardList: React.FC<IMypageCardListProps> = ({ data }) => {

  return (
    <>
      {data[0] === undefined? 
      <>
      </>
      : // api 받아올때
      <>
      {new Array(data[0].length).fill(0).map((_, i) => (
        <ProductCard key={data[0][i]._id}
                     id={data[0][i].itemId}      
                     label={data[0][i].label}
                     title={data[0][i].title}
                     likes={data[0][i].likes}
                     //img={data[0][i].img}
                     img={`/detail/${data[0][i].itemId}/thumb.png`}
                     tag={data[0][i].tag}
                     price={data[0][i].price}
                     discountPrice={data[0][i].discountPrice} />
      ))}
    </>
  }
  </>
  )
}