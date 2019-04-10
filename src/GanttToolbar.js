import React from 'react';
import { Button } from '@material-ui/core';
import './custom.css';

const GanttToolbar = React.memo(({ onZoomChange, onPriorityChange, onAddEvent }) => {
    console.log('GanttToolbar rendered');
    return (
        <React.Fragment>
        <div>
            <Button onClick={() => onZoomChange('hour')}>Hour</Button>
            <Button onClick={() => onZoomChange('day')}>Day</Button>
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