import { ProductCard } from "./product-card";

interface IProductListProps {
  data: any[];
}
export const ProductList: React.FC<IProductListProps> = ({ data }) => { 
  //console.log(data);

  return (
    <>
    {data[0] === undefined? 
      <>
      </>
      : // api 받아올때
      <>
        {new Array(5).fill(0).map((_, num) => ( 
          <ProductCard
                      key = {num}
                      id={data[0][num].itemId}      
                      label={data[0][num].label}
                      title={data[0][num].title}
                      likes={data[0][num].likes}
                      // img={data[0][num].img}
                      img={`/detail/${data[0][num].itemId}/thumb.png`}
                      tag={data[0][num].tag}
                      price={data[0][num].price}
                      discountPrice={data[0][num].discountPrice} />
        ))}
      </>
    }
    </>
  )
}