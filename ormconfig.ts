import { Participant } from "src/participants/entities/participant.entity";
import { User } from "src/users/entities/user.entity";
import { Winner } from "src/winners/entities/winner.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config:PostgresConnectionOptions ={
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'caprice',
    entities: [Participant,User, Winner], // Spécifiez les entités de votre application
    synchronize: true, // Activez la synchronisation automatique des schémas (uniquement pour le développement)
    migrationsRun:false,
}
export default config;