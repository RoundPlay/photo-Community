import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { HomeCard } from '../components/homeCard';
import { Sidebar } from '../components/sidebar';

function Home() {
  const mapRef = useRef(null);
  const lat = 37.5665; // 위도 숫자로 넣어주기
  const lng = 126.978086; // 경도 숫자로 넣어주기

  const [allPosts, setAllPosts] = useState([]); // ✅ 전체 데이터
  const [oneWeekPosts, setOneWeekPosts] = useState([]); // ✅ 7일 후까지의 데이터
  const [futurePosts, setFuturePosts] = useState([]); // ✅ 오늘 이후의 모든 데이터

  useEffect(() => {
    axios
      .get('/data/data.js')
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

      {oneWeekPosts.map((post, i) => (
        <HomeCard
          key={i}
          id={post.id}
          title={post.title}
          longitude={post.longitude}
          latitude={post.latitude}
          image={post.image}
          like={post.like}
          data={post.date}
        />
      ))}
    </>
  );
}

export { Home };
