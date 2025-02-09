import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  let [id, setId] = useState('');
  let [password, setPassword] = useState('');
  let navigate = useNavigate();

  const login = () => {
    if (id === '' || password === '') {
      alert('아이디 또는 비밀번호를 입력해주세요.');
    } else {
      axios
        .post('http://localhost:5173/data/user.json', { id: id, password: password })
        .then((response) => {
          if (response.headers[id] === id) {
            alert('로그인 성공');
            navigate('/');
          } else {
            alert('올바르지 않은 아이디 또는 비밀번호입니다.');
          }
        })
        .catch((error) => {
          console.error('오류 발생:', error);
        });
    }
  };

  return (
    <div className="container d-flex vh-100">
      <div className="row justify-content-center align-items-center w-100">
        {/* 기존 코드에서 흰 박스 크기만 살짝 증가 */}
        <div
          className="col-md-7 col-lg-5 bg-light p-5 rounded shadow"
          style={{ paddingBottom: '15px' }}>
          <h3 className="text-center mb-4">Login</h3>
          <input
            className="form-control mb-3 w-100"
            placeholder="ID"
            onChange={(e) => setId(e.target.value)}
          />
          <input
            className="form-control mb-4 w-100"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-primary w-100 mb-3"
            onClick={login}>
            로그인 하기
          </button>
          <p
            className="text-center text-primary"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/signup')}>
            아직 회원이 아니신가요? 회원가입 하기
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
