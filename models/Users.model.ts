import {
  Model,
  DataType,
  Table,
  Column,
  PrimaryKey,
  Default,
  Sequelize,
} from "sequelize-typescript";
import dbConnection from "../connection/db";
import { IUsers } from "../interfaces/Users.interface";

@Table({
  timestamps: true,
  tableName: "Users",
})
export class Users extends Model<IUsers> {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
  })
  ID!: bigint;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  FirstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  LastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  EmailAddress!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  Role!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Password!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  Status!: boolean;
}

async function seedUsers() {
  try {
    const existingUsers = await Users.findAll();
    if (existingUsers.length > 0) {
      console.log("Users already exist");
      return;
    }

    const users = [
      {
        ID: 1,
        FirstName: "Admin",
        LastName: "User",
        EmailAddress: "admin@buildhub.ph",
        Role: 6,
        Username: "admin",
        Password: "admin",
        Status: true,
      },
    ];

    await Users.bulkCreate(users);
    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

seedUsers();

dbConnection.addModels([Users]);

export default Users;
