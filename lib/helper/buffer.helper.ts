import { IDataBlock } from '../interface/data-block.interface';

export enum DataType {
    STRING,
    LITTLE_ENDIAN,
    LITTLE_ENDIAN_32,
    BIG_ENDIAN,
    BIG_ENDIAN_32,
    BYTE,
}

export function getDataFromBuffer(
    buffer: Buffer,
    dataBlock: IDataBlock
): string | number {
    const { offset, length, dataType } = dataBlock;
    switch (dataType) {
        case DataType.STRING:
            return buffer.toString('utf8', offset, offset + length);
        case DataType.LITTLE_ENDIAN:
            return buffer.readUInt16LE(offset);
        case DataType.LITTLE_ENDIAN_32:
            return buffer.readUInt32LE(offset);
        case DataType.BIG_ENDIAN:
            return buffer.readUInt16BE(offset);
        case DataType.BIG_ENDIAN_32:
            return buffer.readUInt32BE(offset);
        case DataType.BYTE:
            return buffer.readUInt8(offset);
        default:
            throw new Error('Unsupported data type');
    }
}
