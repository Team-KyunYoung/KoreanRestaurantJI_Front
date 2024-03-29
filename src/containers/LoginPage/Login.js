import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import styles from "./Login.module.scss";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import * as UserService from "lib/api/UserService";
import Authentication from "lib/api/Authentication";

const usePrevLocation = (location) => {
  const prevLocRef = useRef(location);
  useEffect(() => {
    prevLocRef.current = location;
  }, [location]);
  if (prevLocRef.current.state !== null) {
    return prevLocRef.current.state.preLocation.pathname;
  } else {
    return "";
  }
};
const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let prevLocation = usePrevLocation(location);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [hasLoginFailed, setHasLoginFailed] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const EmailHandleChange = (e) => setUserEmail(e.target.value);
  const passwordHandleChange = (e) => setUserPassword(e.target.value);

  function toBack() {
    if (prevLocation === "/signup") {
      navigate("/");
    } else {
      navigate(-1, { replace: true });
    }
  }

  const loginClicked = () => {
    UserService.login(userEmail, userPassword)
      .then((res) => res.json())
      .then((json) => {
        if (json.httpStatus === "OK") {
          Authentication.loginTokenSave(json.data.token);
          setShowSuccessMessage(true);
          setHasLoginFailed(false);
          toBack();
        } else {
          setShowSuccessMessage(false);
          setHasLoginFailed(true);
          alert("Login Failed");
        }
      })
      .catch(() => {
        setShowSuccessMessage(false);
        setHasLoginFailed(true);
        alert("Login Failed");
      });
  };
  return (
    <div className={styles.loginPage}>
      <Header />
      <main>
        <div className={styles.loginContentWrapper}></div>
        <div className={styles.content}>
          <header className={styles.title}>
            <h1 id="title">로그인</h1>
          </header>
          <section className={styles.main}>
            <form>
              <div className={styles.inputArea}>
                {hasLoginFailed && (
                  <div className="alert alert-warning">Invalid Credentials</div>
                )}
                {showSuccessMessage && <div>Login Sucessful</div>}
                <div className={styles.inputId}>
                  <input
                    id="userEmail"
                    name="userEmail"
                    placeholder="이메일을 입력하세요"
                    type="email"
                    onChange={EmailHandleChange}
                  />
                </div>
                <div className={styles.inputPw}>
                  <input
                    id="userPassword"
                    name="userPassword"
                    placeholder="비밀번호"
                    type="password"
                    autoComplete="on"
                    onChange={passwordHandleChange}
                  />
                </div>
              </div>
            </form>

            <div className={styles.loginBtn}>
              <div>
                <button id="login" onClick={loginClicked}>
                  로그인
                </button>
              </div>
            </div>
            <div className={styles.userAccess}>
              <div className={styles.signupBtn}>
                <Link to="/signup">회원가입</Link>
              </div>
              <div className={styles.signupBtn}>
                <Link to="/findPassword">비밀번호 찾기</Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
