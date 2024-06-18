import React, {useEffect, useState} from 'react';
import InputForm from '../../components/InputForm/InputForm';
import Post from '../../components/Post/Post';
import './Messages.css';

interface Props {
  author: string;
  message: string;
  datetime: string;
  _id: string;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Props[]>([]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Ошибка при получении сообщений:', error);
      setLoading(false);
    }
  };

  const addMessage = async () => {
    const data = new URLSearchParams();
    data.set('message', text);
    data.set('author', author);

    if (interval) clearInterval(interval);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        await fetchMessages();
      }
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }

    interval = setInterval(fetchMessages, 3000);

    setAuthor('');
    setText('');
  };

  useEffect(() => {
    void fetchMessages();

    interval = setInterval(fetchMessages, 3000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const pad = (s: number): string => (s < 10 ? '0' + s : s.toString());
    return [pad(date.getMonth() + 1),
        pad(date.getDate()),
        date.getFullYear()].join('.') + ' ' +
      [pad(date.getHours()),
        pad(date.getMinutes()),
        pad(date.getSeconds())].join(':');
  };

  return (
    <div className="inner-container">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <InputForm
            setAuthor={setAuthor}
            setText={setText}
            add={addMessage}
            author={author}
            text={text}
          />
          <div className="posts">
            {messages.map((post) => (
              <Post
                key={post._id}
                author={post.author}
                date={formatDate(post.datetime)}
                text={post.message}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Messages;
