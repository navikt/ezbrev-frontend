import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './components/home/HomePage';
import RegressionPage from './components/regression/RegressionPage';
import InspectionPage from './components/inspection/InspectionPage';
import ConverterPage from './components/converter/ConverterPage';
import AuthenticatedComponent from './components/admin/AuthenticatedComponent';

export const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/regression" component={RegressionPage} />
        <Route path="/inspection" component={InspectionPage} />
        <Route path="/converter" component={ConverterPage} />
        <Route path="/admin" name="Admin" component={AuthenticatedComponent} />
    </Switch>
);
