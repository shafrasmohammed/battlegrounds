// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {get, param, response} from '@loopback/rest';
import {PlayerRepository, ShipRepository} from '../repositories';

export class GameController {
  constructor(
    @repository(ShipRepository)
    public shipRepository: ShipRepository,
    @repository(PlayerRepository)
    public playerRepository: PlayerRepository,
  ) {}

  @get('/ships/{id}/{playerid}/{oppid}/{horid}/{vertid}')
  @response(200, {
    id: Number,
    playerid: Number,
    opponentid: Number,
    horizontalaxisid: Number,
    verticalaxisid: Number,
  })
  async updateById(
    @param.path.number('id') id: number,
    @param.path.number('playerid') playerid: number,
    @param.path.number('oppid') oppid: number,
    @param.path.number('horid') horid: number,
    @param.path.number('vertid') vertid: number,
  ): Promise<Number> {
    if (playerid !== oppid) {
      await this.shipRepository.find({
        where: {horizontalLoc: horid, verticalLoc: vertid},
      });
    }
    const destroyedShips = await this.shipRepository.count({
      where: {isDestroyed: true, playerid: playerid},
    });

    return destroyedShips.count;
  }
}
