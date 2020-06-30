import { 
  AllowNull, 
  AutoIncrement, 
  Column, 
  DataType, 
  Model, 
  PrimaryKey, 
  Table, 
  Default,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';

import User from './user.model';

@Table({ modelName: 'user_details', timestamps: true, paranoid: true })
export default class UserDetails extends Model<UserDetails> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  needs: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  activity_sphere: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  searching: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  can_provide: string;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(255))
  actual: string;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(255))
  skills: string;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(255))
  carrier: string;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(255))
  education: string;

  @ForeignKey(() => User)
  @Column
  userId: number;
 
  @BelongsTo(() => User, 'userId')
  details: User;
}
