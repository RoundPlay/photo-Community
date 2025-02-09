import { useRef, useEffect, useState, React} from 'react';
import axios from 'axios';
import { Card } from '../components/homeCard';
import { Sidebar } from '../components/sidebar';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import plus from '../assets/plus.png';
import {EventCreateModal} from '../components/eventCreateModal';
import Slider from "react-slick";


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


  
  const [formData, setFormData] = useState({
    title: '',
    place: '',
    image: '',
    date: '',
    content: '',
    like: 0,
    link: '',
  });


  var sliderSettings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  

  let navigate = useNavigate();




  useEffect(() => {
    axios
      .get('/data/data.json')
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
        const marker = new naver.maps.Marker({
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
  
        // 마커 클릭 시 해당 post.id로 이동
        naver.maps.Event.addListener(marker, 'click', () => {
          window.location.href = `/post/${post.id}`;
        });
      });
    }
  }, [oneWeekPosts]);

  const openModal = () => {
    setIsModalOpen(true)
    console.log("모달 열림",isModalOpen);
    console.log('formData:', formData); 

  };
  const closeModal = () => setIsModalOpen(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = () => {
    console.log(formData);
    // 서버에 formData 전송하거나 다른 로직 처리
  };

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
      <h1 className="slider-title">이번주 상영 연극</h1>
      <div className="slider-wrapper">
        <Slider 
        {...sliderSettings} className="custom-slider">
          {
            oneWeekPosts.map((post,i)=>(
              <div key={i}>
              <Card
              id={post.id}
              title={post.title}
              date={post.date}
              image={post.image}
              navigate={navigate}
            />
            </div>
      
            )
          )

          }
        </Slider>
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

      <EventCreateModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        markerPosition={markerPosition}
        formData={formData}        // formData 전달
        handleChange={handleChange} // handleChange 전달
        handleSubmit={handleSubmit} // handleSubmit 전달
      />
      
    </>
  );
}

export { Home };
