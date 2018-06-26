import React from 'react';
import { Button } from 'react-bootstrap';
import { Space } from '../../common/Scaffolding';

class BrevdataControl extends React.Component {
    render() {
        const producing = false;
        return (
            <div className="container-fluid">
                <Button>Oppdater</Button>
                <Space />
                <Button>Lagre som ny</Button>
                <Space />
                <Button>Produser brev</Button>
                <Space />
                <Button>{producing ? 'Hent brev' : 'Rediger brev'}</Button>

                <Button className="pull-right">Godkjenn</Button>
                <Space />
                <Button className="pull-right brev-compare-btn">
                    Sammenlign med godkjent
                </Button>
            </div>
        );
    }
}

export default BrevdataControl;
