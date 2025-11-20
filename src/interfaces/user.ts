interface Role {
    id: number;
    name: "Docente" | "Estudiante";
}

export interface User {
    email: string;
    id: string;
    phone_number: string;
    profile: {
        id: number;
        identification_type: string;
        identification_number: string;
        name: string;
        last_name: string;
        role: Role;
        photo: {
            content_type: string;
            url: string;
            name: string;
            size: number;
        };
    }
    token: string;
}