import styled from "@emotion/styled";
import { Colors } from "./ui";

interface ILikeButtonProps {
  state: boolean;
  small?: boolean;
  onClick?: any;
}
export const LikeBtn: React.FC<ILikeButtonProps> = ({ state, small, onClick }) => {
  const smallType:boolean = state && small ? true : false;
  const smallBlankType:boolean = !state && small ? true : false;
  const normalType:boolean = state && !small ? true : false;
  const normalBlankType:boolean = !state && !small ? true : false;
  const fn:any = onClick ? onClick : ()=>{};

  return (
    <>
    {
      smallType ? <SmallBtn onClick={fn}><img src="/icon/favorite_24px.svg" /></SmallBtn> : null
    }
    {
      smallBlankType ? <SmallBtn onClick={fn}><img src="/icon/favorite_border_24px.svg" /></SmallBtn> : null
    }
    {
      normalType ? <Btn onClick={fn}><img src="/icon/favorite_24px.svg" /></Btn> : null
    }
    {
      normalBlankType ? <Btn onClick={fn}><img src="/icon/favorite_border_24px.svg" /></Btn> : null
    }
    </>
  )
}

const SmallBtn = styled.button`
  width: 24px;
  height: 24px;
  border: 0;
  background: transparent;
`;
const Btn = styled.button`
  width: 60px;
  height: 60px;
  border: 1px solid ${Colors.black};
  background: transparent;
`;