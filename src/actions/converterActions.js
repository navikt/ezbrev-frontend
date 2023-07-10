import * as types from '~/actions/actionTypes';

export function setInputXML(inputXML) {
    return { type: types.SET_INPUT_XML, inputXML: inputXML };
}
export function setOutputXML(outputXML) {
    return { type: types.SET_OUTPUT_XML, outputXML: outputXML };
}
