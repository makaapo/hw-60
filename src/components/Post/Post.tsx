import React from 'react';

interface Props {
  author: string;
  date: string;
  text: string;
}

const Post: React.FC<Props> = ({author, date, text}) => (
    <div className="post">
      <p className="postAuthor">Автор: <strong>{author}</strong></p>
      <p className="postInfo">Дата: {date}</p>
      <p className="postText">Сообщение: <strong>{text}</strong></p>
    </div>
);

export default Post;
