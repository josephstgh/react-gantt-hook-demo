import React from 'react';
import { Button } from '@material-ui/core';
import { useToggleZoom, useTogglePriority } from './GanttHook';
import './custom.css';

const GanttToolbar = React.memo(({ onAddEvent }) => {
    console.log('GanttToolbar rendered');
    const [, handleZoomChange] = useToggleZoom('day');
    const [, handlePriorityChange] = useTogglePriority('high');

    return (
        <React.Fragment>
        <div>
            <Button onClick={() => handleZoomChange('hour')}>Hour</Button>
            <Button onClick={() => handleZoomChange('day')}>Day</Button>
        </div>
        <div>
            <Button onClick={() => handlePriorityChange('high')}>high</Button>
            <Button onClick={() => handlePriorityChange('normal')}>normal</Button>
            <Button onClick={() => handlePriorityChange('low')}>low</Button>
        </div>
        <div>
            <Button onClick={() => onAddEvent()}>Add</Button>
        </div>
        </React.Fragment>
    );
});

export default GanttToolbar;