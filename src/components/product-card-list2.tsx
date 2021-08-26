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
          img={`${process.env.NEXT_PUBLIC_S3_URL}/item/${item.itemId}/thumbnail.png`}
          tag={item.tag}
          price={item.price}
          discountPrice={item.discountPrice} />
        ))}
      </>
  )
}