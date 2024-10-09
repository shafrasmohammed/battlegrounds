import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlBtGDataSource} from '../datasources';
import {Ship, ShipRelations} from '../models';

export class ShipRepository extends DefaultCrudRepository<
  Ship,
  typeof Ship.prototype.id,
  ShipRelations
> {
  constructor(
    @inject('datasources.MySQLBtG') dataSource: MySqlBtGDataSource,
  ) {
    super(Ship, dataSource);
  }
}
