import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Inquiry from "../../pages/Inquiry";
import Mypage from "../../pages/Mypage";
import Room from '../../pages/Room';
import RoomChat from '../../pages/RoomChat';
import SerchRooms from '../../pages/SearchRooms';
import RoomQuiz from '../../pages/RoomQuiz';
import CreateRoom from '../../pages/CreateRoom';
import ScorePage from '../../pages/ScorePage';

function AuthenticatedApp() {
    return (
        // ログイン認証後はルーティング 多分ここからルーティングするって構造にすると、ログイン前にアクセスとかなくなる
        // twitter-clone-udemyはだいぶ構造変えるかな
        <BrowserRouter>
            <Routes>
                {/* パス指定と指定先のコンポーネント */}
                {/* Landing → ルーム一覧  ログイン後のパスが/だから直接Landingに遷移*/}
                {/* chatRoom */}
                <Route path="/" element={<Home />} />
                <Route path="/room/:id" element={<RoomChat />} />
                {/* <Route path="/tags" element={<Tag />} /> */}
                <Route path="/inquiry" element={<Inquiry />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/rooms" element={<Room />} />

                {/* ここに追加の画面のパスを記述していく */}
                {/* ルーム検索 */}
                <Route path="/search-rooms" element={<SerchRooms />} />
                {/* ルームクイズ */}
                <Route path="/search-rooms/:id/quiz" element={<RoomQuiz />} />
                {/* ルーム作成 */}
                <Route path='/create-room' element={<CreateRoom />} />
                
                {/* 採点後画面 */}
                <Route path='/search-rooms/:id/quiz/score' element={ <ScorePage/>} />

            </Routes>
        </BrowserRouter>
    );
}

export { AuthenticatedApp };
