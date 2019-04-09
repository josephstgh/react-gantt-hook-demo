import React, { useState, useEffect } from 'react';
import GanttToolbar from './GanttToolbar';
import GanttChart from './GanttChart';
import data from './data';
import { gantt } from 'dhtmlx-gantt';
import { useZoomLevel } from './GanttHook';
import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css';
import './custom.css';

const GanttTL = () => {
    const [zoomLevel, setZoomLevel] = useState('day');
    const [priority, setPriority] = useState('high');
    
    const handleZoomLevelChange = (zoom) => {
        setZoomLevel(zoom);
    };

    const handlePriorityChange = (priority) => {
        setPriority(priority);
    };

    // To re-render the chart when zoomLevel changes
    useEffect(() => {
        useZoomLevel(zoomLevel);
        console.log(`Current selected priority is ${priority}`);
        
        gantt.attachEvent('onBeforeTaskDisplay', (id, task) => {
            console.log(`${id} priority is ${task.priority}`);
            if (task.priority === priority) {
                return true;
            }

            return false;
        });

        // Why when using either refreshData(), or render() will cause log
        // inside event to run two or more times
        gantt.refreshData();
        // gantt.render();

    }, [zoomLevel, priority]);
    
    console.log('GanttTL rendered');
    // Below is rendered to the DOM
    return (
        <div>
            <div id='toolbar'>
                <GanttToolbar 
                    onZoomChange={handleZoomLevelChange} 
                    onPriorityChange={handlePriorityChange}
                />
            </div>
            <div style={{width: '100%', height: '100%', position: 'absolute'}}>
                <GanttChart data={data} />
            </div>
        </div>
    );
};

export default GanttTL;