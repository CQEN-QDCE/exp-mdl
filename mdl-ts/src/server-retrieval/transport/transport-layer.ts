export interface TransportLayer {
    
    doGet(url: string): Promise<string>
    
    doPost(url: string, requestBody: any): Promise<string>

}