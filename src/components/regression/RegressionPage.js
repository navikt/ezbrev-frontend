import React from 'react';
import RegressionControl from './partials/RegressionControl';
import RegressionTable from './partials/RegressionTable';
import SammenlignMedGodkjent from '~/components/common/SammenlignMedGodkjent';

export default function RegressionPage() {
    return (
        <main className="pageSize">
            <RegressionControl />
            <RegressionTable />
            <SammenlignMedGodkjent />
        </main>
    );
}
