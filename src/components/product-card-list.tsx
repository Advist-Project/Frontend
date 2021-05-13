import { ProductCard } from "./product-card";

interface IProductListProps {
  data: any[];
}
export const ProductList: React.FC<IProductListProps> = ({ data }) => {
  console.log(data);
  const title = [
    "문과생 출신 마케터가 알려주는 GTM으로 GA 전자상거래 구축하기",
    "스프레드시트로 만드는 마케팅 성과 대시보드",
    "스포츠마케터가 알려드리는 스포츠마케팅 직무 커리어 상담",
    "입문자를 위한 스마트스토어 운영방법",
    "중소기업 HR, 인건비 지원사업 준비부터 운영까지"
  ]
  const tag = [
    ["마케터", "퍼포먼스마케팅", "1년차미만", "4주코스"],
    ["마케터", "퍼포먼스마케팅", "1년차미만", "4주코스"],
    ["마케터", "스포츠마케팅", "5년차미만", "커리어상담"],
    ["마케터", "온라인마케팅", "스마트스토어", "온라인쇼핑몰"],
    ["HR", "정부지원사업", "3년차미만"]
  ]
  const price = [
    100000, 100000, 100000, 180000, 100000
  ]
  const discountPrice = [
    100000, 100000, 100000, 100000, 100000
  ]

  return (
    <>
      {new Array(5).fill(0).map((_, i) => (
        // <ProductCard key={data[i]._id}
        //             id={data[i].itemId}      
        //             label={data[i].label}
        //             title={data[i].title}
        //             likes={data[i].likes}
        //             img={data[i].img}
        //             tag={data[i].tag}
        //             price={data[i].options[0].price}
        //             discount={0} />
        <ProductCard key={i}
                    id={i+1}
                    label="BEST"
                    title={title[i]}
                    likes={0}
                    img={`/detail/${i+1}/thumb.png`}
                    tag={tag[i]}
                    price={price[i]}
                    discountPrice={discountPrice[i]} />
    ))}
    </>
  )
}