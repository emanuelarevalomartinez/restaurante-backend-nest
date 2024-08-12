

export interface RegisterUserResponse {
    nombre: string;
    email: string;
    token: string;
  }

  export interface RegisterUserResponseExist{
    usuarioExiste:boolean;
    emailExiste:boolean;
  }