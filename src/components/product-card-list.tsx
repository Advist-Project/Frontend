import { ProductCard } from "./product-card";

interface IProductListProps {
  data: any[];
}
export const ProductList: React.FC<IProductListProps> = ({ data }) => {
  console.log(data);

  return (
    <>
      {new Array(5).fill(0).map((_, i) => (
        // <ProductCard key={data[i]._id}
        //             label={data[i].label}
        //             title={data[i].title}
        //             likes={data[i].likes}
        //             img={data[i].img}
        //             tag={data[i].tag}
        //             price={data[i].options[0].price}
        //             discount={0} />
        <ProductCard key={i}
                    label="BEST"
                    title="새 회사, 직무에 빠르게 적응하고 싶은 신입사원을 위한 업무 관리 워크북"
                    likes={15}
                    img="/test.jpg"
                    tag={['조직문화','8회강의','3개월내']}
                    price={11100}
                    discount={20} />
    ))}
    </>
  )
}