/**
 * ログインページ
 * useAuthのuserデータとsessionがnullのとき遷移
 */

import { useAuth } from '../../hooks/useAuth';
import './styles.css';

function UnauthenticatedApp() {
    const { login } = useAuth();

    return (
        <div className='unAuthenticated'>
            <h1>Universal Design Chat</h1>
            <h2>Welcome to UDC !</h2>
            <div>
                {/* 利用規約文を追加 */}
                <button onClick={login} className="login">
                    Login with Google
                </button>
            </div>
        </div>
    );
}

export { UnauthenticatedApp };
