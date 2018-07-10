import React from 'react';
import { Button } from 'react-bootstrap';
import { Space } from '../common/Scaffolding';

class XMLConverter extends React.Component {
    render() {
        return (

            <section>
                <br/>
                <div>
                    <Button>Konverter XML</Button>
                </div>
                <br/>
                <div className="inline-div">
                    <p> <b> XML Input </b></p>
                    <textarea cols="70" rows="40" classname="inline-txtarea">Hei</textarea>
                </div>
                <Space/>
                <div className="inline-div">
                    <p><b> XML Output</b> </p>
                    <textarea cols="70" rows="40" className="inline-txtarea"> Hei</textarea>
                </div>
            </section>
        );
    }
}

export default XMLConverter;