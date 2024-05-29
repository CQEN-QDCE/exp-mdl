import { CredentialTypeRepository } from "../credential-type/credential-type-repository";
import { ServerRequest2 } from "./server-request2";
import { Jwt } from "../Jwt";
import { JsonStringifier } from "../../utils/json.stringifier";
import rs from "jsrsasign";

export class WebApiServer {
    
    constructor(private readonly privateKey: rs.KJUR.crypto.ECDSA,
                private readonly publicKey: rs.KJUR.crypto.ECDSA,
                private readonly certificateChain: rs.KJUR.asn1.x509.Certificate[] = [],
                private readonly credentialTypeRepository: CredentialTypeRepository) {
    }

    public async serverRetrieval(serverRequest: ServerRequest2): Promise<string> {
        //const serverRequestJson = JSON.parse(serverRequest);
        const docRequests = serverRequest['docRequests'];
        let filteredDocRequests: any[] = [];
        for (const docRequest of docRequests) {
            if (this.credentialTypeRepository.getMdocCredentialType(docRequest['docType'])) {
                filteredDocRequests.push(docRequest);
            }
        }
        let claimsSets: any[] = [];
        for (const docRequest of filteredDocRequests) {
            let newDocRequest: any = {};
            newDocRequest['docType'] = docRequest['docType'];
            const unknownElements = new Map<string, string[]>();
            this.getDataElementsPerNamespace(serverRequest['token'], docRequest, unknownElements);
            if (unknownElements.size > 0) {
                let errors: any = {};
                for(const [namespace, dataElements] of unknownElements) {
                    errors[namespace.toString()] = unknownElements.get(namespace);
                }
                newDocRequest['errors'] = errors;
            }
            claimsSets.push(docRequest);
        }
        
        filteredDocRequests = [];
        for (const docRequest of docRequests) {
            if (!this.credentialTypeRepository.getMdocCredentialType(docRequest['docType'])) {
                filteredDocRequests.push(docRequest);
            }
        }
        let unknownDocuments: any[] = [];
        for (const docRequest of filteredDocRequests) {
            unknownDocuments.push(docRequest['docType']);
        }
        let documents: any[] = [];
        for (const claimsSet of claimsSets) {
            let test = await Jwt.encode(claimsSet, this.privateKey, this.certificateChain);
            let verif = await Jwt.verify(test, this.publicKey);
            documents.push(await Jwt.encode(claimsSet, this.privateKey, this.certificateChain));
        }
        let response: any = {};
        response['version'] = '1.0';
        response['documents'] = documents;
        if (unknownDocuments.length > 0) {
            // TODO: check if this is correct
//            put("documentErrors", buildJsonArray {
 //               unknownDocuments.forEach {
   //                 add(buildJsonObject {
     //                   put(it, 0) // Error code 0 - Data not returned
       //             })
         //       }
           // })
        }
        return JsonStringifier.stringify(response);
    }

    private getDataElementsPerNamespace(token: string, docRequest: any, unknownElements: Map<string, string[]>): any {
        
        const docType = docRequest['docType'].toString();
        
        const mdocCredentialType = this.credentialTypeRepository.getMdocCredentialType(docType);
        
        if (!mdocCredentialType) throw 'Unknown doctype';

        const nameSpacedData = this.getNameSpacedDataByToken(token, docType);

        const namespaces = docRequest["nameSpaces"] as any;

        for (const [namespace, dataElements] of namespaces) {
          //  if (!mdocCredentialType.namespaces.has(namespace)) {
          //      unknownElements.set(namespace, dataElements);
          //  }
        }
    }

    private getNameSpacedDataByToken(token: string, docType: string): any {

    }
}