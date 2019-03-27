import React from 'react';
import './custom.css';

const GanttChart = React.memo(() => {
    console.log('GanttChart rendered');
    return (
        <div>
            <div id='gantt' />
        </div>
    );
});

export default GanttChart;