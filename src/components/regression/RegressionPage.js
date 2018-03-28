import React from 'react';
import RegressionControl from "./partials/RegressionControl";

class RegressionPage extends React.Component {
    render() {
        return (
            <main className="container-fluid">
                <h4>Regresjonstest</h4>
                <RegressionControl/>
            </main>
        );
    }
}

export default RegressionPage;