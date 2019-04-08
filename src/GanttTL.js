import React, { useState, useEffect } from 'react';
import GanttConfig from './GanttConfig';
import GanttToolbar from './GanttToolbar';
import GanttChart from './GanttChart';
import data from './data';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css';
import './custom.css';

const GanttTL = () => {
    const [zoomLevel, setZoomLevel] = useState('day');

    const handleZoomLevelChange = (zoom) => {
        setZoomLevel(zoom);
    };

    // To re-render the chart when zoomLevel changes
    useEffect(() => {
        gantt.render();
    }, [zoomLevel]);
    
    console.log('GanttTL rendered');
    // Below is rendered to the DOM
    return (
        <div>
            <GanttConfig zoomLevel={zoomLevel} />
            <div id='toolbar'>
                <GanttToolbar 
                    onZoomChange={handleZoomLevelChange} 
                />
            </div>
            
            <div style={{width: '100%', height: '100%', position: 'absolute'}}>
                <GanttChart data={data} />
            </div>
        </div>
    );
};

export default GanttTL;