import React from 'react';
import { Button } from '@material-ui/core';
import { useTogglePriority } from './GanttHook';
import './custom.css';

const GanttToolbar = React.memo(({ onAddEvent, onToggleChart, onZoomChange }) => {
    console.log('GanttToolbar rendered');
    const [, handlePriorityChange] = useTogglePriority('all');

    return (
        <React.Fragment>
        <div>
            <Button onClick={() => onZoomChange('hour')}>Hour</Button>
            <Button onClick={() => onZoomChange('day')}>Day</Button>
        </div>
        <div>
            <Button onClick={() => handlePriorityChange('all')}>All</Button>
            <Button onClick={() => handlePriorityChange('high')}>High</Button>
            <Button onClick={() => handlePriorityChange('normal')}>Normal</Button>
            <Button onClick={() => handlePriorityChange('low')}>Low</Button>
        </div>
        <div>
            <Button onClick={() => onAddEvent()}>Add</Button>
            <Button onClick={() => onToggleChart()}>Show</Button>
        </div>
        </React.Fragment>
    );
});

export default GanttToolbar;