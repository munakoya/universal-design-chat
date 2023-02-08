/*
自分が保持するルームを一覧として出力する
*/

import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc} from 'firebase/firestore';
import db from '../../firebase';
import './myRoomList.css';

// propsで渡す
function MyRoomList() {
    // セッション管理してリロード時のstateリセットによるログインページに遷移しないように
  const auth_user = JSON.parse(sessionStorage.getItem("AUTH_USER"));
const [selectUser, setSelectUser] = useState([]);

    useEffect(() => {
      getUser(); // ログインユーザーの取得
    }, []);
    
// ログイン中のユーザーデータを取得する
async function getUser() {
    const selectUser = doc(db, "user", `${auth_user.uid}`);
    const selectUserSnap = await getDoc(selectUser);
    if (selectUserSnap.exists()) {
        setSelectUser(selectUserSnap.data())
    } else {
            console.log("ユーザー情報の取得に失敗しました。")
        }
}
    
return (
    <div className='myRoomList'>
        <h2 className='myRoomList_header'>マイルーム一覧</h2>
        <ul className="chat-room-list">
                {selectUser?.myRoomList?.map((myRoom) => {
                    return (
                        <div>
                            <Link to={`/room/${myRoom}/chat-room`}>
                                <li key={myRoom}>
                                    {myRoom}
                                </li>
                            </Link>
                        </div>
                    );
                })}
        </ul>
    </div>
    );
}

export { MyRoomList };
