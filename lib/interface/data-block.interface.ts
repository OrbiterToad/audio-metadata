import { DataType } from '../helper/buffer.helper';

export interface IDataBlock {
    title: string;
    offset: number;
    length: number;
    dataType: DataType;
    description: string;
}
