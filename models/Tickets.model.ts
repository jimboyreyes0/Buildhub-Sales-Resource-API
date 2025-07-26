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
import ITickets from "../interfaces/Tickets.interface";
import Users from "./Users.model";

@Table({
  timestamps: true,
  tableName: "Tickets",
})
export class Tickets extends Model<ITickets> {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true
  })
  ID!: bigint;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  Title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  Description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Priority!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  ExpectedStartDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  ExpectedEndDate!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  LeadTime!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  ActualStartDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  ActualEndDate!: Date;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  Assignee!: bigint;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  Reporter!: bigint;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  TicketStatus!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  Status!: boolean;
}

dbConnection.addModels([Tickets]);

Tickets.belongsTo(Users, {
  foreignKey: "Assignee",
  targetKey: "ID",
  as: "_Assignee"
})

Tickets.belongsTo(Users, {
  foreignKey: "Reporter",
  targetKey: "ID",
  as: "_Reporter"
})

export default Tickets;
