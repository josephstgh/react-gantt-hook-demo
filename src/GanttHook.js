import { useEffect, useRef } from 'react';

// useInterval Hook sets up an interval and clears it after unmounting. 
// It’s a combo of setInterval and clearInterval tied to the component lifecycle.
// See <a href="https://overreacted.io/making-setinterval-declarative-with-react-hooks/">useInterval Hook</a>
const useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
};

export { useInterval };