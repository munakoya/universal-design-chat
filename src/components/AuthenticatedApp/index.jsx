import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from '../Landing';
import { ChatRoom } from '../ChatRoom';

function AuthenticatedApp() {
    return (
        // ログイン認証後はルーティング 多分ここからルーティングするって構造にすると、ログイン前にアクセスとかなくなる
        // twitter-clone-udemyはだいぶ構造変えるかな
        <BrowserRouter>
            <Routes>
                {/* パス指定と指定先のコンポーネント */}
                {/* Landing → ルーム一覧  ログイン後のパスが/だから直接Landingに遷移*/}
                <Route path="/" element={<Landing />} />
                {/* chatRoom */}
                <Route path="/room/:id" element={<ChatRoom />} />
            </Routes>
        </BrowserRouter>
    );
}

export { AuthenticatedApp };
