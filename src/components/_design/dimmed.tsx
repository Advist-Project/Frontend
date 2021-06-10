import styled from "@emotion/styled";

export const Dimmed = styled.div`
  position: fixed;
  top: -50%;
  left: -50%;
  width: 1000vw;
  height: 1000vh;
  background: rgba(20, 20, 42, 0.5);
  cursor: pointer;
  z-index: 10;
`;
export const DimmedOnlyMobile = styled.div`
  position: fixed;
  top: -50%;
  left: -50%;
  width: 1000vw;
  height: 1000vh;
  background: rgba(20, 20, 42, 0.5);
  cursor: pointer;
  z-index: 10;

  @media (min-width: 769px){
    display: none;
  }
`;