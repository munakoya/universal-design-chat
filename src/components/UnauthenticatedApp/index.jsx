import { useAuth } from '../../hooks/useAuth';
import './styles.css';

function UnauthenticatedApp() {
    // ユーザ認証の情報取得 → onClickでlogin呼び出し → 関数?
    // → useAuth とAuthContextの中のloginにつながっていると思われる → だからonClickでポップアップなる
    const { login } = useAuth();

    return (
        <>
            <h2>Log in to join a chat room!</h2>
            <div>
                <button onClick={login} className="login">
                    Login with Google
                </button>
            </div>
        </>
    );
}

export { UnauthenticatedApp };
