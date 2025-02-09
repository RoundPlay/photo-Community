import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const EventCreateModal = ({ isModalOpen, closeModal }) => {
  const [formData, setFormData] = useState({

    title: '',
    place: '',
    longitude: '',
    latitude: '',
    image: '',
    date: '',
    content: '',
    like: 0,
    link: '',
  });

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (isModalOpen && window.naver) {
      const { naver } = window;
      const location = new naver.maps.LatLng(37.5665, 126.978086);
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
      });

      naver.maps.Event.addListener(map, 'click', (e) => {
        const lat = e.coord.lat();
        const lng = e.coord.lng();

        setFormData((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
        }));

        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        markerRef.current = new naver.maps.Marker({
          position: new naver.maps.LatLng(lat, lng),
          map,
        });
      });
    }
  }, [isModalOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, like: 0 }),
      });

      const result = await response.json();
      console.log('서버 응답:', result);

      if (response.ok) {
        alert('요청이 성공적으로 전송되었습니다.');
        closeModal();
      } else {
        alert('요청 실패');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>공연 등록</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div ref={mapRef} style={{ width: '100%', height: '300px', borderRadius: '8px', marginTop: '15px' }}></div>
        <Form>
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>장소</Form.Label>
            <Form.Control type="text" name="place" value={formData.place} onChange={handleChange} />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>이미지 URL</Form.Label>
            <Form.Control type="text" name="image" value={formData.image} onChange={handleChange} />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>날짜</Form.Label>
            <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" name="content" value={formData.content} onChange={handleChange} rows={3} />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>티켓 링크</Form.Label>
            <Form.Control type="text" name="link" value={formData.link} onChange={handleChange} />
          </Form.Group>
        </Form>        
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>등록</Button>
        <Button variant="secondary" onClick={closeModal}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
};

export { EventCreateModal };
