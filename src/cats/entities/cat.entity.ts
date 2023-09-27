 import { 
     Column, 
     DeleteDateColumn, 
     Entity, 
     ManyToOne
 } from "typeorm"

 import { Breed } from "src/breeds/entities/breed.entity"

 @Entity()
 export class Cat {
     @Column({
         primary: true,
         generated: true 
     })
     id: number

     @Column()
     name: string

     @Column()
     age: number

     
     @DeleteDateColumn()
     deleteAt: Date

     @ManyToOne(() => Breed, (bread) => bread.id, {
         eager: true
     })
     breed: Breed
 }
