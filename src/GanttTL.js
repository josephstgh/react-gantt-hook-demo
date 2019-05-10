import React, { useState, useEffect, useCallback, useContext } from 'react';
import GanttToolbar from './GanttToolbar';
import GanttChart from './GanttChart';
import data from './data';
import { gantt } from 'dhtmlx-gantt';
import { useFetchData, useInterval } from './GanttHook';
import { AppStoreContext } from './context/AppStoreContext';
import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css';
// import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css';
import './custom.css';
import TemporaryDrawer from './TemporaryDrawer';

const GanttTL = () => {
  // Can use dispatch or actions to trigger a change
  const { state, dispatch, actions } = useContext(AppStoreContext);
  const [display, setDisplay] = useState(false);
  const [zoomLevel, setZoomLevel] = useState('hour');
  const result = useFetchData('https://jsonplaceholder.typicode.com/users');

  const handleZoomChange = useCallback(zoom => {
    setZoomLevel(zoom);
  }, []);

  const handleAddEvent = useCallback(() => {
    const nDate = new Date();

    gantt.addTask({
      id: gantt.getTaskCount() + 1,
      text: 'Event',
      start_date: nDate,
      end_date: nDate,
      priority: 'high'
    });
  }, []);

  const handleDispatch = () => {
    actions.switchWorkspace(2);
  };

  const handleEarlyEvent = () => {
    const task1 = gantt.getTask(1);
    task1.original_start_date = task1.start_date;
    task1.start_date = new Date(2019, 3, 16);
    console.log(gantt.calculateDuration(task1.start_date, task1.original_start_date));
    console.log(task1);
    gantt.updateTask(task1.id);
    gantt.render();
  };

  // functions are re-initialize each time GanttTL component is rendered
  // by default (w/o useCallback()), when handle* is passed on to its
  // child component (GanttToolbar), it will cause GanttToolbar to re-render
  // even if that component is wrapped with React.memo()

  // on first load.. GanttTTL, Toolbar, Chart is rendered.
  // useFetchData is then called which update the state
  // and causes GanttTL to re-rendered which causes GanttToolbar
  // to re-render (if not using useCallback())

  // with useCallback(), only GanttTL component will be re-rendered
  // but if the data is passed to GanttChart to display the chart
  // it will then cause GanttChart to re-render due to props change
  const handleToggleChart = useCallback(() => {
    setDisplay(!display);
  }, [display]);

  useEffect(() => {
    const event = gantt.attachEvent('onAfterTaskAdd', (id, task) => {
      gantt.message(`${task.text} with ${id} is created`);
    });

    return () => {
      gantt.detachEvent(event);
    };
  });

  console.log('GanttTL rendered');
  // Below is rendered to the DOM
  return (
    <div>
      <TemporaryDrawer />
      <div id="toolbar">
        <GanttToolbar
          onAddEvent={handleAddEvent}
          onToggleChart={handleToggleChart}
          onZoomChange={handleZoomChange}
          onEarlyEvent={handleEarlyEvent}
          onDispatch={handleDispatch}
          onAddTask={handleAddEvent}
        />
      </div>
      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <GanttChart data={data} display={display} zoomLevel={zoomLevel} />
      </div>
    </div>
  );
};

export default GanttTL;
