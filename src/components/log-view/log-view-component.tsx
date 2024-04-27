// Modules
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import type { ListProps } from 'react-virtualized'
import { List } from 'react-virtualized';

// Hooks
import { useWebSocket } from '../../hooks/useWebSocket';

// Styles
import styles from './styles.module.scss';

export const LogViewComponent: FC = () => {
  const dataRef = useRef<string[]>([]);
  const [scroll, setScroll] = useState<boolean>(true)
  const [logList, setLogList] = useState<string[]>([]);

  const handleGetMessage = useCallback((data: any) => {
    dataRef.current = dataRef.current.concat(data);
  }, []);

  useWebSocket({
    url: '/view-log-ws',
    onMessage: handleGetMessage,
  });

  function rowRenderer(props: ListProps): JSX.Element {
    const {
      key,
      index,
      style,
    } = props;
    return (
      <div key={key} style={style}>
        {logList[index]}
      </div>
    );
  }

  const handleSwitchScroll = () => setScroll((prevState) => !prevState);

  const scrollToIndex = scroll ? logList.length - 1 : undefined;

  useEffect(() => {
    setLogList([]);
    const intervalId = setInterval(() => {
      setLogList(dataRef.current);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['wrapper__container']}>
        <div className={styles['wrapper__container__list']}>
          <List
            scrollToIndex={scrollToIndex}
            width={900}
            height={600}
            rowCount={logList.length}
            rowHeight={60}
            rowRenderer={rowRenderer as any}
          />
        </div>
      </div>
      <div className={styles['wrapper__button']}>
        <button onClick={handleSwitchScroll}>Switch Scroll</button>
      </div>
    </div>
  );
};
