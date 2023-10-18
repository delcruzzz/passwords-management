import { Password } from 'src/passwords/entities/password.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Password, (password) => password.site, { nullable: false })
  passwords: Password[];
}
