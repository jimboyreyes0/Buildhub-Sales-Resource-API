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
import IApprovals from "../interfaces/Approvals.interface";
import Tickets from "./Tickets.model";
import Users from "./Users.model";

@Table({
  timestamps: true,
  tableName: "Approvals",
})
export class Approvals extends Model<IApprovals> {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
  })
  ID!: bigint;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  TicketID!: bigint;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  UserID!: bigint;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  ApprovalStatus!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ApprovalType!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  Comment!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  Status!: boolean;
}

dbConnection.addModels([Approvals]);

Approvals.belongsTo(Tickets, {
  foreignKey: "TicketID",
  targetKey: "ID",
  as: "_Approvals",
});
Approvals.belongsTo(Users, {
  foreignKey: "UserID",
  targetKey: "ID",
  as: "_Approver",
});
Tickets.hasMany(Approvals, {
  foreignKey: "TicketID",
  as: "_Approvals",
});

export default Approvals;
