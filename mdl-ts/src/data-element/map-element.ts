import { DataElement } from "./data-element";
import { MapKey } from "./map-key";

export class MapElement extends DataElement<Map<MapKey, DataElement>> {

    constructor(value: Map<MapKey, DataElement>) {
        super(value, new DataElement.Attribute(DataElement.Type.map));
    }
}