import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteResult,
} from 'typeorm';
import conn from '../conn'

@Entity('example')
export default class Example {

  @PrimaryGeneratedColumn('uuid', { name: 'id_example' })
  public id: string;

  @Column({ name: 'ftext', nullable: false, unique: true })
  public ftext: string;

  @Column({ name: 'fbyte', type: 'bytea', nullable: false })
  public fbyte: Buffer;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  public updatedAt: Date;

  public save(): Promise<Example> {
    return conn.getDefault().manager.save<Example>(this)
  }

  public static deleteByFText(ftext: string): Promise<DeleteResult> {
    return Example.delete('ftext', ftext)
  }

  public static deleteById(id: string): Promise<DeleteResult> {
    return Example.delete('id_example', id)
  }

  public static getByFText(ftext: string): Promise<Example | undefined> {
    return conn.getDefault().manager.findOne(Example, {
      where: { ftext },
    })
  }

  public static getById(id: string): Promise<Example | undefined> {
    return conn.getDefault().manager.findOne(Example, {
      where: { id },
    })
  }

  private static delete(fieldName: string, val: string): Promise<DeleteResult> {
    return conn.getDefault().createQueryBuilder()
      .delete()
      .from(Example, 'example')
      .where(`example.${fieldName} = :val`, { val })
      .returning('id_example')
      .execute()
  }
}
