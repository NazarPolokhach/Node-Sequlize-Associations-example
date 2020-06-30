import { 
  AllowNull, 
  AutoIncrement, 
  Column, 
  DataType, 
  Model, 
  PrimaryKey, 
  Table, 
  Default,
  HasOne,
  BelongsTo
} from 'sequelize-typescript';

import UserNotificationSettings from './user-notification-settings.model';
import UserDetails from './user-details.model';

@Table({ modelName: 'user', timestamps: true, paranoid: true })
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING(45))
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING(45))
  name: string;

  @AllowNull(true)
  @Default(null)
  @Column(DataType.STRING(45))
  phone: string;

  @AllowNull(false)
  @Column(DataType.STRING(45))
  city: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  password: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  image: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  birthday: string;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  sex: number;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  is_online: boolean;


  @HasOne(() => UserNotificationSettings,{  
    foreignKey: 'userId'
  })
  user_notification_setting: UserNotificationSettings;

  @HasOne(() => UserDetails, { 
    foreignKey: 'userId'
  })
  user_detail: UserDetails

}
