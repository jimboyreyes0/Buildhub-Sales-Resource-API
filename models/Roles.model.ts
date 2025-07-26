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
import IRoles from "../interfaces/Roles.interface";
import Users from "./Users.model";

@Table({
  timestamps: true,
  tableName: "Roles",
})
export class Roles extends Model<IRoles> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  ID!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Name!: string;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  Status!: boolean;
}
async function seedEmployeeRoles() {
  try {
    const existingRoles = await Roles.findAll();
    if (existingRoles.length > 0) {
      console.log("Employee roles already exist");
      return;
    }

    const employeeRoles = [
      { ID: 1, Name: "Rank & File", Status: true },
      { ID: 2, Name: "Supervisor", Status: true },
      { ID: 3, Name: "Manager", Status: true },
      { ID: 4, Name: "Department Head", Status: true },
      { ID: 5, Name: "Executive", Status: true },
      { ID: 6, Name: "CEO", Status: true },
      { ID: 7, Name: "Contractor", Status: true },
      { ID: 8, Name: "Intern", Status: true },
      { ID: 9, Name: "Probationary", Status: false },
    ];

    await Roles.bulkCreate(employeeRoles);
    console.log("Employee roles seeded successfully");
  } catch (error) {
    console.error("Error seeding employee roles:", error);
  }
}
dbConnection.addModels([Roles]);

Users.belongsTo(Roles, {
  foreignKey: "Role",
  targetKey: "ID",
  as: "_Role",
});

Roles.hasMany(Users, {
  foreignKey: "Role",
  sourceKey: "ID",
  as: "Users",
});

seedEmployeeRoles();

export default Roles;
