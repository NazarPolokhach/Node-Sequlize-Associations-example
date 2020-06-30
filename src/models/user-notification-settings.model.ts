import { 
  AllowNull, 
  AutoIncrement, 
  Column, 
  DataType, 
  Model, 
  PrimaryKey, 
  Table, 
  Default, 
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';

import User from './user.model';

@Table({ modelName: 'user_notification_settings', timestamps: true, paranoid: true })
export default class UserNotificationSettings extends Model<UserNotificationSettings> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  messages: boolean;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  messages_from_mutal: boolean;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  mutal: boolean;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  featured: boolean;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  likes: boolean;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;
 
  @BelongsTo(() => User, 'userId')
  notifications: User;
}
