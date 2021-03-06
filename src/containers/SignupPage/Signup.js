import React, { useEffect, useState, useRef, useCallback } from 'react';

import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import './Signup.scss';
import Authentication from 'lib/api/Authentication';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Signup = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');

    //bool값을 사용해 input의 메세지를 display처리한 이유 ,string값을 변수로 둬서 입력내용을 바꾸지 않은 이유
    //타이머 시작, 회원가입 버튼 클릭 시 유효성 검사하기 편해서
    const [visibleIdMessage, setVisibleIdMessage] = useState(false);
    const [visibleNicknameMessage, setvisibleNicknameMessage] = useState(false);
    const [visiblePwMessage, setVisiblePwMessage] = useState(false);
    const [visiblePpwwMessage, setVisiblePpwwMessage] = useState(false);

    const onChangeEmail = e => setUserEmail(e.target.value);
    const onChangeNickname = e => setUserNickname(e.target.value);
    const onChangePassword = e => {
        setUserPassword(e.target.value);
        setVisiblePwMessage(true);
    }
    const onChangePasswordConfirm = e => {
        setUserPasswordConfirm(e.target.value);
        setVisiblePpwwMessage(true);
    }
    useEffect(() => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        if (!passwordRegex.test(userPassword)) {
            console.log(userPassword);
            console.log(passwordRegex.test(userPassword));
        } else {
            setVisiblePwMessage(false);
        }
    }, [userPassword]);
    useEffect(() => {
        console.log(userPassword);
        console.log(userPasswordConfirm);
        if (userPassword === userPasswordConfirm) {
            console.log("password comfrim!")
            setVisiblePpwwMessage(false);
        } else {
            //비밀번호가 같지 않으면 fail 표시
            console.log("password fail...")
        }
    }, [userPassword, userPasswordConfirm]);

    function signupClicked() {
        console.log('signupClicked')
        console.log(userEmail)
        if (visibleIdMessage === false || visibleNicknameMessage === false || visiblePwMessage === false || visiblePpwwMessage === false)
            alert('입력한 내용을 다시 확인해주세요');
        Authentication
            .signup(userEmail, userNickname, userPassword)
            .then((response) => {
                console.log(response)
                alert('회원가입이 완료되었습니다.')
                document.location.href = "/login";
            }).catch(() => {
                alert('Signup Failed')
            });
    }
    //이메일 인증 카운트 다운
    //참고 : https://handhand.tistory.com/32
    const [min, setMin] = useState(3);
    const [sec, setSec] = useState(0);
    const time = useRef(180);
    const timerId = useRef(null);
    useEffect(() => {
        if (visibleIdMessage) {
            timerId.current = setInterval(() => {
                setMin(parseInt(time.current / 60));
                setSec(time.current % 60);
                time.current -= 1;
            }, 1000);
            return () => clearInterval(timerId.current);
        } else {
            clearInterval(timerId.current)
        }
    }, [visibleIdMessage]);
    useEffect(() => {
        if (time.current <= 0) {
            clearInterval(timerId.current);
        }
    }, [sec]);

    return (
        <div className="login-page">
            <Header />
            <div className="login-content">
                <div className="login-content-body">
                    <div className="login-content-body-title">
                        <h1 id='login-content-body-title'>회원가입</h1>
                    </div>
                    <div className="login-content-body-main">
                        <form >
                            <div className="login-content-body-main-info">
                                <div className="login-content-body-main-info-id">

                                    <InputGroup>
                                        <Form.Control
                                            placeholder="Recipient's username"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                        />
                                        <Button variant="outline-secondary" id="button-addon2" onClick={() => {
                                            setVisibleIdMessage(true);
                                        }}>
                                            인증
                                        </Button>
                                    </InputGroup>
                                    {visibleIdMessage && <p className="signup-help-enter-id">{min}분 {sec}초</p>}
                                </div>
                                <div className="login-content-body-main-info-nickname">
                                    <input id="userNickname" name="userNickname" placeholder="닉네임" onChange={onChangeNickname} />
                                    {visibleNicknameMessage && <p className="signup-help-enter-nickname">존재하는 닉네임입니다</p>}
                                </div>
                                <div className="login-content-body-main-info-pw">
                                    <input id="userPassword" name="userPassword" placeholder="비밀번호" type="password" autoComplete="on" onChange={onChangePassword} />
                                    {visiblePwMessage && <p className="signup-help-enter-pw">영소문자와 숫자를 섞은 8자리 이상의 비밀번호를 입력해주세요</p>}
                                </div>
                                <div className="login-content-body-main-info-pw">
                                    <input id="userPasswordConfirm" name="userPasswordConfirm" placeholder="비밀번호 확인" type="password" autoComplete="on" onChange={onChangePasswordConfirm} />
                                    {visiblePpwwMessage && <p className="signup-help-enter-ppww">일치하지 않는 비밀번호입니다</p>}
                                </div>
                            </div>
                        </form>

                        <div className="login-content-body-main-btn">
                            <div className="login-content-body-main-btn-login">
                                <button id="login" onClick={signupClicked}>회원가입</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Signup;