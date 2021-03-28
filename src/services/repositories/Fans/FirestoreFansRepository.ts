import { FirestoreDatabase } from '../../database/FirestoreDatabase';
import { IFansRepository } from './IFansRepository';
import { Fan } from '../../entities/Fan';

export class FirestoreFansRepository implements IFansRepository {
    private firestoreDb: FirestoreDatabase;
    
    constructor() {
        this.firestoreDb = new FirestoreDatabase();
    }

    public async findAll(): Promise<Fan[]> {
        const fansList = await this.firestoreDb
            .getConnection()
            .collection("fans")
            .get()


        const fans = []

        fansList.forEach( fan => {
            const name = fan.data().name;
            const email = fan.ref.id; // Como o email deve ser único, foi utilizado como referência para o documento
            
            fans.push(new Fan(
                name,
                email
            ));
        });

        return fans;
    }

    public async save(fan: Fan): Promise<void> {
        const email = fan.getEmail();
        const name = fan.getName();

        const fanExistsCheck = await this.firestoreDb
            .getConnection()
            .collection("fans")
            .doc(email)
            .get()

        if (fanExistsCheck.exists) return undefined;

        await this.firestoreDb
            .getConnection()
            .collection("fans")
            .doc(email)
            .set({ name })
    }

    public async delete(email: string): Promise<void> {
        const fanExistsCheck = await this.firestoreDb
            .getConnection()
            .collection("fans")
            .doc(email)
            .get()

        if (!fanExistsCheck.exists) return undefined;

        await this.firestoreDb
            .getConnection()
            .collection("fans")
            .doc(email)
            .delete()
    }
}