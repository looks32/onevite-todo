import { memo } from 'react';

const Header = () => {
  return (
    <div className="Header">
      <h3>오늘은 📅</h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

// const memoizedHeader = memo(Header);
// export default memoizedHeader;

// 위 주석은 이렇게 줄이기 가능
// 고차 컴포넌트(HOC / High Order Component) 라고 한다.
export default memo(Header);
