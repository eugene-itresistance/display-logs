// Modules
import { useEffect } from 'react';

// Config
import { WS_URL } from '../config/local';

interface Arguments {
  url: string;
  onMessage: any;
}

export const useWebSocket = (args: Arguments) => {
  const { url, onMessage } = args;

  useEffect(() => {
    const socket = new WebSocket(
      new URL(url, WS_URL).href
    );

    socket.addEventListener('open', (event) => {
      socket.send('Hello Server!');
    });

    socket.addEventListener('message', (event) => {
      onMessage(event.data);
    });

    socket.addEventListener('close', (event) => {
      console.log(`WS event: ${event} close`)
    });
  }, [onMessage, url]);
};

export default useWebSocket;
