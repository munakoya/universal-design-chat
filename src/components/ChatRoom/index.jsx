import { Link, useParams } from 'react-router-dom';
import { chatRooms } from '../../data/chatRooms';
import { MessageInput } from '../MessageInput';
import { MessageList } from '../MessageList';
import './styles.css';

function ChatRoom() {
    // ルームの選択 → room/room.idが指定でidごとのルームにルーティング
    // useParamsでurl内のidを取得
    const params = useParams();
    // chatRoomsのデータを取得
    const room = chatRooms.find((x) => x.id === params.id);
    if (!room) {
        // TODO: 404
    }

    return (
        <>  
            {/* roomのタイトル → data/chatRooms指定*/}
            <div className='chatRoom'>
            <h2 className='chatRoom_header'>{room.title}</h2>
                <Link to="/">⬅️ Back to all rooms</Link>
            
            <div className="messages-container">
                <MessageList roomId={room.id} />
                    <MessageInput roomId={room.id} />
                    {/* {console.log(room.id)} */}

                </div>                      
                </div>
        </>
    );
}

export { ChatRoom };
