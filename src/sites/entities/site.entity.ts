import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sites' })
export class Site {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'name',
    unique: true,
    nullable: false,
  })
  name: string;
  @Column({
    type: 'text',
    name: 'image_url',
    nullable: true,
  })
  imageUrl: string;
}
