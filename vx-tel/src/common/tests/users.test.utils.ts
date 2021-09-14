import {User} from "../../users/entities/user.entity";
import {CreateUserDto} from "../../users/dto/create-user.dto";
import {UpdateUserDto} from "../../users/dto/update-user.dto";
const validUser1 = new User()
validUser1.id = 1;
validUser1.name = 'jhon';
validUser1.email = 'jhon@email.com';
validUser1.password= '123456'
const validUser2 = new User()
validUser2.id = 2;
validUser2.name = 'mark';
validUser2.email = 'mark@email.com';
validUser2.password= '123456'
const validUser3 = new User()
validUser3.id = 3;
validUser3.name = 'anna';
validUser3.email = 'anna@email.com';
validUser3.password= '123456'
const validUpdatedUser = new User();
validUpdatedUser.name = 'jhon1';
validUpdatedUser.email = 'jhon1@email.com'
validUpdatedUser.password = '123456'
export class usersTestUtils{
    static validUsers(): User[]{
        return [validUser1,validUser2,validUser3];
    }

    static validUser(): User{
        return validUser1;
    }

    static validCreateUserDTO(): CreateUserDto{
        const validCreateUserDTO = new CreateUserDto();
        validCreateUserDTO.name = 'jhon';
        validCreateUserDTO.email = 'jhon@email.com'
        validCreateUserDTO.password = '123456'
        return  validCreateUserDTO
    }
    static validUpdateUserDTO(): UpdateUserDto{
        const validUpdateUserDTO = new UpdateUserDto();
        validUpdateUserDTO["name"] = 'jhon1';
        validUpdateUserDTO.email = 'jhon1@email.com'
        validUpdateUserDTO.password = '123456'
        return  validUpdateUserDTO
    }

    static validUpdatedUser(): User {
        return validUpdatedUser
    }
}