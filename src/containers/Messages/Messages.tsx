import React, {useEffect, useState} from 'react';
import Post from '../../components/Post/Post';

interface Props {
  author: string;
  message: string;
  datetime: string;
  _id: string;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Props[]>([]);
  const [data, setData] = useState('');


  const url  = 'http://146.185.154.90:8000/messages';

  let interval: number | null = null;

  const fetchMessages = async () => {
    try {
      const response = await fetch(url + '?datetime=' + data);
      if (response.ok) {
        const fetchedMessages = await response.json();
        setMessages(fetchedMessages);
        if (fetchedMessages.length > 0) {
          setData(fetchedMessages[fetchedMessages.length - 1].datetime);
        }
      }
    } catch (error) {
      console.error('Ошибка при получении сообщений:', error);
    }
  };


  useEffect(() => {
    void fetchMessages();

    interval = setInterval(fetchMessages, 2000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);


  return (
    <div className="inner-container">
      <div className="posts">
        {messages.map((post) => (
          <Post
            key={post._id}
            author={post.author}
            date={(post.datetime)}
            text={post.message}
          />
        ))}
      </div>
    </div>
  );
};

export default Messages;
