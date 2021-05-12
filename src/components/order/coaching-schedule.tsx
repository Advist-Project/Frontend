import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Colors } from "components/ui";
import { Hr, Headline, Title, Desc } from "./common-styles";

export default function ScheduleSection({scheduleList}: any){
  const Btns = styled.ul`
    display: flex;
    margin-top: 36px;
    margin-bottom: 16px;
    
    li {
      flex-grow: 1;
      flex-basis: 0px;
      margin-right: 9px;
  
      &:last-of-type {
        margin-right: 0;
      }
    }
  `;

  const Btn = styled.button`
    border: 1px ${Colors.gray3} solid;
    background: ${Colors.white};
    cursor: pointer;
    width: 100%;
    padding: 3px 4px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 24px;
    color: ${Colors.gray3};

    &.on {
      border-color: ${Colors.primary};
      color: ${Colors.primary};
    }
  `;

  const Times = styled.ul`
    visibility: hidden;
    border: 1px ${Colors.primary} solid;
    border-radius: 8px;
    padding: 4px 20px;
    margin-bottom: 36px;

    &.visible {
      visibility: visible;
    }

    li {
      padding: 16px 0;
    }

    input[type=checkbox]{
      display: none;
    }
    label {
      font-size: 16px;
      cursor: pointer;
    }
    input[type=checkbox] + label::before {
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin-right: 15px;
      border-radius: 4px;
      border: 1px solid ${Colors.gray3};
    }
    input[type=checkbox] + label:hover::before {
      border-color: ${Colors.primary};
    }
    input[type=checkbox]:checked + label::before {
      border-color: ${Colors.primary};
      background: url('/icon/done_24px.svg') center/17px 13px no-repeat;
      background-color: ${Colors.primary};
    }
  `;

  const SelectedTimes = styled.div`
    margin-top: 24px;
    padding-bottom: 36px;
  `;

  const times = {
    b9: false,
    a9b12: false,
    a12b15: false,
    a15b18: false,
    a19b21: false,
    a21b24: false,
    a24: false
  }
  const [schedule, setSchedule] = useState<{[key: string]: any}>({
    mon: {
      label: '월',
      active: false,
      time: { ...times },
    },
    tue: {
      label: '화',
      active: false,
      time: { ...times },
    },
    wed: {
      label: '수',
      active: false,
      time: { ...times },
    },
    thu: {
      label: '목',
      active: false,
      time: { ...times },
    },
    fri: {
      label: '금',
      active: false,
      time: { ...times },
    },
    sat: {
      label: '토',
      active: false,
      time: { ...times },
    },
    sun: {
      label: '일',
      active: false,
      time: { ...times },
    },
  });

  console.log(schedule);

  const [every, onEvery] = useState<boolean>(false);
  const [day, onDay] = useState<boolean>(false);
  const [end, onEnd] = useState<boolean>(false);

  const isActived = schedule.mon.active || schedule.tue.active || schedule.wed.active || schedule.thu.active || schedule.fri.active || schedule.sat.active || schedule.sun.active;
  const isEvery = schedule.mon.active && schedule.tue.active && schedule.wed.active && schedule.thu.active && schedule.fri.active && schedule.sat.active && schedule.sun.active;
  const isDay = schedule.mon.active && schedule.tue.active && schedule.wed.active && schedule.thu.active && schedule.fri.active;
  const isEnd = schedule.sat.active && schedule.sun.active;

  useEffect(() => {
    isEvery ? onEvery(true) : onEvery(false);
    isDay ? onDay(true) : onDay(false);
    isEnd ? onEnd(true) : onEnd(false);
  },[schedule]);

  function pushSchedule(){
    // const copy = [...scheduleList];
    // const daysKo = ["월", "화", "수", "목", "금", "토", "일"];
    // const days = [mon, tue, wed, thu, fri, sat, sun];
    // const time = "오후 (3시 - 6시)";

    // for(let i = 0; i < 7; i++){
    //   if(days[i]){
    //     let timeStr = daysKo[i] + ' / ' + time;
    //     if(copy.indexOf(timeStr) < 0){
    //       copy.push(timeStr);
    //     }
    //   }
    // }
    // setScheduleList(copy);
  }

  function removeSchedule(item: string){
    // const copy = [...schedule];
    // copy.indexOf('')
    console.log(item);
  }

  // 버튼 클릭 시 토글 동작
  function toggle(day:string){
    if(day in schedule){
      let dayObj = {...schedule[day]};
      let newObj = {
        ...schedule,
        [day]: {...dayObj, active: !dayObj.active }
      }
      setSchedule(newObj);
    }
  }

  function toggleEvery() {
    const status = !every;
    const newObj = {...schedule};
    for(const key in newObj){
      newObj[key].active = status;
    }
    setSchedule(newObj);
  }

  function toggleDay() {
    const status = !day;
    const newObj = {...schedule};
    newObj.mon.active = status;
    newObj.tue.active = status;
    newObj.wed.active = status;
    newObj.thu.active = status;
    newObj.fri.active = status;
    setSchedule(newObj);
  }

  function toggleEnd() {
    const status = !end;
    const newObj = {...schedule};
    newObj.sat.active = status;
    newObj.sun.active = status;
    setSchedule(newObj);
  }


  return (
    <section>
      <Headline>
        <Title>코칭 신청</Title>
        <Desc>2주 내에 코칭받을 수 있는 일정을 모두 선택해주세요. 요일 선택 뒤, 시간 선택이 가능합니다.</Desc>
      </Headline>
      <Btns>
        <li><Btn className={every ? 'on' : ''} onClick={toggleEvery}>모든 요일</Btn></li>
        <li><Btn className={day ? 'on' : ''} onClick={toggleDay}>평일</Btn></li>
        <li><Btn className={end ? 'on' : ''} onClick={toggleEnd}>주말</Btn></li>
        <li><Btn className={schedule.mon.active ? 'on' : ''} onClick={()=>toggle('mon')}>월</Btn></li>
        <li><Btn className={schedule.tue.active ? 'on' : ''} onClick={()=>toggle('tue')}>화</Btn></li>
        <li><Btn className={schedule.wed.active ? 'on' : ''} onClick={()=>toggle('wed')}>수</Btn></li>
        <li><Btn className={schedule.thu.active ? 'on' : ''} onClick={()=>toggle('thu')}>목</Btn></li>
        <li><Btn className={schedule.fri.active ? 'on' : ''} onClick={()=>toggle('fri')}>금</Btn></li>
        <li><Btn className={schedule.sat.active ? 'on' : ''} onClick={()=>toggle('sat')}>토</Btn></li>
        <li><Btn className={schedule.sun.active ? 'on' : ''} onClick={()=>toggle('sun')}>일</Btn></li>
      </Btns>
      <Times className={isActived ? "visible" : ""}>
        <li>
          <input id="all" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="all">모든 시간</label>
        </li>
        <li>
          <input id="b9" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="b9">오전 (9시 이전)</label>
          </li>
        <li>
          <input id="a9b12" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="a9b12">오전 (9시 - 12시)</label>
          </li>
        <li>
          <input id="a12b15" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="a12b15">오후 (12시 - 3시)</label>
          </li>
        <li>
          <input id="a15b18" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="a15b18">오후 (3시 - 6시)</label>
          </li>
        <li>
          <input id="a19b21" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="a19b21">저녁 (7시 - 9시)</label>
          </li>
        <li>
          <input id="a21b24" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="a21b24">밤 (9시 - 12시)</label>
          </li>
        <li>
          <input id="a24" type="checkbox" onClick={pushSchedule}/>
          <label htmlFor="a24">새벽 (12시 - 2시)</label>
          </li>
      </Times>
      {
        scheduleList.map((time:string, i:any) => (
          <li key={i} onClick={()=>removeSchedule(time)}>{time}</li>
        ))
      }
      <Hr/>
      <SelectedTimes>
        <Headline>
          <Title>선택한 모든 일정</Title>
        </Headline>
      </SelectedTimes>
    </section>
  )
}