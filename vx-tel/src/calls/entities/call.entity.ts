import {
    AfterLoad, BeforeInsert, BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";


@Entity()
export class Call {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    origin_ddd: number

    @Column()
    destiny_ddd: number

    @Column()
    price_per_minute: number

    @Column()
    price_per_minute_decimal: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @BeforeUpdate() @BeforeInsert()
    decimalPriceUpdate() {
        this.price_per_minute_decimal = (this.price_per_minute / 100).toFixed(2);
    }

}
