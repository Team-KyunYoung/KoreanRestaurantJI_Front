import React from "react";
import { useParams, Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import styles from "./UserInfo.module.scss";
import Header from "components/header/Header";
import Chat from "components/ChatBot/Chat";
import Footer from "components/footer/Footer";
import EditProfile from "./EditProfile";
import Reservation from "./Reservation";
import Ordered from "./Ordered";

const image1 = "https://picsum.photos/800/600";
const UserInfo = () => {
  const param = useParams();
  const remoteController = (
    <ul>
      <li>
        <Link to="/UserInfo/editprofile/blank">정보 수정</Link>
      </li>
      <li>
        <Link to="/UserInfo/reservation/now">예약목록 보기</Link>
      </li>
      <li>
        <Link to="/UserInfo/ordered/blank">주문내역 보기</Link>
      </li>
    </ul>
  );
  return (
    <div className="UserInfo Page">
      <Header />
      <main>
        <div>
          <header className={styles.title}></header>
          <section className={styles.main}>
            <div className={styles.banner}>
              <img src={image1} alt="user's information page" />
              <h1>My page</h1>
            </div>
            <div className={styles.contents}>
              <MediaQuery minWidth={993}>
                <div className={[styles.fixedBox, styles.rightside].join(" ")}>
                  {remoteController}
                </div>
              </MediaQuery>
              <MediaQuery maxWidth={992}>
                <div className={[styles.fixedBox, styles.upside].join(" ")}>
                  {remoteController}
                </div>
              </MediaQuery>
              {param.location === "editprofile" ? <EditProfile /> : ""}
              {param.location === "reservation" ? (
                <Reservation mode={param.mode ? "past" : "now"} />
              ) : (
                ""
              )}
              {param.location === "ordered" ? <Ordered /> : ""}
            </div>
          </section>
        </div>
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default UserInfo;
