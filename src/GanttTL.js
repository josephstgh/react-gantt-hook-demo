import React, { useState, useEffect } from 'react';
import GanttToolbar from './GanttToolbar';
import GanttChart from './GanttChart';
import data from './data';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css';
import './custom.css';

class Event {
    constructor(id, text, start_date, duration, priority) {
        this.id = id;
        this.text = text;
        this.start_date = start_date;
        this.duration = duration;
        this.priority = priority;
    }

    // Consider adding methods to calulate progress, etc?
}

const GanttTL = () => {
    const handleAddEvent = () => {
        const e = new Event(gantt.getTaskCount() + 1, 'hello', '15-04-2019', 4, 'high');

        // Can't do this, gantt will throw error, find out why
        // gantt.addTask(JSON.stringify(e));

        gantt.addTask({
            id: e.id,
            text: e.text,
            start_date: e.start_date,
            duration: e.duration,
            priority: e.priority,
        });
    }
    
    console.log('GanttTL rendered');
    // Below is rendered to the DOM
    return (
        <div>
            <div id='toolbar'>
                <GanttToolbar 
                    onAddEvent={handleAddEvent}
                />
            </div>
            <div style={{width: '100%', height: '100%', position: 'absolute'}}>
                <GanttChart data={data} />
            </div>
        </div>
    );
};

export default GanttTL;