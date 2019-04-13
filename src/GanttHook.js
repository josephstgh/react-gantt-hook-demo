import { useEffect, useRef, useState } from 'react';
import { gantt } from 'dhtmlx-gantt';

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

const useTogglePriority = (initalPriority) => {
  const [priority, setPriority] = useState(initalPriority);
        
  const handlePriorityChange = (priority) => {
      setPriority(priority);
  };

  useEffect(() => {
    console.log(`Current selected priority is ${priority}`);
    
    const id = gantt.attachEvent('onBeforeTaskDisplay', (id, task) => {
        console.log(`${id} priority is ${task.priority}`);

        // Return all tasks if priority is all
        if ('all' === priority) {
          return true;
        }

        // Return only the task that matches the priority selected
        if (task.priority === priority) {
          return true;
        }

        return false;
    });

    gantt.refreshData();

    // perform cleanup
    return () => {
        gantt.detachEvent(id);
    }
  }, [priority]);
  
  // Return as an object or can return as an array
  // return [priority, handlePriorityChange]
  return { priority, handlePriorityChange };
};

export { useInterval, useTogglePriority };