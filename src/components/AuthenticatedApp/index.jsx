import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from '../Landing';
import { ChatRoom } from '../ChatRoom';
import Home from '../../pages/Home';
import Inquiry from "../../pages/Inquiry";
import Mypage from "../../pages/Mypage";
import Tag from "../../pages/Tag";


function AuthenticatedApp() {
    return (
        // ログイン認証後はルーティング 多分ここからルーティングするって構造にすると、ログイン前にアクセスとかなくなる
        // twitter-clone-udemyはだいぶ構造変えるかな
        <BrowserRouter>
            <Routes>
                {/* パス指定と指定先のコンポーネント */}
                {/* Landing → ルーム一覧  ログイン後のパスが/だから直接Landingに遷移*/}
                {/* <Route path="/rooms" element={<Landing />} /> */}
                {/* chatRoom */}
                <Route path="/" element={<Home />} />
                <Route path="/rooms" element={<Landing />} />
                <Route path="/room/:id" element={<ChatRoom />} />
                <Route path="/tags" element={<Tag />} />
                <Route path="/inquiry" element={<Inquiry />} />
                <Route path="/mypage" element={<Mypage />} />
            </Routes>
        </BrowserRouter>
    );
}

export { AuthenticatedApp };
