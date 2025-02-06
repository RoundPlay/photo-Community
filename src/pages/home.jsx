import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '../components/homeCard';
import { Sidebar } from '../components/sidebar';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import plus from '../assets/plus.png';

function Home() {
  const mapRef = useRef(null);
  const modalMapRef = useRef(null);
  const lat = 37.5665; // 위도 숫자로 넣어주기
  const lng = 126.978086; // 경도 숫자로 넣어주기

  const [allPosts, setAllPosts] = useState([]); // ✅ 전체 데이터
  const [oneWeekPosts, setOneWeekPosts] = useState([]); // ✅ 7일 후까지의 데이터
  const [futurePosts, setFuturePosts] = useState([]); // ✅ 오늘 이후의 모든 데이터
  const [isModalOpen, setIsModalOpen] = useState(false); // 글쓰기 창 열림/닫힘 상태
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 }); // 클릭한 위치의 좌표

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/data/homedata.json')
      .then((result) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 시간 초기화 (정확한 비교를 위해)

        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        // ✅ 전체 데이터 저장
        setAllPosts(result.data);

        // ✅ 오늘 이후의 데이터 (오늘 포함)
        const future = result.data.filter((post) => {
          const postDate = new Date(post.date);
          return postDate >= today;
        });
        setFuturePosts(future);

        // ✅ 7일 이내의 데이터 필터링
        const week = future.filter((post) => {
          const postDate = new Date(post.date);
          return postDate <= nextWeek;
        });
        setOneWeekPosts(week);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 데 오류가 발생했습니다:', error);
      });
  }, []);

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(lat, lng);
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
      });

      oneWeekPosts.forEach((post) => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(post.latitude, post.longitude),
          map,
          icon: {
            url: post.image, // 이미지 URL
            size: new naver.maps.Size(50, 80), // 이미지 크기 설정 (가로, 세로)
            scaledSize: new naver.maps.Size(50, 70), // 이미지 비율 유지하며 축소/확대
            origin: new naver.maps.Point(0, 0), // 이미지 원점
            anchor: new naver.maps.Point(25, 25), // 마커의 기준점 (중앙 정렬)
          },
        });
      });
    }
  }, [oneWeekPosts]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 지도 클릭 시 좌표 받기
  const handleMapClick = (e) => {
    const clickedPosition = e.coord;
    setMarkerPosition({
      lat: clickedPosition.lat(),
      lng: clickedPosition.lng(),
    });
  };

  useEffect(() => {
    const { naver } = window;
    if (modalMapRef.current && naver) {
      const location = new naver.maps.LatLng(lat, lng);
      const map = new naver.maps.Map(modalMapRef.current, {
        center: location,
        zoom: 17,
      });

      naver.maps.Event.addListener(map, 'click', handleMapClick); // 클릭 이벤트 추가
    }
  }, [isModalOpen]);

  return (
    <>
      <Sidebar></Sidebar>
      <h3 style={{ position: 'absolute', top: '25px', left: '18px' }}>알림</h3>
      <div
        ref={mapRef}
        style={{
          position: 'absolute',
          top: '40%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
          width: '103vh',
          height: '70vh',
          minWidth: '630px',
          minHeight: '450px',
        }}></div>
      <div className='card-list'>
        {oneWeekPosts.map((post, i) => (
          <Card
            key={i}
            id={post.id}
            title={post.title}
            date={post.date}
            image={post.image}
            navigate={navigate}
          />
        ))}
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          cursor: 'pointer',
        }}
        onClick={openModal}>
        <img
          src={plus}
          alt='plus icon'
          style={{ width: '50px', height: '50px' }}
        />
      </div>
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: '9999',
          }}
          onClick={closeModal}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '60%',
              maxWidth: '600px',
            }}
            onClick={(e) => e.stopPropagation()}>
            <h3>글쓰기</h3>
            <div
              ref={modalMapRef}
              style={{
                width: '100%',
                height: '400px',
                borderRadius: '8px',
                marginBottom: '10px',
              }}></div>
            <p>위도: {markerPosition.lat}</p>
            <p>경도: {markerPosition.lng}</p>
            <Button onClick={closeModal}>닫기</Button>
          </div>
        </div>
      )}
    </>
  );
}

export { Home };
