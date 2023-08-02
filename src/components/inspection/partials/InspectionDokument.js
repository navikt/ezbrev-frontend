import React from 'react';
import InspectionTableItem from '~/components/inspection/partials/InspectionTableItem';
import { Builder, parseString } from 'xml2js';
import Highlight from 'react-highlight';
import { Button, CopyButton } from '@navikt/ds-react';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';

export default class InspectionDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: this.props.showXML,
        };
    }

    xmlToString = (xml) => {
        const xmlBuilder = new Builder({
            renderOpts: {
                pretty: true,
                indent: '    ',
                newline: '\n',
            },
            headless: false,
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
        return (
            <div className="flex-row center-vertically">
                <span>{title + id}</span>
                <span>{time}</span>
                <span>{mal}</span>
                <span>
                    <CopyButton copyText={xml} text={'Kopier til clipboard'} />
                </span>
                <span>
                    <Button
                        className="fill"
                        variant={'secondary'}
                        onClick={() =>
                            this.setState({ isShown: !this.state.isShown })
                        }
                    >
                        Toggle{' '}
                        {this.state.isShown ? (
                            <ChevronUpIcon title="a11y-title" />
                        ) : (
                            <ChevronDownIcon title="a11y-title" />
                        )}
                    </Button>
                </span>
            </div>
        );
    };

    toggle = () => {
        this.setState({ isShown: !this.state.isShown });
    };

    render() {
        const document = this.props.document;
        return (
            <InspectionTableItem
                className={'border'}
                key={document.dokumentInfoId}
                header={this.setHeader(
                    'DokumentInfoId ',
                    document.dokumentInfoId,
                    document.time,
                    document.brevmal,
                    document.xml,
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
