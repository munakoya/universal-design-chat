/*
自分が保持するルームを一覧として出力する
*/

import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc} from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import db from '../../firebase';
import './myRoomList.css';

function MyRoomList() {
    const { user } = useAuth();
    const [selectUser, setSelectUser] = useState([]);

    useEffect(() => {
      getUser();
    }, []);
    
// ログイン中のユーザーデータを取得する
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
    <div className='myRoomList'>
        <h2 className='myRoomList_header'>マイルーム一覧</h2>
        <ul className="chat-room-list">
                {selectUser?.myRoomList?.map((myRoom) => {
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
    );
}

export { MyRoomList };
