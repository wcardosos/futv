import puppeteer, { Page } from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';
import { ICrawlerBrowserOptions } from './ICrawlerBrowserOptions';
import { ICrawlerBrowserPlataformsExecutablePaths } from './ICrawlerBrowserPlataformsExecutablePaths';
import { ICrawlerProvider } from './ICrawlerProvider';

export class ChromePuppeteerProvider implements ICrawlerProvider {
    private page: Page | null;
    private platforms: ICrawlerBrowserPlataformsExecutablePaths
    private browserOptions: ICrawlerBrowserOptions;

    constructor() {
        this.platforms = {
            win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            linux: '/usr/bin/google-chrome',
            darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        };
    }

    public async setBrowserOptions(isDev: boolean): Promise<void> {
        if (isDev) {
            this.browserOptions = {
                args: [],
                executablePath: this.platforms[process.platform],
                headless: true
            }
        } else {
            this.browserOptions = {
                args: chrome.args,
                executablePath: await chrome.executablePath,
                headless: chrome.headless
            }
        }
    }

    public async setPage(): Promise<void> {
        if (!this.page) {
            const browser = await puppeteer.launch(this.browserOptions);
            
            this.page = await browser.newPage();
        }
    }

    public async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    public async extractInfo(callback: any): Promise<any> {
        const info = await this.page.evaluate(callback);

        return info;
    }
}