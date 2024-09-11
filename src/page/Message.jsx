import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';

axios.interceptors.request.use(
  (config) => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwbGF5X2Jhc2ViYWxsIiwic3ViIjoiYWRtaW5AZW1haWwuY29tIiwiYXV0aG9yaXRpZXMiOiJBRE1JTixWRVJJRklFRF9VU0VSIiwiaWF0IjoxNzI1OTkwODE2LCJleHAiOjE3MjYwNzcyMTYsImp0aSI6IjBkYzc5OTMzLTI5NTUtNDI4ZS1hNDVmLWU2ZDYyZDNjY2IwMCJ9.TtAwS44_k10khwUneYNx0t-AcIuKfQqEyDhbnw7GvM4';
    config.headers.Authorization = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function Message() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const client = useRef(null);
  const roomId = 25;
  const profileId = 1;
  const URL = 'http://localhost:8080/stomp/content';

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const connect = () => {
    console.log('Attempting to connect to WebSocket...');
    setConnectionStatus('connecting');

    console.log("5465656")
    client.current = new StompJs.Client({
      webSocketFactory: () => {
        console.log("5555")
        return new SockJS(URL); 
      },
      connectHeaders: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwbGF5X2Jhc2ViYWxsIiwic3ViIjoiYWRtaW5AZW1haWwuY29tIiwiYXV0aG9yaXRpZXMiOiJBRE1JTixWRVJJRklFRF9VU0VSIiwiaWF0IjoxNzI1OTkwODE2LCJleHAiOjE3MjYwNzcyMTYsImp0aSI6IjBkYzc5OTMzLTI5NTUtNDI4ZS1hNDVmLWU2ZDYyZDNjY2IwMCJ9.TtAwS44_k10khwUneYNx0t-AcIuKfQqEyDhbnw7GvM4',
      },
      debug: (str) => {
        console.log('STOMP: ' + str);
      },
      reconnectDelay: 30000000, 
    heartbeatIncoming: 2000, 
    heartbeatOutgoing: 2000, 
    
      onConnect: () => {
        console.log('웹소켓 연결 성공!');
        setConnectionStatus('connected');
        subscribe();
      },
      onStompError: (frame) => {
        console.error('STOMP 오류 발생!');
  
        // frame 객체의 내용 출력
        console.error('Command:', frame.command);
        console.error('Headers:', frame.headers);
        console.error('Body:', frame.body);
        
        setConnectionStatus('error');
      },
      onWebSocketClose: () => {
        console.log('웹소켓 연결이 닫혔습니다.');
        setConnectionStatus('disconnected');
      },
      onWebSocketError: (event) => {
        console.error('WebSocket 오류:', event);
        setConnectionStatus('error');
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    if (client.current && client.current.connected) {
      console.log('웹소켓 연결 해제 중...');
      client.current.deactivate();
    }
  };

  const subscribe = () => {
    client.current.subscribe(`/sub/room/${roomId}`, (res) => {
      console.log('메시지 수신:', res.body);
      setMessages((prevMessages) => [
        ...prevMessages,
        JSON.parse(res.body),
      ]);
    });
    console.log(`채팅방 ${roomId}에 구독 완료`);
  };

  const publish = (type = '') => {
    if (!client.current || !client.current.connected) {
      console.log('웹소켓이 연결되어 있지 않습니다. 메시지를 보낼 수 없습니다.');
      return;
    }

    let sendText = '';
    switch (type) {
      case '':
        sendText = text;
        break;
      case 'matchingConfirm':
        sendText = 'MAT_CHING_CON_FIRM';
        break;
      case 'matchingCancel':
        sendText = 'MAT_CHING_CAN_CEL';
        break;
    }

    client.current.publish({
      destination: `/pub/chats/${roomId}`,
      body: JSON.stringify({
        senderId: profileId,
        receiverId: 0,
        messageContent: sendText,
        messageRoomId: roomId,
      }),
    });
    console.log('메시지 전송:', sendText);
    setText('');
  };

  return (
    <div>
      <div>Connection Status: {connectionStatus}</div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.messageContent}</div>
        ))}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => publish()}>Send</button>
      <button onClick={connect}>Reconnect</button>
    </div>
  );
}
