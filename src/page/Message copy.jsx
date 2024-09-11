import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Client } from '@stomp/stompjs';

axios.interceptors.request.use(
  (config) => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwbGF5X2Jhc2ViYWxsIiwic3ViIjoiYWRtaW5AZW1haWwuY29tIiwiYXV0aG9yaXRpZXMiOiJBRE1JTixWRVJJRklFRF9VU0VSIiwiaWF0IjoxNzI1OTQxODEwLCJleHAiOjE3MjYwMjgyMTAsImp0aSI6ImYxYzkzNWMyLWRiNTktNGJlYS1hM2EyLTM3OGUwZmFlYTIyYyJ9.fjQZ1G0NMgFZt7J0IAS1EO3JUgQi7zMb6PGnjvEXwxk';
    config.headers.Authorization = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function Message() {
  const [messageRooms, setMessageRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState('');
  const [newMessage, setNewMessage] = useState([]);
  const [newRoom, setNewRoom] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  const fetchMessageRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/messages/member');
      setMessageRooms(response.data.data);
    } catch (error) {
      console.error('메시지 방 목록 조회 실패:', error);
    }
  };

  const createMessageRoom = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/messages/room');
      setNewRoom(response.data.data);
    } catch (error) {
      console.error('메시지 방 생성 실패:', error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:8080/api/messages/send', null, {
        params: {
          messageRoomId: roomId,
          messageContent: message,
        },
      });
      alert('메시지 전송 성공');
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    }
  };

  const fetchMessagesInRoom = async (roomId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/messages/rooms/member/${roomId}`);
      setNewMessage(response.data.data);
    } catch (error) {
      console.error('메시지 조회 실패:', error);
    }
  };

  const deleteMessageRoom = async (roomId) => {
    try {
      await axios.delete(`http://localhost:8080/api/messages/room/${roomId}`);
      alert('메시지 방 삭제 성공');
      fetchMessageRooms();
    } catch (error) {
      console.error('메시지 방 삭제 실패:', error);
    }
  };

  const connectWebSocket = () => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/stomp/content',
      reconnectDelay: 3600000, // 1시간 (3600000ms)
      heartbeatIncoming: 60000, // 60초
      heartbeatOutgoing: 60000,
      // connectHeaders: {
      //   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwbGF5X2Jhc2ViYWxsIiwic3ViIjoiYWRtaW5AZW1haWwuY29tIiwiYXV0aG9yaXRpZXMiOiJBRE1JTixWRVJJRklFRF9VU0VSIiwiaWF0IjoxNzI1OTQxODEwLCJleHAiOjE3MjYwMjgyMTAsImp0aSI6ImYxYzkzNWMyLWRiNTktNGJlYS1hM2EyLTM3OGUwZmFlYTIyYyJ9.fjQZ1G0NMgFZt7J0IAS1EO3JUgQi7zMb6PGnjvEXwxk',
      // },
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        if (roomId) {
          client.subscribe(`/sub/room/25`, (messageOutput) => {
            showMessage(JSON.parse(messageOutput.body));
          });
        } else {
          console.warn('No roomId specified for subscription.');
        }
      },
      onStompError: (frame) => {
        console.error('STOMP Error: ', frame);
      },
    });
    client.activate();
    setStompClient(client);
  };

  const sendWebSocketMessage = () => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/pub/chat/25`,
        body: JSON.stringify({ roomId: 25, messageContent: message }),
      });
    }
  };

  const showMessage = (messageOutput) => {
    console.log('Received: ', messageOutput);
    setNewMessage((prevMessages) => [...prevMessages, messageOutput]);
  };

  useEffect(() => {
    fetchMessageRooms();
    connectWebSocket();
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [roomId]);

  return (
    <div>
      <h2>Message API 테스트</h2>

      {/* 메시지 방 목록 */}
      <h3>메시지 방 목록</h3>
      <ul>
        {messageRooms.map((room) => (
          <li key={room.id}>
            {room.name} <button onClick={() => fetchMessagesInRoom(room.id)}>메시지 보기</button>
            <button onClick={() => deleteMessageRoom(room.id)}>메시지 방 삭제</button>
          </li>
        ))}
      </ul>

      {/* 새로운 메시지 방 생성 */}
      <h3>새로운 메시지 방 생성</h3>
      <button onClick={createMessageRoom}>메시지 방 생성</button>
      {newRoom && <div>새로 생성된 메시지 방 ID: {newRoom.id}</div>}

      {/* 메시지 전송 */}
      <h3>메시지 전송</h3>
      <input
        type="text"
        placeholder="메시지 방 ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="메시지 내용"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>메시지 전송 (API)</button>
      <button onClick={sendWebSocketMessage}>메시지 전송 (WebSocket)</button>

      {/* 메시지 조회 */}
      <h3>메시지 방에서 받은 메시지</h3>
      <div>
        {newMessage.map((msg, index) => (
          <div key={index}>{JSON.stringify(msg)}</div>
        ))}
      </div>
    </div>
  );
}
