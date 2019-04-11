import React, { useEffect, useState } from 'react';
import { gantt } from 'dhtmlx-gantt';
import { useInterval } from './GanttHook';
import './custom.css';

const GanttChart = React.memo(({ data }) => {
    // Introduce delay state to allow dynamic change to the interval
    // const [delay] = useState(10000);

    // If you want to run an effect and clean it up only once (on mount and unmount),
    // you can pass an empty array ([]) as a second argument
    useEffect(() => {
        gantt.init('gantt');
        gantt.parse(data);
    }, []);

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