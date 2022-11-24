import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import InquiryPage from "../../pages/InquiryPage";
import ProfilePage from "../../pages/ProfilePage";
import RoomListPage from '../../pages/RoomListPage';
import RoomChatPage from '../../pages/RoomChatPage';
import SerchRoomsPage from '../../pages/SearchRoomsPage';
import RoomQuizPage from '../../pages/RoomQuizPage';
import CreateRoomPage from '../../pages/CreateRoomPage';
import ScorePage from '../../pages/ScorePage';
import ChatRoomPage from '../../pages/ChatRoomPage';

function AuthenticatedApp() {
    return (
        // ログイン認証後はルーティング 多分ここからルーティングするって構造にすると、ログイン前にアクセスとかなくなる
        // twitter-clone-udemyはだいぶ構造変えるかな
        <BrowserRouter>
            <Routes>
                {/* パス指定と指定先のコンポーネント */}
                {/* Landing → ルーム一覧  ログイン後のパスが/だから直接Landingに遷移*/}
                {/* chatRoom */}
                <Route path="/" element={<HomePage />} />
                <Route path="/room/:id" element={<RoomChatPage />} />
                {/* <Route path="/tags" element={<Tag />} /> */}
                <Route path="/inquiry" element={<InquiryPage />} />
                <Route path="/mypage" element={<ProfilePage />} />
                <Route path="/rooms" element={<RoomListPage />} />

                {/* ここに追加の画面のパスを記述していく */}
                {/* ルーム検索 */}
                <Route path="/search-rooms" element={<SerchRoomsPage />} />
                {/* ルームクイズ */}
                <Route path="/search-rooms/:id/quiz" element={<RoomQuizPage />} />
                {/* ルーム作成 */}
                <Route path='/create-room' element={<CreateRoomPage />} />
                
                {/* 採点後画面 */}
                <Route path='/search-rooms/:id/quiz/score' element={<ScorePage />} />
                {/* チャットルーム画面 */}
                <Route path='/room/:id/chat-room' element={ <ChatRoomPage/>} />

            </Routes>
        </BrowserRouter>
    );
}

export { AuthenticatedApp };
