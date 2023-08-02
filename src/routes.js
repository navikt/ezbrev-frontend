import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from './components/home/HomePage';
import RegressionPage from './components/regression/RegressionPage';
import InspectionPage from './components/inspection/InspectionPage';
import ConverterPage from './components/converter/ConverterPage';
import AuthenticatedComponent from './components/admin/AuthenticatedComponent';

export const DeRuites = () => (
    <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/regression" element={<RegressionPage />} />
        <Route path="/inspection" element={<InspectionPage />} />
        <Route path="/converter" element={<ConverterPage />} />
        <Route
            path="/admin"
            name="Admin"
            element={<AuthenticatedComponent />}
        />
    </Routes>
);
