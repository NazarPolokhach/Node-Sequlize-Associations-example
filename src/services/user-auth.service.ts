import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto, UserLoginDto, UserLoginStepOneDto } from '../dtos/user.dto';
import HttpException from '../exceptions/HttpException';

import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import { UserDetails } from '../interfaces/user-details.interface';

import userModel from '../models/user.model';
import userDetailsModel from '../models/user-details.model';
import userNotificationSettingsModel from '../models/user-notification-settings.model';

import { isEmptyObject } from '../utils/util';


class UserAuthService {
  public users = userModel;
  public usersDetails = userDetailsModel;
  public userNotificationSettings = userNotificationSettingsModel;

  public async signup(userData: CreateUserDto): Promise<{user: Object }> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not user");

    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const createUserData = await this.users.create(
      { 
        ...userData, 
        password: hashedPassword,
        user_notification_setting: {
          messages: true
        },
        user_detail: {...userData}
      }, {
        include: [
          {
            association: this.users.hasOne(userDetailsModel),
            include: [this.usersDetails.belongsTo(userModel)]
          }, 
          {
            association: this.users.hasOne(userNotificationSettingsModel),
            include: [this.userNotificationSettings.belongsTo(userModel)]
          },
        ],
      })

    return {
      user: createUserData
    };
  }
}

export default UserAuthService;
