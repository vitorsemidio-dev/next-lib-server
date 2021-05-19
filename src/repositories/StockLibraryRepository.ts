/** @format */

import { EntityRepository, Repository } from 'typeorm';

import StockLibrary from '../database/entities/StockLibrary';

@EntityRepository(StockLibrary)
export default class StockLibraryRepository extends Repository<StockLibrary> {}
