import { BadRequestException, Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './core/auth/auth.service';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}


  @UseGuards(AuthGuard('local'))
  @ApiOperation({
    summary: "Connexion d'un utilisateur en base de données",
  })
  @ApiOkResponse({
    description: 'Utilisateur connecté avec succès.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: "Erreur dans la connexion.",
    type: BadRequestException,
  })
  @Post('auth/login')
  async login(@Request() req, @Res({passthrough: true}) response: Response) {
    return this.authService.login(req.user, response);
  }
}
