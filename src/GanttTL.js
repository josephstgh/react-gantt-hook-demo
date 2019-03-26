import React from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css';

const data = {
    data: [
      {id: 1, text: 'Task #1', start_date: '15-04-2017', duration: 3, progress: 0.6},
      {id: 2, text: 'Task #2', start_date: '18-04-2017', duration: 3, progress: 0.4},
      {id: 3, text: 'Task #3', start_date: '18-04-2019', duration: 3, progress: 0.4}
    ],
  };

const ganttStyle = {
    width: '100%',
    height: '100%',
}

const GanttTL = () => {
    gantt.init('gantt');
    gantt.parse(data);

    return (
        <div>
            <div id='gantt' style={ganttStyle} />
        </div>
    );
};

export default GanttTL;