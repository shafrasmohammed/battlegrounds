import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {strict: true},
  foreignKeys: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    fk_ship_playerId: {
      name: 'fk_ship_playerId',
      entity: 'player',
      entityKey: 'id',
      foreignKey: 'playerId',
    },
  },
})
export class Ship extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  isDestroyed: boolean;

  @property({
    type: 'number',
    required: true,
  })
  playerId: number;

  @property({
    type: 'number',
    required: true,
  })
  horizontalLoc: number;

  @property({
    type: 'number',
    required: true,
  })
  verticalLoc: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Ship>) {
    super(data);
  }
}

export interface ShipRelations {
  // describe navigational properties here
}

export type ShipWithRelations = Ship & ShipRelations;
