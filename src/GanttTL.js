import React, { useState, useEffect } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css';
import data from './data';
import GanttToolbar from './GanttToolbar';
import GanttChart from './GanttChart';
import './custom.css';

const GanttTL = () => {

    // If you want to run an effect and clean it up only once (on mount and unmount),
    // you can pass an empty array ([]) as a second argument
    useEffect(() => {
        gantt.init('gantt');
        gantt.parse(data);
    }, []);

    const [zoomLevel, setZoomLevel] = useState('hour');

    const handleZoomLevelChange = (zoom) => {
        setZoomLevel(zoom);
    };

    // This is called after React render to the DOM
    // useEffect is run both after first render and after every update
    useEffect(() => {
        console.log(zoomLevel);
    }, [zoomLevel]);
    // Specifying [zoomLevel] means that only trigger this if zoomLevel changes

    // Below is rendered to the DOM
    return (
        <div>
            <GanttToolbar 
                onZoomChange={handleZoomLevelChange} 
            />
            <GanttChart />
        </div>
    );
};

export default GanttTL;