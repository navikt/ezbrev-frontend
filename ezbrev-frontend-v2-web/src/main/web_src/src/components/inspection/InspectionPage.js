import React from 'react';
import InspectionSelection from "~/components/inspection/partials/InspectionSelection";
import InspectionTable from "~/components/inspection/partials/InspectionTable";

class InspectionPage extends React.Component {
    render() {
        return (
            <main className="container-fluid">
                <h4>XML Inspeksjon</h4>
                <InspectionSelection />
                <InspectionTable />
            </main>
        );
    }
}

export default InspectionPage;
