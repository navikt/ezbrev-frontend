export function getRegressionObjects(keys, brevdataList) {
    let regressionObjects = [];
    for (let i = 0; i < keys.length; i++) {
        if (brevdataList[keys[i]].length > 0) {
            brevdataList[keys[i]].forEach((brevdata) =>
                regressionObjects.push({
                    brevdataId: brevdata.brevdataId,
                    brevmal: keys[i],
                }),
            );
        }
    }
    return regressionObjects;
}
