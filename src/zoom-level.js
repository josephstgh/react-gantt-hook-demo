import { gantt } from 'dhtmlx-gantt';

export const setZoomConfig = (zoom) => {
  
    switch (zoom) {
      case 'hour':
        gantt.config.scale_unit = 'day';
        gantt.config.date_scale = '%d %M';
        gantt.config.scale_height = 60;
        gantt.config.min_column_width = 30;
        gantt.config.subscales = [
          {
            unit: 'hour',
            step: 1,
            date: '%H',
          },
        ];
        break;
      case 'day':
        gantt.config.scale_unit = 'day';
        gantt.config.step = 1;
        gantt.config.date_scale = '%d %M';
        gantt.config.subscales = [];
        gantt.config.scale_height = 60;
        gantt.templates.date_scale = null;
        gantt.config.min_column_width = 100;
        break;
      default: break;
    }
};
