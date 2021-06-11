import { ProductCard } from "./product-card";

interface IProductListProps {
  data: any[];
}
export const ProductList: React.FC<IProductListProps> = ({ data }) => {
  return (
    <>
      {data.map((item, num) => ( 
        <ProductCard
          key = {num}
          id={item.itemId}      
          label={item.label}
          title={item.title}
          likes={item.likes}
          // img={item.img}
          img={`/detail/${item.itemId}/thumb.png`}
          tag={item.tag}
          price={item.price}
          discountPrice={item.discountPrice} />
        ))}
      </>
  )
}