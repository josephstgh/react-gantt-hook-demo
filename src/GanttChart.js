import React, { useEffect, useState, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import { setZoomConfig } from './zoom-level';
import { useInterval } from './GanttHook';
import './custom.css';

const GanttChart = React.memo(({ data, display, zoomLevel }) => {

    // let gContainer = useRef();
    // Introduce delay state to allow dynamic change to the interval
    // const [delay] = useState(10000);

    // Keep all the config in GanttChart so that any changes to props/state,
    // would then trigger a re-render of the component
    
    // If you want to run an effect and clean it up only once (on mount and unmount),
    // you can pass an empty array ([]) as a second argument
    useEffect(() => {
        gantt.config.show_chart = display;
        gantt.config.duration_step = 30; // Try switching between 15, 45 and 60
        gantt.config.duration_unit = 'minute';
        // Not exactly sure what this affects
        // gantt.config.time_step = 60;
        
        gantt.init('gantt');
        gantt.parse(data);
    }, []);

    useEffect(() => {
      setZoomConfig(zoomLevel);
    }, [zoomLevel]);
    
    useEffect(() => {
        gantt.config.show_chart = display;
    }, [display]);

    // To trigger a event when task if double clicked
    // useEffect(() => {
    //   const doubleClick = gantt.attachEvent('onTaskDblClick', (id, e) => {
    //     window.alert(`hi doubleClick ${id} ${e}`);
    //     // Push the view to Edit Event page view
    //   });

    //   // Clean-up the event
    //   return () => {
    //     gantt.detachEvent(doubleClick);
    //   };
    // });

    // useInterval(() => {
    //     gantt.eachTask((task) => {
    //         console.log(`${task.id}`);
    //     });
    // }, delay);

    // Trigger gantt to re-render only
    // when state/props changes (React.memo)
    // Keep it to the last Event
    useEffect(() => {
        gantt.render();
    });

    console.log('GanttChart rendered');
    return (
        <React.Fragment>
            {/* <div id='gantt' ref={(i) => gContainer = i} /> /> */}
            <div id='gantt' /> />
        </React.Fragment>
    );
});

export default GanttChart;