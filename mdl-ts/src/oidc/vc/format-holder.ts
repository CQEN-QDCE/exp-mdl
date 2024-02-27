import { FormatContainerJwt } from "./format-container-jwt";

export class FornatHolder {

        // @SerialName("jwt")
        public readonly jwt: FormatContainerJwt | null = null;

        // @SerialName("jwt_vp")
        public readonly jwtVp: FormatContainerJwt | null = null;

        // @SerialName("jwt_vc")
        public readonly jwtVc: FormatContainerJwt | null = null;
 
        // @SerialName("ldp")
        public readonly ldp: FormatContainerJwt | null = null;

        // @SerialName("ldp_vp")
        public readonly ldpVp: FormatContainerJwt | null = null;

        // @SerialName("ldp_vc")
        public readonly ldpVc: FormatContainerJwt | null = null;

        // @SerialName("mso_mdoc")
        public readonly msoMdoc: FormatContainerJwt | null = null;

        constructor(initializer?: Partial<FornatHolder>) {
            Object.assign(this, initializer);
        }

}