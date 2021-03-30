import { MatchDate } from '../tools/MatchDate';

export enum Channel {
    BAND = "Band",
    BANDSPORTS = "BandSports",
    ESPN = "ESPN",
    ESPN_BRASIL = "ESPN Brasil",
    ESPN2 = "ESPN 2",
    FOX_SPORTS = "Fox Sports",
    FOX_SPORTS2 = "Fox Sports 2",
    PREMIERE = "Premiere",
    SPORTV = "SporTV",
    SPORTV2 = "SporTV 2",
    SPORTV3 = "SporTV 3",
    TNT_SPORTS = "TNT Sports"
}
export class Match {
    constructor(
        private homeTeam: string,
        private awayTeam: string,
        private date: MatchDate,
        private channel: Channel
    ) {}

    public getHomeTeam(): string { return this.homeTeam }

    public getAwayTeam(): string { return this.awayTeam }

    public getHour(): string { return this.date.getMatchHour() }

    public getDay(): string { return this.date.getMatchDay() }

    public getChannel(): Channel { return this.channel }

    public getWeek(): number { return this.date.getWeek() }
}