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

const useToggleZoom = (initialZoom) => {
  const [zoomLevel, setZoomLevel] = useState(initialZoom);

  console.log(zoomLevel);

  const handleZoomChange = (zoom) => {
    useZoomLevel(zoom);
    setZoomLevel(zoom);
    gantt.render();
  };

  useEffect(() => {
    useZoomLevel(initialZoom);
  }, []);

  return [zoomLevel, handleZoomChange];
}

const useZoomLevel = (zoom) => {
  
  switch (zoom) {
    case 'hour':
      gantt.config.scale_unit = 'day';
      gantt.config.date_scale = '%d %M';
      gantt.config.scale_height = 60;
      gantt.config.min_column_width = 30;
      gantt.config.subscales = [
        {
          unit: 'hour',
          step: 1,
          date: '%H',
        },
      ];
      break;
    case 'day':
      gantt.config.scale_unit = 'day';
      gantt.config.step = 1;
      gantt.config.date_scale = '%d %M';
      gantt.config.subscales = [];
      gantt.config.scale_height = 60;
      gantt.templates.date_scale = null;
      gantt.config.min_column_width = 100;
      break;
    default: break;
  }
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

  return [priority, handlePriorityChange];
};

export { useInterval, useToggleZoom, useTogglePriority };