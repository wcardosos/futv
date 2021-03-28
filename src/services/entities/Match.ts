import { MatchDate } from '../tools/MatchDate';
export class Match {
    constructor(
        private homeTeam: string,
        private awayTeam: string,
        private date: MatchDate,
        private channel: string
    ) {}

    public getHomeTeam(): string { return this.homeTeam }

    public getAwayTeam(): string { return this.awayTeam }

    public getDate(): MatchDate { return this.date }

    public getChannel(): string { return this.channel }
}