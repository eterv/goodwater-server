// deno-lint-ignore-file no-explicit-any
import { DataTypes, Model } from 'https://deno.land/x/denodb@v1.0.38/mod.ts'

export interface Contact {
  id: number
  name: string
  email: string
  tel?: string
  ip?: string
  dtCreated?: number
  'created_at'?: any
  'updated_at'?: any
}

export class ContactModel extends Model {
  static table = 'contacts'

  static timestamps = true

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    ip: DataTypes.STRING,
  }
}
