import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  // On récupère notre service users grâce à l’injection de dépendance
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Méthode pour gérer l'authentification
  // Permet de retourner un user si authentifié
  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      // On compare le mot de passe hashé avec celui fourni dans le formulaire de connexion
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {
        delete user.password;
        // // on retourne toutes les infos de l'utilisateur sauf le password
        // const { password, ...result } = user;
        return user;
      }
    } else throw new BadRequestException
  }

  async login(user: any, response: any) {
    const payload = { username: user.username };

    const access_token = await this.jwtService.signAsync(payload);
    response.cookie('jwt', access_token, {httpOnly: true, sameSite: false});
    return {
      'jwt': access_token
    }
  }

  async logout() {

  }
}
