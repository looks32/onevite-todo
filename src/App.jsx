import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import './App.css';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import ExamUseReducer from './components/ExamUseReducer';

const mockData = [
  {
    id: 0,
    isDone: false,
    content: 'react 공부하기',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: '리액트 공부하기1',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: '리액트 공부하기2',
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    case 'DELETE':
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

// 기존의 Context 분리
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

// 여러가지 값들이 있지만 Provider를 중점으로 본다.
// console.log(TodoContext);

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  // const onUpdate = (targetId) => {
  //   dispatch({
  //     type: 'UPDATE',
  //     targetId: targetId,
  //   });
  // };

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: 'UPDATE',
      targetId: targetId,
    });
  }, []);

  // const onDelete = (targetId) => {
  //   dispatch({
  //     type: 'DELETE',
  //     targetId: targetId,
  //   });
  // };

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: 'DELETE',
      targetId: targetId,
    });
  }, []);

  // useMemo를 통하여 다시는 바뀌지 않게 만든다.
  const memoizedDispatch = useMemo(() => {
    return {
      onCreate,
      onUpdate,
      onDelete,
    };
  }, []);

  return (
    <>
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
      <ExamUseReducer />
    </>
  );
}

export default App;
