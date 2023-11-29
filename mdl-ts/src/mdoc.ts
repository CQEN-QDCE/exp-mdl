import { DataElement } from "./data-element/data-element";
import { MapElement } from "./data-element/map-element";
import { StringElement } from "./data-element/string-element";
import { DeviceSigned } from "./mdoc/device-signed";
import { IssuerSigned } from "./mdoc/issuer-signed";

export class MDoc {

    docType: StringElement;
    issuerSigned: IssuerSigned;
    deviceSigned: DeviceSigned;
    errors: DataElement;

    private _mso: MSO;

    constructor(docType: StringElement, 
        issuerSigned: IssuerSigned, 
        deviceSigned: DeviceSigned, 
        errors: MapElement | null = null) {
        this.docType = docType;
        this.issuerSigned = issuerSigned;
        this.deviceSigned = deviceSigned;
        this.errors = errors;
    }

    get mso(): MSO {
        return this._mso;
    }
}