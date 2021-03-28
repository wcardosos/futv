import { DateTime } from 'luxon';

export class MatchDate {
    private hour: number;
    private minute: number;
    private day: number;
    private month: number;
    private week: number;
    
    constructor(date: DateTime) {
        this.hour = date.hour;
        this.minute = date.minute;
        this.day = date.day;
        this.month = date.month;
        this.week = date.weekNumber;
    }

    public getMatchHour(): string { return `${this.hour}:${this.minute}` }

    public getMatchDay(): string { return `${this.day}/${this.month}` }

    public getWeek(): number { return this.week }
}