// ログイン後のルーティングファイル
// ページを追加する際に必ず触る
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import InquiryPage from "../../pages/InquiryPage";
import ProfilePage from "../../pages/ProfilePage";
import RoomListPage from '../../pages/RoomListPage';
import SerchRoomsPage from '../../pages/SearchRoomsPage';
import RoomQuizPage from '../../pages/RoomQuizPage';
import CreateRoomPage from '../../pages/CreateRoomPage';
import ScorePage from '../../pages/ScorePage';
import ChatRoomPage from '../../pages/ChatRoomPage';

function AuthenticatedApp() {
    return (
        // 追加のページを作成する場合は、ここにルーティングを設定する
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/inquiry" element={<InquiryPage />} />
                <Route path="/mypage" element={<ProfilePage />} />
                <Route path="/rooms" element={<RoomListPage />} />

                <Route path="/search-rooms" element={<SerchRoomsPage />} />
                <Route path="/search-rooms/:id/quiz" element={<RoomQuizPage />} />
                <Route path='/create-room' element={<CreateRoomPage />} />
                <Route path='/search-rooms/:id/quiz/score' element={<ScorePage/>} />
                <Route path='/room/:id/chat-room' element={ <ChatRoomPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export { AuthenticatedApp };
