import React from 'react';
import InspectionSelection from '~/components/inspection/partials/InspectionSelection';
import InspectionTable from '~/components/inspection/partials/InspectionTable';

export default function InspectionPage() {
    return (
        <main className="pageSize flex-wrappable">
            <InspectionSelection />
            <InspectionTable />
        </main>
    );
}
