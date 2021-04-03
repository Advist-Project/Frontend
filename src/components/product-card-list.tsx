import { ProductCard } from "./product-card";

interface IProductCardListProps {
  data: any[];
}
export const ProductCardList: React.FC<IProductCardListProps> = ({ data }) => {

  return (
    <div>
      {new Array(5).fill(0).map((_, i) => (
        <ProductCard key={data[i]._id}
                    label={data[i].label}
                    title={data[i].title}
                    likes={data[i].likes}
                    img={data[i].img}
                    tag={data[i].tag}
                    price={data[i].options[0].price}
                    discount={0} />
    ))}
    </div>
  )
}