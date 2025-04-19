export interface Login {
    email: string,
    password: string
}

export interface LoginResponse {
    success: boolean,
    responseCode: number,
    message: string,
    data: {
        firstName: string,
        lastName: string,
        email: string,
        token: string
    }
}

export interface RegisterPayload {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface RegisterResponse {
    success: boolean,
    responseCode: number,
    message: string,
    data: {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        _id: string
    }
}

export interface ProjectsListResponse {
    success: boolean,
    responseCode: number,
    message: string,
    data: ProjectsList[]
}

export interface ProjectsList {
    _id: string,
    name: string,
    description: string,
    status: "active" | "inactive"
}

export interface AddProjectPayload {
    name: string,
    description: string,
    logo: string,
    startDate: string,
    endDate: string
}