import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import RegressionPage from "./components/regression/RegressionPage";
import InspectionPage from "./components/inspection/InspectionPage";
import ConverterPage from "./components/converter/ConverterPage";
import AdminPage from "./components/admin/AdminPage";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="regression" component={RegressionPage}/>
        <Route path="inspection" component={InspectionPage}/>
        <Route path="converter" component={ConverterPage} />
        <Route path="admin" component={AdminPage}/>
    </Route>
);

