import moment from 'moment';

export class Match {
    constructor(
        private homeTeam: string,
        private awayTeam: string,
        private date: moment.Moment,
        private hour: moment.Moment,
        private channel: string
    ) {}

    public getHomeTeam(): string { return this.homeTeam }

    public getAwayTeam(): string { return this.awayTeam }

    public getDate(): moment.Moment { return this.date }

    public getHour(): moment.Moment { return this.hour }

    public getChannel(): string { return this.channel }
}