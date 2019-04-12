import React from 'react';
import { Button } from '@material-ui/core';
import { useTogglePriority } from './GanttHook';
import './custom.css';

const GanttToolbar = React.memo(({ onAddEvent, onToggleChart, onZoomChange }) => {
    console.log('GanttToolbar rendered');
    const [, handlePriorityChange] = useTogglePriority('high');

    return (
        <React.Fragment>
        <div>
            <Button onClick={() => onZoomChange('hour')}>Hour</Button>
            <Button onClick={() => onZoomChange('day')}>Day</Button>
        </div>
        <div>
            <Button onClick={() => handlePriorityChange('high')}>high</Button>
            <Button onClick={() => handlePriorityChange('normal')}>normal</Button>
            <Button onClick={() => handlePriorityChange('low')}>low</Button>
        </div>
        <div>
            <Button onClick={() => onAddEvent()}>Add</Button>
            <Button onClick={() => onToggleChart()}>Show</Button>
        </div>
        </React.Fragment>
    );
});

export default GanttToolbar;