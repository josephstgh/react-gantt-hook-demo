import React from 'react';
import './custom.css';

const GanttChart = React.memo(() => {
    console.log('GanttChart rendered');
    return (
        <React.Fragment>
            <div id='gantt' />
        </React.Fragment>
    );
});

export default GanttChart;