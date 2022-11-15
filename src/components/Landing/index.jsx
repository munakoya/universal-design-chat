import { Link } from 'react-router-dom';
import { chatRooms } from '../../data/chatRooms';
import './styles.css';

function Landing() {
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
            </ul>

            </div>
        </>
    );
}

export { Landing };
