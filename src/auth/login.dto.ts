import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsEmail({}, {message : 'El Correo no es valido'})
    @IsNotEmpty({message : 'El Correo es Obligatorio'})
    email : string = '';

    @IsString({message: 'La contrasenia debe ser texto'})
    @IsNotEmpty({message: 'La contrasenia es Obligatoria'})
    password: string = '';
}