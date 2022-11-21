import { Link } from 'react-router-dom';
import { chatRooms } from '../../data/chatRooms';
import './styles.css';
import { useState,useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import db from '../../firebase';

function Landing() {
    const [rooms, setRooms] = useState([]);
    const [docId, setDocId] = useState("");
    
     // マウント時に一回だけ読み込み → room-listの中身全部持ってこれる
  useEffect(() => {
    const allroomsData = collection(db, "all-room-list");
    const q = query(allroomsData);
    onSnapshot(q, (querySnapshots) => {
      setRooms(querySnapshots.docs.map((doc) => doc.data()));
    });
    // ドキュメントidを取得するため
    const roomsData = collection(db, "room-list");
    const qq = query(roomsData);
    onSnapshot(qq, (querySnapshots) => {
      setDocId(querySnapshots.docs.map((doc) => doc.data()));
    });
  }, []);
    return (
        <>
            <div className='landing'>
            <h2>Choose a Chat Room</h2>
            <ul className="chat-room-list">
                {/* chatRoomsからroomをすべて取り出してリスト表示 */}
                {chatRooms.map((room) => (
                    <li key={room.id}>
                        {/* room.title表示でクリック → Link room/room.idでそれぞれのルームに飛べる */}
                        <Link to={`/room/${room.id}`}>{room.title}</Link>
                    </li>
                ))}
                    
                    {/* firestoreに登録されたroomを取得したい */}
                    {rooms.map((room) => (
                        <li key={room.roomId}>
                            <Link to={`/room/${room.title}/chat-room`}>{ room.title}</Link>
                            
                        </li>
                    ))}
            </ul>

            </div>
        </>
    );
}

export { Landing };
