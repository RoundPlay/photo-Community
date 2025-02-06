import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

const apiKey = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

const loadNaverMapScript = () => {
  const existingScript = document.getElementById('naver-map-script');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = 'naver-map-script';
    script.type = 'text/javascript';
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${apiKey}`;
    script.async = true;
    document.head.appendChild(script);
  }
};

// 네이버 지도 API 로드
loadNaverMapScript();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
