import * as fs from 'fs';
import { DataType, getDataFromBuffer } from '../helper/buffer.helper';
import { AudioFormat } from '../interface/audio-format.enum';
import { IDataBlock } from '../interface/data-block.interface';
import { AbstractParser } from './abstract.parser';

export class Mp3ParserStrategy extends AbstractParser {
    private dataBlocks: IDataBlock[] = [
        {
            title: 'ID3',
            offset: 0,
            length: 3,
            dataType: DataType.STRING,
            description: 'ID3 header',
        },
        {
            title: 'Version',
            offset: 3,
            length: 2,
            dataType: DataType.LITTLE_ENDIAN,
            description: 'ID3 version',
        },
        {
            title: 'Flags',
            offset: 5,
            length: 1,
            dataType: DataType.LITTLE_ENDIAN,
            description: 'ID3 flags',
        },
        {
            title: 'Size',
            offset: 6,
            length: 4,
            dataType: DataType.LITTLE_ENDIAN_32,
            description: 'ID3 size',
        },
        {
            title: 'FrameID',
            offset: 10,
            length: 4,
            dataType: DataType.STRING,
            description: 'Frame ID',
        },
        {
            title: 'FrameSize',
            offset: 14,
            length: 4,
            dataType: DataType.LITTLE_ENDIAN_32,
            description: 'Frame size',
        },
        {
            title: 'FrameFlags',
            offset: 18,
            length: 2,
            dataType: DataType.LITTLE_ENDIAN,
            description: 'Frame flags',
        },
        {
            title: 'Encoding',
            offset: 20,
            length: 1,
            dataType: DataType.LITTLE_ENDIAN,
            description: 'Encoding',
        },
        {
            title: 'Language',
            offset: 21,
            length: 3,
            dataType: DataType.STRING,
            description: 'Language',
        },
        {
            title: 'ShortDescription',
            offset: 24,
            length: 4,
            dataType: DataType.STRING,
            description: 'Short description',
        },
        {
            title: 'LongDescription',
            offset: 28,
            length: 4,
            dataType: DataType.STRING,
            description: 'Long description',
        },
    ];

    getMetadataByPath(filePath: string) {
        const buffer = fs.readFileSync(filePath);
        return this.getMetadataByBuffer(buffer);
    }

    getMetadataDescription() {
        const formatDescription = {
            audioFormat: AudioFormat.MP3,
        };

        this.dataBlocks.forEach((dataBlock: IDataBlock) => {
            formatDescription[dataBlock.title] = dataBlock.description;
        });

        return formatDescription;
    }

    public getMetadataByBuffer(buffer: Buffer) {
        const result = {
            audioFormat: AudioFormat.MP3,
        };

        this.dataBlocks.forEach((dataBlock: IDataBlock) => {
            result[dataBlock.title] = getDataFromBuffer(buffer, dataBlock);
        });
        return result;
    }
}
