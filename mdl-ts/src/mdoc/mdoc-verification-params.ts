import { DeviceAuthentication } from "../mdoc-auth/device-authentication"
import { MobileDocumentRequest } from "../doc-request/mobile-document-request"
import { VerificationType } from "./verification-type.enum";

export class MDocVerificationParams {
    verificationTypes: VerificationType[] = [];
    issuerKeyID: string = null;
    deviceKeyID: string = null;
    ephemeralMacKey: ArrayBuffer = null;
    deviceAuthentication: DeviceAuthentication = null;
    mDocRequest: MobileDocumentRequest = null;
}