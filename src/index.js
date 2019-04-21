import React from 'react';
import ReactDOM from 'react-dom';
import { AppStoreProvider } from './context/AppStoreContext';
import GanttTL from './GanttTL';
import './custom.css';

ReactDOM.render(<AppStoreProvider><GanttTL /></AppStoreProvider>, document.getElementById('root'));
