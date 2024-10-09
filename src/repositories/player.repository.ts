import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlBtGDataSource} from '../datasources';
import {Player, PlayerRelations} from '../models';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.id,
  PlayerRelations
> {
  constructor(
    @inject('datasources.MySQLBtG') dataSource: MySqlBtGDataSource,
  ) {
    super(Player, dataSource);
  }
}
