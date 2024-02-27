import { CborDataItem2 } from "../data-element/cbor-data-item2";

export interface CborConvertable {

  fromCborDataItem(dataItem: CborDataItem2): object;

  toCborDataItem(): CborDataItem2;
  
}