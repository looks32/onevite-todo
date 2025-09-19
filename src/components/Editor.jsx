import { useRef, useState } from 'react';

const Editor = ({ onCreate }) => {
  const [content, setCountent] = useState('');
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setCountent(e.target.value);
  };

  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (content === '') {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setCountent('');
  };
  return (
    <div>
      <input
        ref={contentRef}
        type="text"
        value={content}
        onKeyDown={onKeydown}
        onChange={onChangeContent}
        placeholder="새로운 Todo.."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
