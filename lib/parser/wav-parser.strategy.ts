import * as fs from 'fs';
import { DataType, getDataFromBuffer } from '../helper/buffer.helper';
import { AudioFormat } from '../interface/audio-format.enum';
import { IDataBlock } from '../interface/data-block.interface';
import { AbstractParser } from './abstract.parser';

export class WavParserStrategy extends AbstractParser {
    private dataBlocks: IDataBlock[] = [
        {
            title: 'RIFF',
            offset: 0,
            length: 4,
            dataType: DataType.STRING,
            description: 'RIFF header ',
        },
        {
            title: 'ChunkSize',
            offset: 4,
            length: 4,
            dataType: DataType.LITTLE_ENDIAN,
            description:
                'This is the size of the rest of the chunk following this number',
        },
        {
            title: 'Format',
            offset: 8,
            length: 4,
            dataType: DataType.STRING,
            description: 'Contains the letters "WAVE"',
        },
        {
            title: 'Subchunk1ID',
            offset: 12,
            length: 4,
            dataType: DataType.STRING,
            description: 'Contains the letters "fmt "',
        },
        {
            title: 'Subchunk1Size',
            offset: 16,
            length: 4,
            dataType: DataType.LITTLE_ENDIAN,
            description:
                '16 for PCM.  This is the size of the rest of the Subchunk which follows this number',
        },
        {
            title: 'AudioFormat',
            offset: 20,
            length: 2,
            dataType: DataType.LITTLE_ENDIAN,
            description:
                'PCM = 1, Values other than 1 indicate some form of compression',
        },
        {
            title: 'NumChannels',
            offset: 22,
            length: 2,
            dataType: DataType.LITTLE_ENDIAN,
            description: 'Mono = 1, Stereo = 2, etc.',
        },
        {
            title: 'SampleRate',
            offset: 24,
            length: 4,
            dataType: DataType.LITTLE_ENDIAN,
            description: 'Samples per second taken',
        },
        {
            title: 'ByteRate',
            offset: 28,
            length: 4,
            dataType: DataType.LITTLE_ENDIAN,
            description: 'SampleRate * NumChannels * BitsPerSample/8',
        },
        {
            title: 'BlockAlign',
            offset: 32,
            length: 2,
            dataType: DataType.LITTLE_ENDIAN,
            description: 'NumChannels * BitsPerSample/8',
        },
        {
            title: 'BitsPerSample',
            offset: 34,
            length: 2,
            dataType: DataType.LITTLE_ENDIAN,
            description:
                'The number of bytes for one sample including all channels',
        },
        {
            title: 'Subchunk2ID',
            offset: 36,
            length: 4,
            dataType: DataType.STRING,
            description: 'Contains the letters "data"',
        },
        {
            title: 'Subchunk2Size',
            offset: 40,
            length: 4,
            dataType: DataType.LITTLE_ENDIAN,
            description: 'This is the number of bytes in the data',
        },
    ];

    public getMetadataByPath(filePath: string) {
        const buffer = fs.readFileSync(filePath);
        return this.getMetadataByBuffer(buffer);
    }

    public getMetadataDescription() {
        const formatDescription = {
            audioFormat: AudioFormat.WAV,
        };

        this.dataBlocks.forEach((dataBlock: IDataBlock) => {
            formatDescription[dataBlock.title] = dataBlock.description;
        });

        return formatDescription;
    }

    public getMetadataByBuffer(buffer: Buffer) {
        const wavFormat = {
            audioFormat: AudioFormat.WAV,
        };

        this.dataBlocks.forEach((dataBlock: IDataBlock) => {
            wavFormat[dataBlock.title] = getDataFromBuffer(buffer, dataBlock);
        });

        return wavFormat;
    }
}
