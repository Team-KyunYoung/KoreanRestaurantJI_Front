import React from "react";
import './Style.scss';

import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { Link } from "react-router-dom";

// Set some properties of the bot
const config = {
  botAvatar: "img.png",
  floating: true,
  headerTitle: "&ensp;智 문의하기",
  recognitionEnable: true
};
 
// Creating our own theme
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#424566',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#424566',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps = [
  {
      id: '0',
      message: '안녕하세요, 智의 chat bot입니다.',

      // This calls the next id
      // i.e. id 1 in this case
      trigger: '1',
  }, {
      id: '1',

      // This message appears in
      // the bot chat bubble
      message: '궁금하신 내용이 아래 사항에 있다면, 선택해주세요.',
      trigger: '2'
  }, {
      id: '2',
      options: [
          // When we need to show a number of
          // options to choose we create alist
          // like this
          { value: 1, label: '코스/메뉴 확인하기', trigger: 'Dish' },
          { value: 2, label: '방문 포장 주문하기', trigger: 'Order' },
          { value: 3, label: '식당 좌석 예약하기', trigger: 'Reservation' },
          { value: 4, label: '식당 위치 확인하기', trigger: 'Map' },
          { value: 5, label: '예약/주문 내역 확인하기', trigger: 'UserInfo' },
          { value: 6, label: '문의하기', trigger: 'QNA' },
          { value: 7, label: '기타', trigger: 'etc' },
        ]
  }, {
    id: 'Dish',
    message: " 코스와 일반 메뉴 중 보고싶으신 것을 선택해주세요.",
    trigger: 'Dish-select'
}, {
    id: 'Dish-select',
    options: [
        { value: 1, label: '코스 요리 확인', trigger: 'Dish-Course-link' },
        { value: 2, label: '일반 메뉴 확인', trigger: 'Dish-link' },
      ]
}, {
    id: 'Dish-Course-link',
    component: (
      <div><Link to="/Course">코스 페이지로 이동하기</Link></div>
    ),
    end: true
}, {
    id: 'Dish-link',
    component: (
      <div><Link to="/Dish">일반 메뉴 페이지로 이동하기</Link></div>
    ),
    end: true
}, {
      id: 'Order',
      message: " 아래 버튼을 클릭하면 주문 페이지로 이동합니다. 이곳에서 주문을 완료해주세요.",
      trigger: 'Order-link'
  }, {
      id: 'Order-link',
      component: (
        <div><Link to="/Order">주문 페이지로 이동하기</Link></div>
      ),
      end: true
  }, {
      id: 'Reservation',
      message: " 아래 페이지에서 예약을 진행하실 수 있습니다.",
      trigger: 'Reservation2'
  }, {
      id: 'Reservation2',
      message: " 룸을 선택해 주시고, 필요한 정보를 입력 후 원하는 시간대를 선택하여 예약하시면 됩니다.",
      trigger: 'Reservation-link'
  }, {
      id: 'Reservation-link',
      component: (
        <div><Link to="/SelectRoom">예약 페이지로 이동하기</Link></div>
      ),
      end: true
  }, {
      id: 'Map',
      message: " 아래 링크에서 식당의 정확한 위치정보를 네이버 지도로 확인하실 수 있습니다.",
      trigger: 'Map-link'
  }, {
      id: 'Map-link',
      component: (
        <div><Link to="/Map">지도 페이지로 이동하기</Link></div>
      ),
      end: true
  }, {
      id: 'UserInfo',
      message: " 어떤 것을 확인하시고 싶으신가요?",
      trigger: 'UserInfo-select'
  }, {
      id: 'UserInfo-select',
      options: [
          { value: 1, label: '방문 포장 주문 확인', trigger: 'UserInfo-Order-link' },
          { value: 2, label: '식당 좌석 예약 확인', trigger: 'UserInfo-Reservation-link' },
        ]
  }, {
      id: 'UserInfo-Order-link',
      component: (
        <div><Link to="/UserInfo/ordered">주문 확인 페이지로 이동하기</Link></div>
      ),
      end: true
  }, {
      id: 'UserInfo-Reservation-link',
      component: (
        <div><Link to="/UserInfo/reservation">예약 확인 페이지로 이동하기</Link></div>
      ),
      end: true
  }, {
      id: 'QNA',
      message: " 문의 목록을 확인하고 싶으신가요? 아니면 문의를 하고 싶으신가요?",
      trigger: 'QNA-link'
  }, {
      id: 'QNA',
      options: [
          { value: 1, label: '문의 목록 확인', trigger: 'QNA-Board' },
          { value: 2, label: '문의 하기', trigger: 'QNA-Post' },
      ]
  }, {
      id: 'QNA-Board',
      message: " 아래 버튼을 눌러 문의 목록을 확인하실 수 있습니다.",
      trigger: 'QNA-Board-link'
  }, {
      id: 'QNA-Board-link',
      component: (
        <div><Link to="/QnA">문의 페이지로 이동하기</Link></div>
      ),
      end: true
  }, {
      id: 'QNA-Post',
      message: " 아래 버튼을 눌러 문의를 작성하실 수 있습니다.",
      trigger: 'QNA-Post-link'
  }, {
      id: 'QNA-Post-link',
      component: (
        <div><Link to="/QnA">문의 작성 페이지로 이동하기</Link></div>
      ),
      end: true
  }, {
      id: 'etc',
      message: " 그 밖의 문의 사항은 FAQ를 확인해 주시고, 관련 문의 사항이 없다면 QNA 페이지에 문의 남겨주세요.",
      trigger: 'etc-Select'
  }, {
      id: 'etc-Select',
      options: [
          { value: 1, label: 'FAQ 확인하기', trigger: 'FAQ-Board' },
          { value: 2, label: 'QNA 문의 작성하기', trigger: 'QNA-Post-link' },
      ]
  }, {
      id: 'FAQ-Board',
      component: (
        <div><Link to="/FAQ">FAQ 페이지로 이동하기</Link></div>
      ),
      end: true
  }
];

const Chat = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        floating={true}
        headerTitle="&ensp;智 문의하기"
        placeholder=' 채팅이 불가능한 채널입니다.'
        steps={steps}
      />
    </ThemeProvider>
  );
};

export default Chat;