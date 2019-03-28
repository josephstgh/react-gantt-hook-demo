import React from 'react';
import { Button } from '@material-ui/core';
import './custom.css';

const GanttToolbar = React.memo((props) => {
    const { onZoomChange } = props;
    console.log('GanttToolbar rendered');
    return (
        <React.Fragment>
        <div>
            <Button onClick={() => onZoomChange('hour')}>Hour</Button>
            <Button onClick={() => onZoomChange('day')}>Day</Button>
        </div>
        </React.Fragment>
    );
});

export default GanttToolbar;