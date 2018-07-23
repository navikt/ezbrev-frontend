import React from 'react';
import InspectionTableItem from '~/components/inspection/partials/InspectionTableItem';
import { Button, Col } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Builder, parseString } from 'xml2js';
import Highlight from 'react-highlight';

export default class InspectionDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false
        };
    }

    xmlToString = xml => {
        const xmlBuilder = new Builder({
            renderOpts: {
                pretty: true,
                indent: '    ',
                newline: '\n'
            },
            headless: false
        });
        let xmlString = '';
        parseString(xml, (err, result) => {
            if (!err && result) {
                xmlString = xmlBuilder.buildObject(result);
            }
        });
        return xmlString;
    };

    setHeader = (title, id, time, mal, xml) => {
        if (this.props.showXML) {
            this.setState({ isShown: !this.state.isShown });
            return (
                <div>
                    <Col sm={3}>{title + id}</Col>
                    <Col sm={3}>{time}</Col>
                    <Col sm={2}>{mal}</Col>
                    <Col sm={2}>
                        <CopyToClipboard text={xml}>
                            <Button>Kopier til clipboard</Button>
                        </CopyToClipboard>
                    </Col>
                </div>
            );
        } else {
            return (
                <div>
                    <Col sm={3}>{title + id}</Col>
                    <Col sm={3}>{time}</Col>
                    <Col sm={2}>{mal}</Col>
                    <Col sm={2}>
                        <CopyToClipboard text={xml}>
                            <Button>Kopier til clipboard</Button>
                        </CopyToClipboard>
                    </Col>
                    <Col sm={2}>
                        <Button
                            onClick={() =>
                                this.setState({ isShown: !this.state.isShown })
                            }
                        >
                            Toggle
                        </Button>
                    </Col>
                </div>
            );
        }
    };

    toggle = () => {
        this.setState({ isShown: !this.state.isShown });
    };

    render() {
        const document = this.props.document;
        return (
            <InspectionTableItem
                key={document.dokumentInfoId}
                header={this.setHeader(
                    'DokumentInfoId ',
                    document.dokumentInfoId,
                    document.time,
                    document.brevmal,
                    document.xml
                )}
                data={
                    this.state.isShown ? (
                        <Highlight className="xml">
                            {this.xmlToString(document.xml)}
                        </Highlight>
                    ) : (
                        <div />
                    )
                }
            />
        );
    }
}
