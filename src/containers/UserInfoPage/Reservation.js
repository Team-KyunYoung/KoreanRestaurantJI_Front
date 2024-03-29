import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./UserInfo.module.scss";
import Page from "components/Pagination/Pagination";
import ReservationService from "lib/api/ReservationService";
import UserService from "lib/api/UserService";
import ModalWindow from "components/Modal/ModalForModify";

const image1 = "https://picsum.photos/800/600";

function ReservationInnerPage(props) {
  const onClickUpdateReservation = (e) => {
    props.setShow(true);
    console.log(e.target.value);
    props.setData(JSON.parse(e.target.value));
  };

  const onClickDeleteReservation = (e) => {
    console.log(e.target.value);
    let roomNumber = parseInt(e.target.value);
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      ReservationService.deleteReservation(roomNumber).then((response) => {
        alert("삭제되었습니다.");
        document.location.href = "/UserInfo/reservation/now";
      });
    } else {
      alert("취소되었습니다.");
    }
  };
  return (
    <ul className={styles.list}>
      {props.loading ? (
        "loading"
      ) : props.list.length === 0 ? (
        <div className={styles.noList}>
          <p>예약 내역 없음</p>
          <Link to={"/SelectRoom"}>홀 예약하러 가기</Link>
        </div>
      ) : (
        props.list.map((obj, i) => (
          <div key={i}>
            <li
              className={
                props.date.toString() === obj.reservationDate.toString() //오늘 날짜에 스타일 부여(일단은 배경색)
                  ? styles.today
                  : styles.notToday
              }
            >
              <img src={image1} alt="reservation list" />
              <div className={styles.listSpan}>
                <p>
                  {props.date.toString() === obj.reservationDate.toString() ? (
                    <span>
                      <strong>Today!</strong>
                    </span>
                  ) : (
                    <b>예약 일시</b>
                  )}{" "}
                  {obj.reservationDate} {obj.reservationTime}{" "}
                </p>
                <p>
                  <b>예약 정보</b> {obj.reservationRoomName}홀{" "}
                  {obj.reservationHeadCount}
                </p>
                <p>
                  <b>예약자</b> {obj.reservationName}님{" "}
                  {obj.reservationPhoneNumber}
                </p>
                <p>
                  <b>요청사항 </b> {obj.reservationRequest}
                </p>
              </div>
            </li>
            {props.showBtn ? (
              <div className={styles.changeReservation}>
                <button
                  onClick={onClickUpdateReservation}
                  value={JSON.stringify(obj)}
                >
                  예약 수정
                </button>
                <button
                  onClick={onClickDeleteReservation}
                  value={obj.reservationNumber}
                >
                  예약 삭제
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        ))
      )}
    </ul>
  );
}
const Reservation = (props) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState();

  const param = useParams();
  //오늘 날짜 구하기
  const year = new Date().getFullYear();
  const originMonth = new Date().getMonth() + 1;
  const month = ("00" + originMonth.toString()).slice(-2); //십의 자리로 표시
  const originDate = new Date().getDate();
  const date = ("00" + originDate.toString()).slice(-2);
  const today = [year, month, date].join("-");

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [postsPerPage, setPostsPerPage] = useState(1);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  useEffect(() => {
    UserService.findUser(); //유저를 찾는 과정이 있어야 아래 findReservation 통신 가능
    if (param.mode === "past") {
      ReservationService.findBeforeReservation()
        .then((response) => {
          setList(response.data.data);
        })
        .catch(() => {
          setLoading(true);
          console.log("error:예약 목록 불러오기");
        });
    } else if (param.mode === "now") {
      ReservationService.findAfterReservation()
        .then((response) => {
          setList(response.data.data);
        })
        .catch(() => {
          setLoading(true);
          console.log("error:예약 목록 불러오기");
        });
    }
  }, [param.mode]);

  const [show, setShow] = useState(false);
  const handleClose = (e) => {
    if (e.target.type === "submit") {
      ReservationService.updateReservation(
        data.reservationDate,
        data.reservationName, //성명
        data.reservationPhoneNumber, //예약자 연락처,
        data.reservationRequest,
        data.reservationRoomName,
        data.reservationHeadCount,
        data.reservationTime,
        data.reservationNumber
      );
      setShow(false);
      window.location.reload();
    } else setShow(false);
  };
  return (
    <>
      <h2>Room I Booked</h2>
      <div className={styles.reservation}>
        <div>
          <ReservationInnerPage
            list={currentPosts(list)}
            loading={loading}
            date={today}
            showBtn={param.mode === "now"}
            setShow={setShow}
            handleClose={handleClose}
            data={data}
            setData={setData}
          />
          <Page
            postsPerPage={postsPerPage}
            totalPosts={list.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            className={styles.pagination}
          ></Page>
        </div>
        <div className={styles.goList}>
          {param.mode === "now" ? (
            <Link to="/UserInfo/reservation/past" className={styles.goPast}>
              <span>지난 예약</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fillRule="currentColor"
                className="bi bi-chevron-compact-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
                />
              </svg>
            </Link>
          ) : (
            <Link to="/UserInfo/reservation/now" className={styles.goNow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fillRule="currentColor"
                className="bi bi-chevron-compact-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"
                />
              </svg>
              <span>현재 예약</span>
            </Link>
          )}{" "}
          {show ? (
            <ModalWindow
              show={show}
              handleClose={handleClose}
              data={data}
              setData={setData}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Reservation;
