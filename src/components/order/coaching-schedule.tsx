import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { min, Colors } from "components/ui";
import { Hr, Headline, Title, Desc } from "./common-styles";

function copyObj(obj:any) {
  const result:{[key: string]: any} = {};
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      result[key] = copyObj(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

export default function ScheduleSection({scheduleList, setScheduleList}: any){
  const times:{[key: string]: any} = {
    b9: {
      label: '오전 (9시 이전)',
      active: false,
    },
    a9b12: {
      label: '오전 (9시 - 12시)',
      active: false,
    },
    a12b15: {
      label: '오후 (12시 - 3시)',
      active: false,
    },
    a15b18: {
      label: '오후 (3시 - 6시)',
      active: false,
    },
    a19b21: {
      label: '저녁 (7시 - 9시)',
      active: false,
    },
    a21b24: {
      label: '밤 (9시 - 12시)',
      active: false,
    },
    a24: {
      label: '새벽 (12시 - 2시)',
      active: false,
    },
  };
  // 시간 on/off useState
  const [allTime_status, allTime_setStatus] = useState<boolean>(false);
  const [b9_status, b9_setStatus] = useState<boolean>(false);
  const [a9b12_status, a9b12_setStatus] = useState<boolean>(false);
  const [a12b15_status, a12b15_setStatus] = useState<boolean>(false);
  const [a15b18_status, a15b18_setStatus] = useState<boolean>(false);
  const [a19b21_status, a19b21_setStatus] = useState<boolean>(false);
  const [a21b24_status, a21b24_setStatus] = useState<boolean>(false);
  const [a24_status, a24_setStatus] = useState<boolean>(false);

  const [schedule, setSchedule] = useState<{[key: string]: any}>({
    mon: {
      label: '월',
      active: false,
      time: copyObj(times),
    },
    tue: {
      label: '화',
      active: false,
      time: copyObj(times),
    },
    wed: {
      label: '수',
      active: false,
      time: copyObj(times),
    },
    thu: {
      label: '목',
      active: false,
      time: copyObj(times),
    },
    fri: {
      label: '금',
      active: false,
      time: copyObj(times),
    },
    sat: {
      label: '토',
      active: false,
      time: copyObj(times),
    },
    sun: {
      label: '일',
      active: false,
      time: copyObj(times),
    },
  });

  // 요일 버튼을 클릭했는지, 시간 체크박스를 클릭했는지 행동을 저장함
  const [clickAction, setClickAction] = useState<string>('');
  // 클릭된 요일들을 저장함
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [every, onEvery] = useState<boolean>(false);
  const [day, onDay] = useState<boolean>(false);
  const [end, onEnd] = useState<boolean>(false);

  const isActived = schedule.mon.active || schedule.tue.active || schedule.wed.active || schedule.thu.active || schedule.fri.active || schedule.sat.active || schedule.sun.active;
  const isEvery = schedule.mon.active && schedule.tue.active && schedule.wed.active && schedule.thu.active && schedule.fri.active && schedule.sat.active && schedule.sun.active;
  const isDay = schedule.mon.active && schedule.tue.active && schedule.wed.active && schedule.thu.active && schedule.fri.active;
  const isEnd = schedule.sat.active && schedule.sun.active;

  // reduser
  function checkTime(time: string){
    return Object.keys(schedule).map((day) => schedule[day].active ? schedule[day].time[time].active : true)
                         .reduce((acc, curr) => acc && curr);               
  }

  // 모든 요일, 평일, 주말 on/off
  useEffect(() => {
    if(clickAction === 'times'){
      offEvery();
      let lastClicked:string = selectedDays[selectedDays.length-1];
      setSelectedDays([]);
      toggle(lastClicked);
    }
    setClickAction('days');

    isEvery ? onEvery(true) : onEvery(false);
    isDay ? onDay(true) : onDay(false);
    isEnd ? onEnd(true) : onEnd(false);

  },[schedule.mon.active,
    schedule.tue.active,
    schedule.wed.active,
    schedule.thu.active,
    schedule.fri.active,
    schedule.sat.active,
    schedule.sun.active
  ]);

  // 체크박스 연동
  useEffect(() => {
    allTime_setStatus(checkTime('b9') && checkTime('a9b12') && checkTime('a12b15') && checkTime('a15b18') && checkTime('a19b21') && checkTime('a24'));
    b9_setStatus(checkTime('b9'));
    a9b12_setStatus(checkTime('a9b12'));
    a12b15_setStatus(checkTime('a12b15'));
    a15b18_setStatus(checkTime('a15b18'));
    a19b21_setStatus(checkTime('a19b21'));
    a21b24_setStatus(checkTime('a21b24'));
    a24_setStatus(checkTime('a24'));
  },[schedule]);

  // selectedDays 배열에 요일 추가
  function pushDay(day:string){
    const newArr = [...selectedDays];
    newArr.push(day);
    setSelectedDays(newArr);
  }

  // 버튼 클릭 시 토글 동작
  function toggle(day:string){
    pushDay(day);
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
      pushDay(key);
    }
    setSchedule(newObj);
  }

  function toggleDay() {
    const status = !day;
    const newObj = {...schedule};
    newObj.mon.active = status; pushDay('mon');
    newObj.tue.active = status; pushDay('tue');
    newObj.wed.active = status; pushDay('wed');
    newObj.thu.active = status; pushDay('thu');
    newObj.fri.active = status; pushDay('fri');
    setSchedule(newObj);
  }

  function toggleEnd() {
    const status = !end;
    const newObj = {...schedule};
    newObj.sat.active = status; pushDay('sat');
    newObj.sun.active = status; pushDay('sun');
    setSchedule(newObj);
  }

  // 모든 요일 체크해제
  function offEvery() {
    const status = false;
    const newObj = {...schedule};
    for(const key in newObj){
      newObj[key].active = status;
    }
    setSchedule(newObj);
  }

  // 일정 추가
  function pushSchedule(e: any){
    setClickAction('times');
    const newArr = [...scheduleList];
    const newObj = {...schedule};

    for(const key in schedule){
      if(schedule[key].active){
        if(e.target.checked){
          if(!schedule[key].time[e.target.value].active){
            //추가
            newObj[key].time[e.target.value] = {
              ...schedule[key].time[e.target.value],
              active: true
            }
            newArr.push({
              day: key,
              time: e.target.value,
              label: newObj[key].label + ' / ' + newObj[key].time[e.target.value].label
            });
          }
        } else {
           //삭제
          newObj[key].time[e.target.value] = {
            ...schedule[key].time[e.target.value],
            active: false
          }
          let removeIdx = newArr.findIndex((schedule) => schedule.day === key && schedule.time === e.target.value);
          newArr.splice(removeIdx, 1);
        }
      }
    }
    setScheduleList(newArr);
    setSchedule(newObj);
  }

  // 일정 삭제
  function removeSchedule(day: string, time: string){
    setClickAction('times');
    // 스케쥴 객체 갱신
    const newObj = {...schedule};
    newObj[day].time[time] = {
      ...schedule[day].time[time],
      active: false
    }
    setSchedule(newObj);

    // 선택된 일정 객체 갱신
    const newArr = [...scheduleList];
    let removeIdx = newArr.findIndex((schedule) => schedule.day === day && schedule.time === time);
    newArr.splice(removeIdx, 1);
    setScheduleList(newArr);
  }

  // 모든 시간 추가
  function toggleAllTime(e: any) {
    setClickAction('times');
    const newArr = [...scheduleList];
    const newObj = {...schedule};

    for(const key in schedule){
      if(schedule[key].active){
        for(const time in schedule[key].time){
          if(e.target.checked){
            if(!schedule[key].time[time].active){
              //추가
              newObj[key].time[time] = {
                ...schedule[key].time[time],
                active: true
              }
              newArr.push({
                day: key,
                time: time,
                label: newObj[key].label + ' / ' + newObj[key].time[time].label
              });
            }
          } else {
            //삭제
            newObj[key].time[time] = {
              ...schedule[key].time[time],
              active: false
            }
            let removeIdx = newArr.findIndex((schedule) => schedule.day === key && schedule.time === time);
            newArr.splice(removeIdx, 1);
          }
        }
      }
    }
    setScheduleList(newArr);
    setSchedule(newObj);
  }

  return (
    <Section>
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
          <input id="all" value="all" type="checkbox"
                  onChange={toggleAllTime}
                  checked={allTime_status}
                  onClick={()=>allTime_setStatus(!allTime_status)}/>
          <label htmlFor="all">모든 시간</label>
        </li>
        <li>
          <input id="b9" value="b9" type="checkbox"
                  onChange={pushSchedule}
                  checked={b9_status}
                  onClick={()=>b9_setStatus(!b9_status)}/>
          <label htmlFor="b9">오전 (9시 이전)</label>
          </li>
        <li>
          <input id="a9b12" value="a9b12" type="checkbox"
                  onChange={pushSchedule}
                  checked={a9b12_status}
                  onClick={()=>a9b12_setStatus(!a9b12_status)}/>
          <label htmlFor="a9b12">오전 (9시 - 12시)</label>
          </li>
        <li>
          <input id="a12b15" value="a12b15" type="checkbox"
                  onChange={pushSchedule}
                  checked={a12b15_status}
                  onClick={()=>a12b15_setStatus(!a12b15_status)}/>
          <label htmlFor="a12b15">오후 (12시 - 3시)</label>
          </li>
        <li>
          <input id="a15b18" value="a15b18" type="checkbox"
                  onChange={pushSchedule}
                  checked={a15b18_status}
                  onClick={()=>a15b18_setStatus(!a15b18_status)}/>
          <label htmlFor="a15b18">오후 (3시 - 6시)</label>
          </li>
        <li>
          <input id="a19b21" value="a19b21" type="checkbox"
                  onChange={pushSchedule}
                  checked={a19b21_status}
                  onClick={()=>a19b21_setStatus(!a19b21_status)}/>
          <label htmlFor="a19b21">저녁 (7시 - 9시)</label>
          </li>
        <li>
          <input id="a21b24" value="a21b24" type="checkbox"
                  onChange={pushSchedule}
                  checked={a21b24_status}
                  onClick={()=>a21b24_setStatus(!a21b24_status)}/>
          <label htmlFor="a21b24">밤 (9시 - 12시)</label>
          </li>
        <li>
          <input id="a24" value="a24" type="checkbox"
                  onChange={pushSchedule}
                  checked={a24_status}
                  onClick={()=>a24_setStatus(!a24_status)}/>
          <label htmlFor="a24">새벽 (12시 - 2시)</label>
          </li>
      </Times>
      <Hr/>
      <SelectedTimes>
        <Headline>
          <Title>선택한 모든 일정</Title>
        </Headline>
        <ul>
        {
          scheduleList.map((schedule:any, i:any) => (
            <TimeTag key={i}>
              {schedule.label}
              <DelBtn onClick={()=>removeSchedule(schedule.day, schedule.time)}/>
            </TimeTag>
          ))
        }
        </ul>
      </SelectedTimes>
    </Section>
  )
}

const Section = styled.section``;

const Btns = styled.ul`
    width: calc(100% + 40px);
    overflow: auto;
    margin: 12px -20px 0;
    padding: 16px 20px;
    white-space: nowrap;
    
    li {
      display: inline-block;
      min-width: 48px;
      margin-right: 4px;
  
      &:last-of-type {
        margin-right: 0;
      }
    }

    ${min[1]} {
      display: flex;
      width: 100%;
      margin: 36px 0 16px;
      padding: 0;

      li {
        flex-grow: 1;
        flex-basis: 0px;
        margin-right: 9px;
      }
    }
  `;

  const Btn = styled.button`
    border: 1px ${Colors.gray3} solid;
    background: ${Colors.white};
    cursor: pointer;
    width: 100%;
    font-size: 0.75rem;
    line-height: 16px;
    padding: 4px 10px 3px;
    border-radius: 8px;
    color: ${Colors.gray3};

    &.on {
      border-color: ${Colors.primary};
      color: ${Colors.primary};
    }

    ${min[1]} {
      padding: 0;
      font-size: 14px;
      line-height: 24px;
    }
  `;

  const Times = styled.ul`
    visibility: hidden;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;

    &.visible {
      visibility: visible;
    }

    li {
      flex-basis: 50%;
      padding: 12px 0;
    }

    input[type=checkbox]{
      display: none;
    }
    label {
      font-size: 0.75rem;
      line-height: 160%;
      cursor: pointer;
    }
    input[type=checkbox] + label::before {
      content: '';
      display: inline-block;
      width: 14px;
      height: 14px;
      vertical-align: middle;
      margin-right: 12px;
      border-radius: 2px;
      border: 1px solid ${Colors.gray3};
    }
    input[type=checkbox] + label:hover::before {
      border-color: ${Colors.primary};
    }
    input[type=checkbox]:checked + label::before {
      border-color: ${Colors.primary};
      background: url('/icon/done_24px.svg') center/10px 10px no-repeat;
      background-color: ${Colors.primary};
    }

    ${min[1]}{
      display: block;
      border: 1px ${Colors.primary} solid;
      border-radius: 8px;
      padding: 4px 20px;
      margin-bottom: 36px;

      li {
        flex-basis: 100%;
        padding: 16px 0;
      }

      label {
        font-size: 16px;
      }
      input[type=checkbox] + label::before {
        width: 24px;
        height: 24px;
        margin-right: 15px;
        border-radius: 4px;
      }
      input[type=checkbox]:checked + label::before {
        background-size: 17px 13px;
      }
    }
  `;


  const SelectedTimes = styled.div`
    margin-top: 20px;

    ul {
      margin: 12px -6px 18px;
    }
    
    ${min[1]}{
      margin-top: 24px;

      ul {
        margin: 22px -6px 18px;
      }
    }
  `;

  const TimeTag = styled.li`
    display: inline-block;
    list-style: none;
    padding: 1px 8px;
    margin: 4px;
    border: 1px solid ${Colors.primarySemiLight};
    border-radius: 8px;
    font-size: 11px;
    line-height: 24px;

    ${min[1]}{
      padding: 3px 8px;
      font-size: 14px;
      margin: 6px;
    }
  `;

  const DelBtn = styled.button`
    width: 16px;
    height: 16px;
    border: 0;
    background: url('/icon/close_24px.svg') center/20px 20px no-repeat;
    vertical-align: middle;
    cursor: pointer;
    margin-left: 4px;

    ${min[1]}{
      width: 20px;
      height: 20px;
      background-size: 24px 24px;
    }
  `;