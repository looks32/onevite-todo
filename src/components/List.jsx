import { useMemo, useState } from 'react';
import TodoItem from './TodoItem';

const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState('');
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const getFilteredData = () => {
    if (search === '') {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  // const getAnalyzedDate = () => {
  //   const totalCount = todos.length;
  //   const doneCount = todos.filter((todo) => todo.isDone).length;
  //   const notDoneCount = totalCount - doneCount;
  //   return {
  //     totalCount,
  //     doneCount,
  //     notDoneCount,
  //   };
  // };

  // const { totalCount, doneCount, notDoneCount } = getAnalyzedDate();

  // 위의 주석 내용을
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    // 이제는 검색을 해도 console이 찍히지 않음
    console.log('호출');
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

  const filteredTodos = getFilteredData();
  return (
    <div>
      <h4>Todo List</h4>
      <div>
        <div>total : {totalCount}</div>
        <div>done : {doneCount}</div>
        <div>notDone : {notDoneCount}</div>
      </div>
      <input
        type="text"
        onChange={onChangeSearch}
        value={search}
        placeholder="검색어를 입력하세요"
      />
      {filteredTodos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            {...todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default List;
