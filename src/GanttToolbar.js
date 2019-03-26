import React from 'react';
import { Button } from '@material-ui/core';
import './custom.css';

const GanttToolbar = (props) => {
    const { onZoomChange } = props;

    return (
        <div>
            <Button onClick={() => onZoomChange('hour')}>Hour</Button>
            <Button onClick={() => onZoomChange('day')}>Day</Button>
        </div>
    );
};

export default GanttToolbar;