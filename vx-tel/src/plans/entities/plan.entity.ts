import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Plan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    free_call_time: number

    @Column()
    name: string

    @Column()
    extra_minutes_addition: number

    @Column()
    purchase_cost: number

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
