import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column('numeric',{
        default: 0
    })
    phone: number

    @Column()
    dateOfBirth: Date

    @Column()
    dateOfUpdate: Date

}




