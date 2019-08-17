import "reflect-metadata";
import {assert as assert} from 'chai';
import { DBTable } from '../src';
import Const from '../src/const';

describe('DbTable', function () 
{
    it('Default usage', function () 
    {
        @DBTable()
        class Entity {};

        let metadata = Reflect.getMetadata(Const.DBTable, new Entity());
        
        assert.equal(metadata, 'Entity');
    });

    it('With a custom table name.', function () 
    {
        @DBTable({name:'custom-name'})
        class Entity {};

        let metadata = Reflect.getMetadata(Const.DBTable, new Entity());
        let prefixMetadata = Reflect.getMetadata(Const.DataPrefix, new Entity());
        
        assert.equal(metadata, 'custom-name');
        assert.equal(prefixMetadata, 'entity');
    });

    it('With a data prefix', function () 
    {
        @DBTable({dataPrefix:'prefix'})
        class Entity {};

        let metadata = Reflect.getMetadata(Const.DataPrefix, new Entity());
        
        assert.equal(metadata, 'prefix');
    });
});