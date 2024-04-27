// Modules
import { useCallback, useRef, useState } from 'react';

// Hooks
import { useWebSocket } from './useWebSocket';

export const useProcessLogData = () => {
  const dataRef = useRef<string[]>([]);
  const [logList, setLogList] = useState<string[]>([]);

  const handleGetMessage = useCallback((data: string[]) => {
    dataRef.current = dataRef.current.concat(data);
    setLogList(dataRef.current);
  }, []);

  useWebSocket({
    url: '/view-log-ws',
    onMessage: handleGetMessage,
  });

  return {
    logList,
    setLogList,
  };
}

export default useProcessLogData;
