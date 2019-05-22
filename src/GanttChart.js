import React, { useEffect, useState, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import { setZoomConfig } from './zoom-level';
import { columns } from './column-config';
import { useInterval, useFetchData, useMarker, useQuickInfo } from './GanttHook';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_quick_info';
// import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_tooltip';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker';
import './custom.css';

/**
 * Keep all the config in GanttChart so that any changes to props/state,
 * would then trigger a re-render of the component
 *
 * @param  {} data
 * @param  {} display
 * @param  {} zoomLevel
 */
const GanttChart = React.memo(({ data, display, zoomLevel }) => {
  const markerId = useMarker();
  useQuickInfo();
  gantt.config.columns = columns;

  // const rightSideGridColumns = {
	// 	columns: [
	// 		{
	// 			name: "status", label: "Status", width: 30, align: "center", template: function (task) {
	// 				const progress = task.progress || 0;
  //         return Math.floor(progress * 100) + "";
	// 			}
	// 		},
	// 	]
  // };

  // gantt.templates.tooltip_text = function (start, end, task) {
  //   if (!gantt.config.show_chart) {
  //     return "<b>Task:</b> " + task.text + "<br/>" +
  //       "<b>Start date:</b> " +
  //       gantt.templates.tooltip_date_format(start) +
  //       "<br/><b>End date:</b> " + gantt.templates.tooltip_date_format(end);
  //   } else return ""
  // };

  // let gContainer = useRef();
  // Introduce delay state to allow dynamic change to the interval
  // const [delay] = useState(10000);

  // If you want to run an effect and clean it up only once (on mount and unmount),
  // you can pass an empty array ([]) as a second argument
  useEffect(() => {
    gantt.config.show_chart = display;
    gantt.config.sort = true;
    // gantt.config.show_quick_info = display;

    gantt.config.layout = {
      css: "gantt_container",
      rows: [
        {
          cols: [
            {view: "grid", width: 320, scrollY: "scrollVer"},
            {resizer: true, width: 1},
            {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
            {resizer: true, width: 1},
            // {view: "grid", width: 50, bind: "task", scrollY: "scrollVer", config: rightSideGridColumns},
            // {view: "scrollbar", id: "scrollVer"}
          ]
        },
        {view: "scrollbar", id: "scrollHor", height: 20}
      ]
    };

    gantt.templates.progress_text = function (start, end, task) {
      return "<span style='text-align:left;'>" + Math.round(task.progress * 100) + "% </span>";
    };

    // duration_step and duration_unit used for
    // the calculation for each task
    // If a task duration is set to 3, then the
    // task duration will be 1 hour and 30 min (30 minute per unit/duration)
    gantt.config.duration_step = 30;
    gantt.config.duration_unit = 'minute';

    // By default tasks snap to time scale cells on drag and drop,
    // so time_step won’t affect d’n’d dates directly.
    // To allow d'n'd to not be dependent on time scale,
    // then set round_dnd_dates to false
    // gantt.config.round_dnd_dates = false;
    // gantt.config.time_step = 30;

    gantt.init('gantt');
    gantt.parse(data);
  }, []);

  useEffect(() => {
    setZoomConfig(zoomLevel);
  }, [zoomLevel]);

  useEffect(() => {
    gantt.config.show_chart = display;
    // gantt.config.show_quick_info = display;
  }, [display]);

  useEffect(() => {
    gantt.updateMarker(markerId);
  });

  useInterval(() => {
    const newDate = new Date();
    const currentMarker = gantt.getMarker(markerId);
    currentMarker.start_date = newDate;
    currentMarker.title = newDate;
    gantt.updateMarker(markerId);
  }, 1000);

  // To trigger a event when task if double clicked
  // useEffect(() => {
  //   const doubleClick = gantt.attachEvent('onTaskDblClick', (id, e) => {
  //     window.alert(`hi doubleClick ${id} ${e}`);
  //     // Push the view to Edit Event page view
  //   });

  //   // Clean-up the event
  //   return () => {
  //     gantt.detachEvent(doubleClick);
  //   };
  // });

  // useInterval(() => {
  //     gantt.eachTask((task) => {
  //         console.log(`${task.id}`);
  //     });
  // }, delay);

  // Trigger gantt to re-render only
  // when state/props changes (React.memo)
  // Keep it to the last Event
  useEffect(() => {
    gantt.render();
  });

  console.log('GanttChart rendered');
  return (
    <React.Fragment>
      {/* <div id='gantt' ref={(i) => gContainer = i} /> /> */}
      <div id="gantt" /> />
    </React.Fragment>
  );
});

export default GanttChart;
