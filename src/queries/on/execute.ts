import { IDynamoDbManager } from '../../interfaces/iDynamodbManager';
import { DynamoDbTransaction } from '../../managers/dynamodbTransaction';
import { Reexecutable } from '../Reexecutable';

export class Execute extends Reexecutable
{
    constructor(private manager:IDynamoDbManager, private type:{new(...args: any[])}, private id:string|number, private params?:{updateExpression:{set?:string[], remove?:string[], add?:string[], delete?:string[]}, conditionExpression?:string, expressionAttributeValues?:object, expressionAttributeNames?:object, versionCheck?:boolean}, private transaction?:DynamoDbTransaction)
    {
        super();
    }

    async execute(): Promise<void>
    {
        return await super.execute(async ()=>
        {
            return await this.manager.apply(this.type, this.id, this.params, this.transaction, this.transaction === undefined);
        });
    }
}