export interface OpenId4VciPreAuthorizedCodeFlowConfig {
    preAuthorizedCode?: string
    userPinRequired?: boolean
}

export type OpenId4VciAuthorizationCodeFlowConfig = {
    issuerState?: string
}