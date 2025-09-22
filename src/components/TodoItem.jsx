import { memo, useContext } from 'react';
import { TodoDispatchContext } from '../App';

const TodoItem = ({ id, isDone, content, date }) => {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);

  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div>
      <input type="checkbox" checked={isDone} onChange={onChangeCheckbox} />
      <div>{content}</div>
      <div>{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};

// onUpdate와 onDelete는 항상 새로운 값을 받아 오기 때문에
// memo를 사용해도 리렌더링이 발생한다.
// 그래서 그것을 방지하기 위해서 memo의 두번째 인자로
// 직접 비교할 props를 함수로 비교해준다.
// export default memo(TodoItem, (prevProps, nextProps) => {
// 반환값에 따라, Props가 바뀌었는지 안바뀌었는지 판단
// T -> Props 바뀌지 않음 -> 리렌더링 X
// F -> Props 바뀜 -> 리렌더링 O

//   if (prevProps.id !== nextProps.id) return false;
//   if (prevProps.isDone !== nextProps.isDone) return false;
//   if (prevProps.content !== nextProps.content) return false;
//   if (prevProps.date !== nextProps.date) return false;

//   return true;
// });

// 기존의 memo만 사용할 때보다 간결하게 사용 가능
export default memo(TodoItem);
