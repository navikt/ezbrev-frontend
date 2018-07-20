import React from 'react';
import XMLConverter from './XMLConverter.js'

class ConverterPage extends React.Component {
    render() {
        return (
            <main className="container-fluid pageSize">
                <h4>XML Converter</h4>
                <XMLConverter/>
            </main>
        );
    }
}

export default ConverterPage;
