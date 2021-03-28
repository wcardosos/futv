import { ICrawlerBrowserPlataformsExecutablePaths } from './ICrawlerBrowserPlataformsExecutablePaths';

export interface ICrawlerBrowserOptions {
    args: string[],
    executablePath: ICrawlerBrowserPlataformsExecutablePaths | any,
    headless: boolean
}