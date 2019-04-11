import React from 'react';
import { Button } from '@material-ui/core';
import { useToggleZoom } from './GanttHook';
import './custom.css';

const GanttToolbar = React.memo(({ onPriorityChange, onAddEvent }) => {
    console.log('GanttToolbar rendered');
    const [, handleZoomChange] = useToggleZoom('hour');

    return (
        <React.Fragment>
        <div>
            <Button onClick={() => handleZoomChange('hour')}>Hour</Button>
            <Button onClick={() => handleZoomChange('day')}>Day</Button>
        </div>
        <div>
            <Button onClick={() => onPriorityChange('high')}>high</Button>
            <Button onClick={() => onPriorityChange('normal')}>normal</Button>
            <Button onClick={() => onPriorityChange('low')}>low</Button>
        </div>
        <div>
            <Button onClick={() => onAddEvent()}>Add</Button>
        </div>
        </React.Fragment>
    );
});

export default GanttToolbar;