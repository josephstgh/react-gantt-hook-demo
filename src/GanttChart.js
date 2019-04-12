import React, { useEffect, useState } from 'react';
import { gantt } from 'dhtmlx-gantt';
import { useInterval } from './GanttHook';
import './custom.css';

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

const GanttChart = React.memo(({ data, display, zoomLevel }) => {
    // Introduce delay state to allow dynamic change to the interval
    // const [delay] = useState(10000);

    // Keep all the config in GanttChart so that any changes to props/state,
    // would then trigger a re-render of the component
    
    // If you want to run an effect and clean it up only once (on mount and unmount),
    // you can pass an empty array ([]) as a second argument
    useEffect(() => {
        gantt.config.show_chart = display;
        gantt.config.duration_step = 15;
        gantt.config.duration_unit = 'minute';
        gantt.config.time_step = 15; // Doesn't seem to work
        
        gantt.init('gantt');
        gantt.parse(data);
    }, []);

    useEffect(() => {
        useZoomLevel(zoomLevel);
    }, [zoomLevel]);
    
    useEffect(() => {
        gantt.config.show_chart = display;
    }, [display]);

    // useInterval(() => {
    //     gantt.eachTask((task) => {
    //         console.log(`${task.id}`);
    //     });
    // }, delay);

    useEffect(() => {
        gantt.render();
    });

    console.log('GanttChart rendered');
    return (
        <React.Fragment>
            <div id='gantt' />
        </React.Fragment>
    );
});

export default GanttChart;