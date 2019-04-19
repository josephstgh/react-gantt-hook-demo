import React, { useState, useEffect, useCallback } from 'react';
import GanttToolbar from './GanttToolbar';
import GanttChart from './GanttChart';
import data from './data';
import { gantt } from 'dhtmlx-gantt';
import { useFetchData, useInterval } from './GanttHook';
import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css';

import './custom.css';

const GanttTL = () => {

    const [display, setDisplay] = useState(true);
    const [zoomLevel, setZoomLevel] = useState('hour');
    const result = useFetchData('https://jsonplaceholder.typicode.com/users');

    const handleZoomChange = useCallback((zoom) => {
        setZoomLevel(zoom);
    }, []);

    const handleAddEvent = useCallback(() => {
        gantt.addTask({
            id: gantt.getTaskCount() + 1,
            text: 'Event',
            start_date: '15-04-2019',
            duration: 4,
            priority: 'high',
        });
    }, []);

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
            <div id='toolbar'>
                <GanttToolbar
                    onAddEvent={handleAddEvent}
                    onToggleChart={handleToggleChart}
                    onZoomChange={handleZoomChange}
                />
            </div>
            <div style={{width: '100%', height: '100%', position: 'absolute'}}>
                <GanttChart data={data} display={display} zoomLevel={zoomLevel} />
            </div>
        </div>
    );
};

export default GanttTL;