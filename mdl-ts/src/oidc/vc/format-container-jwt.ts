export class FormatContainerJwt {
    
    // @SerialName("alg")
    public readonly algorithms: string[] = [];
    
    constructor(initializer?: Partial<FormatContainerJwt>) {
        Object.assign(this, initializer);
    }
}