import React from 'react';
import { Button } from '@material-ui/core';
import { useTogglePriority } from './GanttHook';
import './custom.css';

const GanttToolbar = React.memo(
  ({ onAddEvent, onToggleChart, onZoomChange }) => {
    console.log('GanttToolbar rendered');

    // Array destructuring
    // const [, handlePriorityChange] = useTogglePriority('all');

    // Object destructuring
    // Unpack property from object and assign to variable with different name
    const { handlePriorityChange: onPriorityChange } = useTogglePriority('all');

    return (
      <React.Fragment>
        <div>
          <Button onClick={() => onZoomChange('hour')}>Hour</Button>
          <Button onClick={() => onZoomChange('day')}>Day</Button>
        </div>
        <div>
          <Button onClick={() => onPriorityChange('all')}>All</Button>
          <Button onClick={() => onPriorityChange('high')}>High</Button>
          <Button onClick={() => onPriorityChange('normal')}>Normal</Button>
          <Button onClick={() => onPriorityChange('low')}>Low</Button>
        </div>
        <div>
          <Button onClick={() => onAddEvent()}>Add</Button>
          <Button onClick={() => onToggleChart()}>Show</Button>
        </div>
      </React.Fragment>
    );
  }
);

export default GanttToolbar;
