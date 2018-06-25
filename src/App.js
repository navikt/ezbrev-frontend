import React from 'react';
import { Routes } from './routes';
import Header from './components/common/Header';

export const App = () => (
    <div className="container-fluid">
        <Header />
        <Routes />
    </div>
);
