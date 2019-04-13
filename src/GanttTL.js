import React, { useState, useEffect } from 'react';
import GanttToolbar from './GanttToolbar';
import GanttChart from './GanttChart';
import data from './data';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css';
import './custom.css';

const GanttTL = () => {

    const [display, setDisplay] = useState(true);
    const [zoomLevel, setZoomLevel] = useState('hour');

    const handleToggleChart = () => {
        setDisplay(!display);
    }

    const handleZoomChange = (zoom) => {
        setZoomLevel(zoom);
    }

    const handleAddEvent = () => {
        gantt.addTask({
            id: gantt.getTaskCount() + 1,
            text: 'Event',
            start_date: '15-04-2019',
            duration: 4,
            priority: 'high',
        });
    }
    
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