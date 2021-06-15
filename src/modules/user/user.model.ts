import { DataTypes, Model } from 'https://deno.land/x/denodb@v1.0.38/mod.ts'

export interface User {
  id: number
  email: string
  pw?: string
  name: string
  tel?: string
  isAdmin: boolean
}

export interface JwtUser {
  id: User['id']
  email: User['email']
  name: User['name']
  isAdmin: User['isAdmin']

  iat: number
  ext: number
}

export class UserModel extends Model {
  static table = 'users'

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: DataTypes.STRING,
    pw: DataTypes.STRING,
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }

  static defaults = {
    isAdmin: false,
  }
}
