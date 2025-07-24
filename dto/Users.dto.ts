export interface CreateUserDTO {
    FirstName: string;
    LastName: string;
    EmailAddress: string;
    Role: number;
    Username: string;
    Password: string;
    Status: boolean;
}

export interface LoginDTO {
    Username: string;
    Password: string;
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {}