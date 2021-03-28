export interface ICrawlerProvider {
    navigate(url: string): Promise<void>,
    extractInfo(callback: any): Promise<any>
}