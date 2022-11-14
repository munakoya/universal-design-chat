import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { sendMessage } from '../../firebase';
import './styles.css';

// メッセージの入力コンポーネントかな多分 roomidを受け取って
function MessageInput({ roomId }) {
    // ログインユーザー情報
    const { user } = useAuth();
    const [value, setValue] = React.useState('');

    // これは入力欄に入力された文字を変数に格納する処理かな
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    // 送信ボタンクリックで発火する送信処理の関数かな
    const handleSubmit = (event) => {
        // これでリロードしないようにしてる
        event.preventDefault();
        // firebaseのsendMessage関数を呼び出して、dbに値をセット
        // 引数にroomIdとuserとvalue(入力テキスト)をprops
        sendMessage(roomId, user, value);
        // 送信後は入力欄を空にする
        setValue('');
    };

    return (
        // buttonで実行 → handlSubmit
        <form onSubmit={handleSubmit} className="message-input-container">
            <input
                type="text"
                placeholder="Enter a message"
                value={value}
                // 入力されると変数にセット
                onChange={handleChange}
                className="message-input"
                // 空送信できないように
                required
                minLength={1}
            />
            <button type="submit" disabled={value < 1} className="send-message">
                Send
            </button>
        </form>
    );
}

export { MessageInput };
