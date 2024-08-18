

export interface UsuarioUpdate{
    nombre?:string;
    email?:string;
}

export interface UsuarioUpdateError{
    nombreExiste:boolean;
    emailExiste:boolean;
    passwordIncorrecta:boolean;
}