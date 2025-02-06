import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  let [id, setId] = useState('');
  let [password, setPassword] = useState('');
  let navigate = useNavigate();

  return (
    <div className="container d-flex vh-100">
      <div className="row justify-content-center align-items-center w-100">
        <div className="col-md-6 col-lg-4 bg-light p-4 rounded shadow">
          <h3 className="text-center mb-4">Login</h3>
          <input
            className="form-control mb-2"
            placeholder="ID"
            onChange={(e) => setId(e.target.value)}
          />
          <input
            className="form-control mb-4"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-primary w-100"
            onClick={() => {
              console.log(id, password);
              navigate('/');
            }}>
            로그인 하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
