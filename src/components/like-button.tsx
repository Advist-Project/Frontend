import styled from "@emotion/styled";
import { Colors } from "./ui";

interface ILikeButtonProps {
  state: boolean;
  small?: boolean;
  border?: boolean;
  onClick?: any;
}
export const LikeBtn: React.FC<ILikeButtonProps> = ({ state, small, border, onClick }) => {
  const smallType:boolean = state && small && !border ? true : false;
  const smallBlankType:boolean = !state && small && !border ? true : false;
  const normalType:boolean = state && !small ? true : false;
  const normalBlankType:boolean = !state && !small ? true : false;
  const smallBorderType:boolean = state && small && border ? true : false;
  const smallBorderBlankType:boolean = !state && small && border ? true : false;
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
      smallBorderType ? <SmallBorderBtn onClick={fn}><img src="/icon/favorite_24px.svg" /></SmallBorderBtn> : null
    }
    {
      smallBorderBlankType ? <SmallBorderBtn onClick={fn}><img src="/icon/favorite_border_24px.svg" /></SmallBorderBtn> : null
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
  width: 40px;
  height: 40px;
  padding: 1px 0 0;
  text-align: center;
  vertical-align: middle;
  border: 0;
  background: transparent;
  cursor: pointer;
`;
const SmallBorderBtn = styled.button`
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px ${Colors.black} solid;
  border-radius: 10px;
  padding: 3px 0 0;
`;

const Btn = styled.button`
  width: 60px;
  height: 60px;
  border: 1px solid ${Colors.black};
  border-radius: 20px;
  background: transparent;
  cursor: pointer;
`;