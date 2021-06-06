import { FirestoreDatabase } from '../../database/FirestoreDatabase';
import { IMatchesRepository } from './IMatchesRepository';
import { Match } from '../../entities/Match';import { MatchDate } from '../../tools/MatchDate';
import { DateTime } from 'luxon';

export class FirestoreMatchesRepository implements IMatchesRepository {
    private firestoreDb: FirestoreDatabase;

    constructor() {
        this.firestoreDb = new FirestoreDatabase();
    }

    public async findAll(): Promise<Match[]> {
        const matchesList = await this.firestoreDb
            .getConnection()
            .collection("matches")
            .get()

        const matches = [];

        matchesList.forEach( match => {
            const id = match.ref.id
            const homeTeam = match.data().homeTeam;
            const awayTeam = match.data().awayTeam;
            const hour = match.data().hour;
            const day = match.data().day;
            const week = match.data().week
            const channel = match.data().channel;

            const hourMinuteArray = hour.split(":");
            const dayMonthArray = day.split("/");

            const dateTime = DateTime.fromObject({
                hour: hourMinuteArray[0],
                minute: hourMinuteArray[1],
                day: dayMonthArray[0],
                month: dayMonthArray[1],
                weekNumber: week
            })

            const date = new MatchDate(dateTime);

            matches.push(new Match(
                id,
                homeTeam,
                awayTeam,
                date,
                channel,
            ));
        });

        return matches;
    }

    public async save(matches: Match[]): Promise<void> {
        const batch = this.firestoreDb
            .getConnection()
            .batch();
        
        await Promise.all(matches.map( match => {
            const homeTeam = match.getHomeTeam();
            const awayTeam = match.getAwayTeam();
            const hour = match.getHour();
            const day = match.getDay();
            const channel = match.getChannel();
            const week = match.getWeek();

            return this.firestoreDb
                .getConnection()
                .collection("matches")
                .where("homeTeam", "==", homeTeam)
                .where("awayTeam", "==", awayTeam)
                .where("hour", "==", hour)
                .where("day", "==", day)
                .where("channel", "==", channel)
                .where("week", "==", week)
                .get()
                .then( document => {
                    console.log(document.empty)
                    return document.empty
                })
                .then(matchDontExist => {
                    console.log(`Valor: ${matchDontExist}`)
                    if (matchDontExist) {
                        const newMatch = {
                            homeTeam,
                            awayTeam,
                            hour,
                            day,
                            channel,
                            week
                        }
        
                        const newMatchRef = this.firestoreDb
                            .getConnection()
                            .collection("matches")
                            .doc();
        
                        batch.set(newMatchRef, newMatch)
                    }
                })
        }));

        await batch.commit();
    }

    public async deleteAll(): Promise<void> {
        const batch = this.firestoreDb.getConnection().batch();
        const lastWeek = DateTime.now().weekNumber - 1;
        const matchesToDelete = await this.firestoreDb
            .getConnection()
            .collection("matches")
            .where("week", "==", lastWeek)
            .get()

        matchesToDelete.forEach( match => {
            const matchReference = this.firestoreDb.getConnection()
                .collection("matches")
                .doc(match.ref.id)

            batch.delete(matchReference);
        })

        await batch.commit();
            
    
    }
}