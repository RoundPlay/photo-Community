import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isClick, setIsClick] = useState(false);
  const [pwCheck, setPwCheck] = useState('');
  const [idValidation, setIdValidation] = useState(null); // null 초기값
  const [pwdValidation, setPwdValidation] = useState(null);
  const [duplicateCheck, setDuplicateCheck] = useState(null); // 중복 확인 상태
  const navigate = useNavigate();

  const idCheck = () => {
    // const usedIds = ['test123', 'hello', 'admin']; // 사용 중인 아이디 리스트
    // if (usedIds.includes(id)) {
    //   setDuplicateCheck(false); // 중복된 아이디
    //   setIsClick(false);
    // } else {
    //   setDuplicateCheck(true);
    //   setIsClick(true); // 사용 가능한 아이디
    // }
    axios
      .post('http://localhost:5173/data/user.json', { id: id })
      .then((response) => {
        setDuplicateCheck(response.headers['id-check']);
        console.log(duplicateCheck);
      })
      .catch((error) => {
        console.error('오류 발생:', error);
      });

    if (duplicateCheck == false) {
      setIsClick(false);
    } else {
      setIsClick(true);
    }
  };

  const handleIdChange = (value) => {
    setId(value);

    // 길이 검사
    if (value.length < 4) {
      setIdValidation(false);
      setDuplicateCheck(null); // 메시지 초기화
    } else {
      setIdValidation(true);
      setDuplicateCheck(null); // 길이 만족 시 중복 확인 초기화
    }
  };

  const idStatus = (
    <div className="d-flex align-items-center mt-2 mb-3">
      <label
        className="me-2"
        style={{ width: '92px', textAlign: 'left' }}></label>
      {idValidation === false && (
        <small
          className="text-danger"
          style={{ marginTop: '3px' }}>
          아이디는 4자 이상이어야 합니다.
        </small>
      )}
      {idValidation === true && duplicateCheck === true && (
        <small
          className="text-success"
          style={{ marginTop: '3px' }}>
          사용 가능한 아이디입니다.
        </small>
      )}
      {idValidation === true && duplicateCheck === false && (
        <small
          className="text-danger"
          style={{ marginTop: '3px' }}>
          사용 중인 아이디입니다.
        </small>
      )}
    </div>
  );

  const handlePwdChange = (value) => {
    setPassword(value);

    // 길이 검사
    if (value.length < 8) {
      setPwdValidation(false);
    } else {
      setPwdValidation(true);
    }
  };

  const pwStatus = (
    <div className="d-flex align-items-center mt-2 mb-3">
      <label
        className="me-2"
        style={{ width: '92px', textAlign: 'left' }}></label>
      {pwdValidation === false && (
        <small
          className="text-danger"
          style={{ marginTop: '3px' }}>
          비밀번호는 8자 이상으로 설정해주세요.
        </small>
      )}
    </div>
  );

  const pwcStatus = (
    <div className="d-flex align-items-center mt-2 mb-3">
      <label
        className="me-2"
        style={{ width: '92px', textAlign: 'left' }}></label>
      {pwCheck == '' ? null : pwCheck != password && pwCheck != '' ? (
        <small
          className="text-danger"
          style={{ marginTop: '3px' }}>
          비밀번호가 일치하지 않습니다.
        </small>
      ) : pwCheck != '' ? (
        <small
          className="text-success"
          style={{ marginTop: '3px' }}>
          비밀번호가 일치합니다.
        </small>
      ) : null}
    </div>
  );

  const signup = () => {
    if (id === '' || password === '' || pwCheck === '') {
      alert('정보를 입력해주세요.');
      return;
    }

    if (isClick != true) {
      alert('아이디 중복 확인을 해 주세요.');
      return;
    }

    if (password !== pwCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    axios.post('http://localhost:5173/data/user.json', { id: id, password: password });

    alert('회원가입이 완료되었습니다.');
    console.log(id, password);
    navigate('/login');
  };

  return (
    <div className="container d-flex vh-100">
      <div className="row justify-content-center align-items-center w-100">
        <div className="col-md-8 col-lg-6 bg-light p-5 rounded shadow">
          <h3 className="text-center mb-4">SignUp</h3>
          {/* 아이디 입력 */}
          <div className="d-flex flex-column mb-1">
            <div className="d-flex align-items-center">
              <label
                htmlFor="idInput"
                className="me-2"
                style={{ width: '90px', textAlign: 'left' }}>
                아이디
              </label>
              <input
                id="idInput"
                type="text"
                className="form-control me-2"
                value={id}
                onChange={(e) => handleIdChange(e.target.value)}
                style={{ flex: '1' }}
              />
              <button
                className="btn btn-primary"
                onClick={idCheck}
                disabled={idValidation !== true} // 길이 유효하지 않으면 비활성화
              >
                중복 확인
              </button>
            </div>
            {/* 아이디 상태 메시지 */}
            {idStatus}
          </div>
          {/* 비밀번호 입력 */}
          <div className="d-flex flex-column mb-1">
            <div className="d-flex align-items-center">
              <label
                htmlFor="passwordInput"
                className="me-2"
                style={{ width: '90px', textAlign: 'left' }}>
                비밀번호
              </label>
              <input
                id="passwordInput"
                type="password"
                className="form-control"
                onChange={(e) => handlePwdChange(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            {/* 비밀번호 상태 메시지 */}
            {pwStatus}
          </div>
          {/* 비밀번호 확인 */}
          <div className="d-flex flex-column mb-2">
            <div className="d-flex align-items-center">
              <label
                htmlFor="passwordCheckInput"
                className="me-2"
                style={{ width: '90px', textAlign: 'left' }}>
                비밀번호 확인
              </label>
              <input
                id="passwordCheckInput"
                type="password"
                className="form-control"
                onChange={(e) => setPwCheck(e.target.value)}
                style={{ flex: '1' }}
              />
            </div>
            {pwcStatus}
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary w-50"
              onClick={signup}
              disabled={duplicateCheck !== true}>
              가입 하기
            </button>
          </div>
          <p
            className="text-center text-primary mt-3"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/login')}>
            이미 회원이신가요? 로그인 하기
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
