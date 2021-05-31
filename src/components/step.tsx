import styled from "@emotion/styled";
import { Colors, min } from "components/ui";

// Heading
interface IStepProps {
  active: number;
  labels: string[];
}
export const Step: React.FC<IStepProps> = ({ active, labels }) => {
  const Ul = styled.ul`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px ${Colors.gray3} solid;
    margin-bottom: 10px;
  `;
  const Li = styled.li`
    position: relative;
    font-size: 0.75rem;
    line-height: 171%;
    padding-bottom: 18px;
    color: ${Colors.gray3};

    &::after {
      content: '';
      display: block;
      width: 8px;
      height: 8px;
      border: 1px #fff solid;
      border-radius: 50%;
      background: ${Colors.gray3};
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
    }

    &:nth-of-type(${active}) {
      color: ${Colors.primary};

      &::after {
        background: ${Colors.primary};
      }
    }

    ${min[1]} {
      font-size: 14px;

      &::after {
        width: 12px;
        height: 12px;
        bottom: -8px;
      }

      &:nth-of-type(${active}) {
        &::after {
          width: 16px;
          height: 16px;
          bottom: -10px;
        }
      }
    }

    &:nth-of-type(1) {
      &::after {
        left: -1px;
        transform: none;
      }
    }
    &:nth-last-of-type(1) {
      &::after {
        left: auto;
        right: -1px;
        transform: none;
      }
    }
  `

  return (
    <Ul>
      {
        labels.map((label) => (
          <Li key={label}>{label}</Li>
      ))}
    </Ul>
  )
}