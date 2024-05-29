import { CborDataItem } from "./cbor-data-item";

export interface CborConvertible {

  fromCborDataItem(dataItem: CborDataItem): object;

  toCborDataItem(): CborDataItem;
  
}