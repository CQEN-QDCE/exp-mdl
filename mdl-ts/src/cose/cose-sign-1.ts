import { ByteStringElement } from "../data-element/byte-string-element";
import { DataElement } from "../data-element/data-element";
import { NullElement } from "../data-element/null-element";
import { COSESimpleBase } from "./cose-simple-base";

export class COSESign1 extends COSESimpleBase<COSESign1> {
   
    constructor(dataElements: DataElement[]) {
        super(dataElements);
    }

    detachPayload(): COSESign1 {
        return new COSESign1(this.replacePayload(new NullElement()));
    }

    attachPayload(payload: Buffer): COSESign1 {
        return new COSESign1(this.replacePayload(new ByteStringElement(payload)));
    }

}