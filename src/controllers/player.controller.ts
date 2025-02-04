import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Player} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerController {
  constructor(
    @repository(PlayerRepository)
    public playerRepository: PlayerRepository,
  ) {}

  @post('/players')
  @response(200, {
    description: 'Player model instance',
    content: {'application/json': {schema: getModelSchemaRef(Player)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {
            title: 'NewPlayer',
            exclude: ['id'],
          }),
        },
      },
    })
    player: Omit<Player, 'id'>,
  ): Promise<Player> {
    return this.playerRepository.create(player);
  }

  @get('/players/count')
  @response(200, {
    description: 'Player model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Player) where?: Where<Player>): Promise<Count> {
    return this.playerRepository.count(where);
  }

  @get('/players')
  @response(200, {
    description: 'Array of Player model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Player, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Player) filter?: Filter<Player>): Promise<Player[]> {
    return this.playerRepository.find(filter);
  }

  @patch('/players')
  @response(200, {
    description: 'Player PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Player,
    @param.where(Player) where?: Where<Player>,
  ): Promise<Count> {
    return this.playerRepository.updateAll(player, where);
  }

  @get('/players/{id}')
  @response(200, {
    description: 'Player model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Player, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Player, {exclude: 'where'})
    filter?: FilterExcludingWhere<Player>,
  ): Promise<Player> {
    return this.playerRepository.findById(id, filter);
  }

  @patch('/players/{id}')
  @response(204, {
    description: 'Player PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Player,
  ): Promise<void> {
    await this.playerRepository.updateById(id, player);
  }

  @put('/players/{id}')
  @response(204, {
    description: 'Player PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() player: Player,
  ): Promise<void> {
    await this.playerRepository.replaceById(id, player);
  }

  @del('/players/{id}')
  @response(204, {
    description: 'Player DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.playerRepository.deleteById(id);
  }
}
