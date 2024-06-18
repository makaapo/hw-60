import React, {useState} from 'react';

interface Props {
  author: string;
  message: string;
  datetime: string;
  _id: string;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Props[]>([]);
  // Другие состояния и логика

  return (
    <div className="inner-container">
      Чат
    </div>
  );
};

export default Messages;
