import { Body, Controller, Get, Post, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { useContainer } from 'class-validator';


@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {

    

    constructor (private readonly usersService : UsersService){}
    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Post()
    createUser(@Body()body : {name: string, lastname: string, email:string, password : string}){
        console.log('Body:', body)
        return this.usersService.createUser(
            body.name, 
            body.lastname, 
            body.email,
            body.password
        );
    }

    

    @Put(':id') 
    updateUser(
        @Param('id') id: string,
        @Body() body: { name: string; lastname: string; email: string, password: string },
    ) {
        return this.usersService.updateUser(
            id,
            body.name,
            body.lastname,
            body.email,
            body.password
        );
    }

    @Delete(':id') 
    deletUser(@Param('id') id: string){
        return this.usersService.deletUser(id);
    }

    
    

}