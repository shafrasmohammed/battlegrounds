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
import {Ship} from '../models';
import {ShipRepository} from '../repositories';

export class ShipController {
  constructor(
    @repository(ShipRepository)
    public shipRepository: ShipRepository,
  ) {}

  @post('/ships')
  @response(200, {
    description: 'Ship model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ship)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ship, {
            title: 'NewShip',
            exclude: ['id'],
          }),
        },
      },
    })
    ship: Omit<Ship, 'id'>,
  ): Promise<Ship> {
    return this.shipRepository.create(ship);
  }

  @get('/ships/count')
  @response(200, {
    description: 'Ship model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Ship) where?: Where<Ship>): Promise<Count> {
    return this.shipRepository.count(where);
  }

  @get('/ships')
  @response(200, {
    description: 'Array of Ship model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ship, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Ship) filter?: Filter<Ship>): Promise<Ship[]> {
    return this.shipRepository.find(filter);
  }

  @patch('/ships')
  @response(200, {
    description: 'Ship PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ship, {partial: true}),
        },
      },
    })
    ship: Ship,
    @param.where(Ship) where?: Where<Ship>,
  ): Promise<Count> {
    return this.shipRepository.updateAll(ship, where);
  }

  @get('/ships/{id}')
  @response(200, {
    description: 'Ship model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ship, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Ship, {exclude: 'where'}) filter?: FilterExcludingWhere<Ship>,
  ): Promise<Ship> {
    return this.shipRepository.findById(id, filter);
  }

  @patch('/ships/{id}')
  @response(204, {
    description: 'Ship PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ship, {partial: true}),
        },
      },
    })
    ship: Ship,
  ): Promise<void> {
    await this.shipRepository.updateById(id, ship);
  }

  @put('/ships/{id}')
  @response(204, {
    description: 'Ship PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ship: Ship,
  ): Promise<void> {
    await this.shipRepository.replaceById(id, ship);
  }

  @del('/ships/{id}')
  @response(204, {
    description: 'Ship DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.shipRepository.deleteById(id);
  }
}
