import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import wheart from './../assets/heart.png';
import bheart from './../assets/heart1.png';
import { Sidebar } from '../components/sidebar.jsx';

function Post() {
  const { id } = useParams();
  const [card, setCard] = useState(null); // null로 초기화
  const [heart, setHeart] = useState(0);
  const [likecount, setLikecount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/post/${id}`) // JSON 파일 로드
      .then((result) => {
        setCard(result.data.data); // 상태에 데이터 저장
        console.log(result.data.data.image);
      })
      .catch((error) => {
        console.error('데이터 로드 실패:', error);
      });
  }, [id]); // id 변경 시마다 데이터 새로 불러오기

  // 데이터가 로딩 중일 때
  if (!card) {
    return <p>로딩 중...</p>;
  }

  const Like = () => {
    if (likecount === 0) {
      setHeart(1);
      setCard((prevCard) => ({ ...prevCard, like: prevCard.like + 1 })); // card에서 like 값 증가
      setLikecount(1);
    } else {
      setHeart(0);
      setCard((prevCard) => ({ ...prevCard, like: prevCard.like - 1 })); // card에서 like 값 감소
      setLikecount(0);
    }
  };

  return (
    <div
      className="flex-grow-1 d-flex vh-100 align-items-center"
      style={{ marginLeft: '250px', overflow: 'auto' }}
    >
      <Sidebar />
      <div className="row align-items-center justify-content-center w-100 text-center text-md-start">
        <div className="col-md-6 d-flex justify-content-center mb-4 mb-md-0">
          <div className="bg-light rounded shadow">
            <img src={card.image} alt={card.title} className="img-fluid" />
            <div className="d-flex align-items-center">
              <img
                style={{ width: '25px', padding: '2px', marginBottom: '2px', cursor: 'pointer' }}
                src={heart === 0 ? wheart : bheart}
                onClick={Like}
              />
              <span>{card.like}</span>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center ">
          <h3>{card.title}</h3>
          <p>{card.content}</p>
          <div className="d-flex align-items-center justify-content-center justify-content-md-start">
            <p className="me-5 fw-bold">장소</p>
            <p>{card.place}</p>
          </div>
          <div className="d-flex align-items-center justify-content-center justify-content-md-start">
            <p className="me-3 fw-bold">공연 기간</p>
            <p>{card.date}</p>
          </div>
          <div className="d-flex align-items-center justify-content-center justify-content-md-start">
            <a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-50"
            >
              예매하러 가기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
