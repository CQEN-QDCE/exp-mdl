import { MdocDataElement } from "./mdoc-data-element";

export class MdocNamespace {
    constructor(public readonly namespace: string,
                public readonly dataElements: Map<string, MdocDataElement>) {

    }
}