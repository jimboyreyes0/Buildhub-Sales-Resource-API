import { AutoMap } from "@automapper/classes";

export class RoleDTO {
    @AutoMap()
    ID!: bigint;
    Name!: string;
    Status!: boolean;
}