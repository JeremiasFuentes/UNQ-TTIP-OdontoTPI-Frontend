
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('Mgo+DSMBaFt/QHNqVVhkW1pFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF9iSH9Sd0ZgWn9ddHFdQw==;Mgo+DSMBPh8sVXJ0S0V+XE9AcVRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3xSd0RiWHxdc3RWQmdfVA==;ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0RiWH5dc3dVRWRUVkE=;NzU4OTIwQDMyMzAyZTMzMmUzMEo1WGo1eFdJeDFmVW9iUHV5bTJxNlUzclhwWDQ3SlgzdHZxd3pSUTRsRXM9;NzU4OTIxQDMyMzAyZTMzMmUzMGZhZm9pR0lpdnc0NTVmZlBieEVRMjJtcEd1eUVqZ2ErTUc4RjNNZTJIS2M9;NRAiBiAaIQQuGjN/V0Z+X09EaFtFVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdERiWH5fc3dWRmNZV0dz;NzU4OTIzQDMyMzAyZTMzMmUzMGpFakhFWWs0c3RmNjJia1FyazBiT2puUi81L3l5dTA2dHpYUHlsanZmRWc9;NzU4OTI0QDMyMzAyZTMzMmUzMFNOenphTGVzSEpJbzBrRU9KNXZ0bWQzTVV3d1FwWlBUZnNsRzRnRGUza0k9;Mgo+DSMBMAY9C3t2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0RiWH5dc3dVRWZYUUE=;NzU4OTI2QDMyMzAyZTMzMmUzMGRqM25ydWVTM0VVSUZFZmY3OWFKRWRIT1NvWTc5cE0weE9OS0FYVzREY1E9;NzU4OTI3QDMyMzAyZTMzMmUzMEFVWVZPcGh2WlNTdTgzZFlwV1JnY21zZHh5M2c3WGFaMDdqTXlGbUE1T2M9;NzU4OTI4QDMyMzAyZTMzMmUzMGpFakhFWWs0c3RmNjJia1FyazBiT2puUi81L3l5dTA2dHpYUHlsanZmRWc9');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
