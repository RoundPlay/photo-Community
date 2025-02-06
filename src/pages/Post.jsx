import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import wheart from './../assets/heart.png';
import bheart from './../assets/heart1.png';
import { Sidebar } from '../components/sidebar.jsx';

function Post() {
  let [cardlist, setCardlist] = useState([]);
  let { id } = useParams();
  let [heart, setHeart] = useState(0);
  let [likecount, setLikecount] = useState(0);

  useEffect(() => {
    axios
      .get('/data/data.json') // JSON 파일 로드
      .then((result) => {
        setCardlist(result.data); // 상태에 데이터 저장
      })
      .catch((error) => {
        console.error('데이터 로드 실패:', error);
      });
  }, []);

  let find = cardlist.find((x) => x.id === parseInt(id)); // id를 숫자로 변환하여 비교

  // 데이터 로드 중일 때 처리
  if (!find) {
    return <p>로딩 중...</p>;
  }

  const Like = () => {
    if (likecount === 0) {
      setHeart(1);
      let copy = [...cardlist];
      copy[id].like++;
      setCardlist(copy);
      setLikecount(1);
    } else {
      setHeart(0);
      let copy = [...cardlist];
      copy[id].like--;
      setCardlist(copy);
      setLikecount(0);
    }
  };

  return (
    <div
      className="flex-grow-1 d-flex vh-100 align-items-center"
      style={{ marginLeft: '250px', overflow: 'auto' }}>
      <Sidebar />
      <div className="row align-items-center justify-content-center w-100 text-center text-md-start">
        <div className="col-md-6 d-flex justify-content-center mb-4 mb-md-0">
          <div className="bg-light rounded shadow">
            <img
              src={find.image}
              alt={find.title}
              className="img-fluid"
            />
            <div className="d-flex align-items-center">
              <img
                style={{ width: '25px', padding: '2px', marginBottom: '2px', cursor: 'pointer' }}
                src={heart === 0 ? wheart : bheart}
                onClick={Like}
              />
              <span>{find.like}</span>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center ">
          <h3>{find.title}</h3>
          <p>{find.content}</p>
          <div className="d-flex align-items-center justify-content-center justify-content-md-start">
            <p className="me-5 fw-bold">장소</p>
            <p>{find.place}</p>
          </div>
          <div className="d-flex align-items-center justify-content-center justify-content-md-start">
            <p className="me-3 fw-bold">공연 기간</p>
            <p>{find.date}</p>
          </div>
          <div className="d-flex align-items-center justify-content-center justify-content-md-start">
            <a
              href={find.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-50">
              예매하러 가기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
