import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

    private users = [
        {
            id: 1,
            name: 'Alejandro',
            lastname: 'Manzano',
            email: 'ariel.manzano@udla.edu.ec',
            password : bcrypt.hashSync('123456',10),
        }
    ];
    getUsers(){
        return this.users.map(({password, ...user}) => user);
    }

    async createUser(name: string, lastname: string, email: string, password : string){
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: this.users.length +1,
            name: name,
            lastname: lastname,
            email: email,
            password : hashedPassword
        };
        this.users.push(newUser);

        return {
            id : newUser.id,
            name : newUser.name,
            lastname : newUser.lastname,
            email : newUser.email
        }
    }
    
    updateUser(
        id : string,
        name : string,
        lastname : string,
        email : string,
        password : string
    ){
        const user = this.users.find(user => user.id === Number(id));
        
        if(!user){
            return 'Usuario no encontrado'
        }

        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.password = password;

        return user;
    }

    deletUser(id : string){
        this.users = this.users.filter(user => user.id !== Number(id));
        return this.users;
    }

    findByEmail(email: string){
        return this.users.find(user => user.email === email);
    }
}
