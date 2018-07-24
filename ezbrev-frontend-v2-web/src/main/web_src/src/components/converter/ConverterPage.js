import React from 'react';
import XMLConverter from './XMLConverter.js'

class ConverterPage extends React.Component {
    render() {
        return (
            <main className="container-fluid pageSize">
                <XMLConverter/>
            </main>
        );
    }
}

export default ConverterPage;
