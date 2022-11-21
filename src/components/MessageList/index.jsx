import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useMessages } from '../../hooks/useMessages';
import './styles.css';

function MessageList({ roomId }) {
    const containerRef = React.useRef(null);
    // ログインユーザー情報取得
    const { user } = useAuth();
    // 多分ルーム内のメッセージの情報が入ってそう
    const messages = useMessages(roomId);

    // レイアウト効果のロジックでコンテナが一番下までスクロール → 常に最新のメッセが表示される
    React.useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    });

    return (
        <div className="message-list-container" ref={containerRef}>
            <ul className="message-list">
                {/* messagesは多分ルーム内の全メッセージデータ → useMessagesで取得 */}
                {console.log(messages)}
                {messages.map((x) => (
                    // メッセージcomponentにプロパティをpropsで渡す
                    // この下にMessageの関数コンポーネントあります
                    <Message
                        key={x.id}
                        message={x}
                        isOwnMessage={x.uid === user.uid}
                    />
                ))}
            </ul>
        </div>
    );
}

// あんまし何やってるかわからん
function Message({ message, isOwnMessage }) {
    const { displayName, text } = message;

    return (
        <li className={['message', isOwnMessage && 'own-message'].join(' ')}>
            <h4 className="sender">{isOwnMessage ? 'You' : displayName}</h4>
            <div>{text}</div>
        </li>
    );
}

export { MessageList };
