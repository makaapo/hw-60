import React from 'react';

interface Props {
  setAuthor: (author: string) => void;
  setText: (text: string) => void;
  add: () => void;
  author: string;
  text: string;
}

const InputForm: React.FC<Props> = ({setAuthor, setText, add, author, text}) => {
  const changeAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="forms">
      <input
        className="authorForm"
        type="text"
        onChange={changeAuthor}
        value={author}
        placeholder="author"
      />
      <input
        className="textForm"
        type="text"
        onChange={changeText}
        value={text}
        placeholder="text"
      />
      <button onClick={add} className="sendBtn">Send</button>
    </div>
  );
};

export default InputForm;
