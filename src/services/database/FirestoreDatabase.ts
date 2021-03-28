import firebase from 'firebase/app';
import config from './config';
import { IBaseDatabase } from './IBaseDatabase';
import "firebase/firestore";

export class FirestoreDatabase implements IBaseDatabase {
    private connection: firebase.firestore.Firestore | null;
    
    public getConnection(): firebase.firestore.Firestore {
        if (!firebase.apps.length) {
            firebase.initializeApp(config['firebase']);
        }
        if(!this.connection) {
            this.connection = firebase.firestore();
        }

        return this.connection;
    }

    public async destroyConnection(): Promise<void> {
        if(this.connection) {
            await firebase.app().delete();
            await this.connection.terminate();
            this.connection = null;
        }
    }
}
