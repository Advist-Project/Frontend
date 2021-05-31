import { Colors } from "./colors";

const PrimaryBtn = `
color: ${Colors.white};
background: ${Colors.primary};
border-width: 0px;
border-radius: 20px;
cursor: pointer;
font-weight: 500;

&:hover, &:active {
  background: ${Colors.primaryDark};
}
&:disabled{
  background: ${Colors.primarySemiLight};
  cursor: normal;
}
`;
const MobilePrimaryBtn = `
  ${PrimaryBtn}
  border-radius: 10px;
  height: 28px;
`;
const SecondaryBtn = `
  color: ${Colors.black};
  background: ${Colors.white};
  border-color: ${Colors.black};
  border-style: solid;
  border-width: 1px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;

  &:hover{
    color: ${Colors.primary};
    border-color: ${Colors.primary};
  }
  &:active{
    color: ${Colors.primaryDark};
    border-color: ${Colors.primaryDark};
  }
  &:disabled{
    color: ${Colors.gray3};
    border-color: ${Colors.gray3};
    cursor: normal;
  }
`;
const MobileSecondaryBtn = `
${PrimaryBtn}
  border-radius: 10px;
  height: 28px;
`;

export const btnCss = {
  'Primary': PrimaryBtn,
  'PrimaryMo': MobilePrimaryBtn,
  'Secondary': SecondaryBtn,
  'SecondaryMo': MobileSecondaryBtn
}
