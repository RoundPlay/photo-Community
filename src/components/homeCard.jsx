import { useState } from 'react';

function Card(props) {
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0); // 드래그 시작 지점  
  const [endX, setEndX] = useState(0); // 드래그 끝 지점

  const handleMouseDown = (event) => {
    // 마우스가 눌린 시작 지점 기록
    setStartX(event.clientX);
  };

  const handleMouseUp = (event) => {
    setEndX(event.clientX); // 소문자 'x' -> 대문자 'X'로 수정
    if (Math.abs(startX - endX) > 100) {
      setIsDrag(false);
    } else {
      setIsDrag(true);
    }
    console.log(Math.abs(startX - endX))
    console.log(isDrag)
    if (isDrag) {
      event.preventDefault();  // 드래그 중에는 페이지 이동을 막음
      console.log("드래그 감지됨, 이동 취소");
    } else {
      console.log("클릭 감지됨, 페이지 이동");
      props.navigate(`post/${props.id}`);
    } 

    setStartX(0); // 상태 초기화
    setEndX(0);   // 상태 초기화
  };

  return (
    <div 
      className='card' 
      onMouseDown={handleMouseDown} // 마우스 눌렀을 때
      onMouseUp={handleMouseUp}
    >
      <img src={props.image} className='card-img-top' alt='card' />
      <div className='card-body'>
        <p className='card-text'>{props.title}</p>
        <p className='card-text'>{props.date}</p>
      </div>
    </div>
  );
}

export { Card };
