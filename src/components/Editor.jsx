import { useContext, useRef, useState } from 'react';
import { TodoContext } from '../App';

const Editor = () => {
  // const data = useContext(TodoContext);
  // 값을 잘 받아 왔는지 확인
  // console.log(data);

  // 필요한 값만 구조분해 할당
  const { onCreate } = useContext(TodoContext);

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
