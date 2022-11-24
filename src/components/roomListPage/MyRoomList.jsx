import { Link } from 'react-router-dom';
import { chatRooms } from '../../data/chatRooms';
import './styles.css';
import { useState,useEffect } from 'react';
import { collection, query, onSnapshot ,doc, getDoc} from 'firebase/firestore';
import db from '../../firebase';
import { useAuth } from '../../hooks/useAuth';

function MyRoomList() {
    const [rooms, setRooms] = useState([]);
    const [docId, setDocId] = useState([]);
    const [myRooms, setMyRooms] = useState([])
    const { user } = useAuth();
    const [selectUser, setSelectUser] = useState([]);
     // マウント時に一回だけ読み込み → room-listの中身全部持ってこれる
  useEffect(() => {
    const allroomsData = collection(db, "all-room-list");
    const q = query(allroomsData);
    onSnapshot(q, (querySnapshots) => {
      setRooms(querySnapshots.docs.map((doc) => doc.data()));
    });
    // ドキュメントidを取得するため
    // const roomsData = collection(db, "room-list"); ここで特定のユーザー取得したい
    // const roomsData = collection(db, "user");
    // const qq = query(roomsData);
    //   onSnapshot(qq, (querySnapshots) => {
    //     setDocId(querySnapshots.docs.map((doc) => doc.data()));
    // });
      getUser();
}, []);
async function getUser() {
    const selectUser = doc(db, "user", `${user.uid}`);
    const selectUserSnap = await getDoc(selectUser);
    if (selectUserSnap.exists()) {
        setSelectUser(selectUserSnap.data())
    } else {
            console.log("(泣)")
        }
    }
    return (
        <>
            <div className='landing'>
            <h2>Choose a Chat Room</h2>
            <ul className="chat-room-list">
                {/* chatRoomsからroomをすべて取り出してリスト表示 */}
                {/* {chatRooms.map((room) => (
                    <li key={room.id}> */}
                        {/* room.title表示でクリック → Link room/room.idでそれぞれのルームに飛べる */}
                        {/* <Link to={`/room/${room.id}`}>{room.title}</Link>
                    </li>
                ))} */}
                    {/* ↓これは一番最初に取得したuserのmyRoomList表示 */}
                    {/* {docId.map((userInfo) => (
                        console.log(`user.uid : ${user.uid} || docId : ${userInfo.uid}`),
                        (user.uid === userInfo.uid ?userInfo.myRoomList.map((myRoom, index) => {
                            // returnで返したら出力されました
                            return (
                                <div>
                                {console.log(userInfo)}
                                    <li key={myRoom}><Link to={`/room/${myRoom}/chat-room`}>{myRoom}</Link></li>
                                { console.log(userInfo.myRoomList) }
                                </div>
                            )
                            
                        }) : console.log("失敗"))
                    ))} */}
                    
                    {selectUser?.myRoomList?.map((myRoom, index) => {
                        return (
                            <div>
                                <li key={myRoom}>
                                    <Link to={`/room/${myRoom}/chat-room`}>{myRoom}</Link>
                                </li>
                            </div>
                        );
                    })}
            </ul>

            </div>
        </>
    );
}

export { MyRoomList };
