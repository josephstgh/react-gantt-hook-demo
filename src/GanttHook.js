import { useEffect, useRef, useState } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker';

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

/**
 * @param  {string} initalPriority
 */
const useTogglePriority = initalPriority => {
  const [priority, setPriority] = useState(initalPriority);

  const handlePriorityChange = priority => {
    setPriority(priority);
  };

  useEffect(() => {
    console.log(`Current selected priority is ${priority}`);

    const event = gantt.attachEvent('onBeforeTaskDisplay', (id, task) => {
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
      gantt.detachEvent(event);
    };
  }, [priority]);

  // Return as an object or can return as an array
  // return [priority, handlePriorityChange]
  return { priority, handlePriorityChange };
};

/**
 * @param  {string} url
 */
const useFetchData = url => {
  const [data, setData] = useState();

  const fetchData = async url => {
    try {
      const res = await fetch(url);
      const result = await res.json();
      setData(result);
    } catch (e) {
      console.error(e);
    }
  };

  // Should only fetch onMount
  useEffect(() => {
    fetchData(url);
  }, []);

  return data;
};

const useMarker = () => {
  const [markerId, setMarkerId] = useState();

  const initMarker = () => {
    const id = gantt.addMarker({
      start_date: new Date(),
      css: 'today',
      text: 'Now',
      title: new Date()
    });

    return id;
  };

  useEffect(() => {
    setMarkerId(initMarker());

    return () => {
      gantt.deleteMarker(markerId);
    };
  }, []);

  return markerId;
};

export { useInterval, useTogglePriority, useFetchData, useMarker };
