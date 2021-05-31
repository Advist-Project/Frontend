import styled from "@emotion/styled";
import { min, Colors } from "components/ui";
import { Headline, Title, Desc } from "./common-styles";
import { InputPhone } from "components/input-phone";
import { InputName } from "components/input-name";

export default function OrdererSection(props: any){
  const { userMessage, setUserMessage,
          userName, setUserName, setUserNameState,
          userPhone, setUserPhone, setUserPhoneState } = props;

  function typing(e: any){
    setUserMessage(e.target.value);
  }

  return (
    <section>
      <Headline>
        <Title>상담 내용</Title>
        <Desc>코치에게 전하는 말을 남겨주세요.</Desc>
      </Headline>
      <Textarea onChange={typing} placeholder="지금 고민하고 있는 부분이나 코치님에게 어떤 상담/교육을 받고 싶은지 구체적으로 작성해주세요." />
      <Characters>{userMessage.length}/200</Characters>
      <Headline>
        <Title>신청하시는 분 정보</Title>
        <Desc>입력하신 연락처로 코칭 진행에 대해 자세히 안내드립니다.</Desc>
      </Headline>
      <UserInfo>
        <div>
          <label>이름</label>
          <InputName useState={userName} useStateFunction={setUserName} formStateFunction={setUserNameState} />
        </div>
        <div>
          <label>연락처</label>
          <InputPhone useState={userPhone} useStateFunction={setUserPhone} formStateFunction={setUserPhoneState} />
        </div>
      </UserInfo>
    </section>
  )
}

const Textarea = styled.textarea`
  width: 100%;
  min-height: 110px;
  padding: 12px;
  border: 1px ${Colors.gray3} solid;
  border-radius: 10px;
  font-size: 12px;
  line-height: 160%;
  resize: none;
  margin-top: 20px;

  &::placeholder {
    color: ${Colors.gray3}
  }

  &:focus {
    border-color: ${Colors.primary};
    outline: none;
  }

  ${min[1]} {
    min-height: 183px;
    font-size: 14px;
    border-radius: 20px;
    padding: 20px;
  }
`;

const Characters = styled.p`
  margin-top: 4px;
  margin-bottom: 32px;
  text-align: right;
  font-weight: 500;
  font-size: 12px;
  line-height: 160%;

  ${min[1]}{
    margin-top: 12px;
    margin-bottom: 52px;
    font-size: 14px;
  }
`;

const UserInfo = styled.div`
  padding: 28px 0 0;
  overflow:hidden;

  label {
    display: block;
    font-size: 12px;
    margin-bottom: 12px;
  }
  input {
    width: 100%;
    height: 24px;
    font-size: 12px;
    padding: 4px 12px;
    border-radius: 8px;
    border: 1px solid ${Colors.gray3};
    margin-bottom: 32px;

    &::placeholder {
      color: ${Colors.gray3}
    }
  }

  div:last-of-type > div input {
    margin-bottom: 0;
  }

  input + p {
    font-size: 12px;
    margin-top: -24px;
    margin-bottom: 2px;
  }
  div:last-of-type > div input + p {
    margin-top: 8px;
    margin-bottom: 0;
  }

  ${min[1]}{
    padding: 36px 0 26px;

    label {
      font-size: 16px;
      margin-bottom: 16px;
    }
    input {
      height: 52px;
      font-size: 16px;
      padding: 12px 24px;
      border-radius: 20px;
    }
    input + p {
      font-size: 16px;
    }
  }
`;