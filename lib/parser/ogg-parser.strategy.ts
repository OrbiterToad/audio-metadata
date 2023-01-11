import * as fs from 'fs';
import { DataType, getDataFromBuffer } from '../helper/buffer.helper';
import { AudioFormat } from '../interface/audio-format.enum';
import { IDataBlock } from '../interface/data-block.interface';
import { AbstractParser } from './abstract.parser';

export class OggParserStrategy extends AbstractParser {
    // ogg data blocks
    private dataBlocks: IDataBlock[] = [
        {
            title: 'CapturePattern',
            offset: 0,
            length: 4,
            dataType: DataType.STRING,
            description: 'OggS',
        },
        {
            title: 'StreamStructureVersion',
            offset: 4,
            length: 1,
            dataType: DataType.BYTE,
            description: 'Version must always be 0',
        },
        {
            title: 'HeaderTypeFlag',
            offset: 5,
            length: 1,
            dataType: DataType.BYTE,
            description:
                '0x00 = continuation of the same stream, 0x01 = beginning of a new logical bitstream, 0x02 = end of a logical bitstream, 0x04 = beginning of a page of a bos, 0x08 = end of a page of a bos',
        },
        {
            title: 'AbsoluteGranulePosition',
            offset: 6,
            length: 8,
            dataType: DataType.BIG_ENDIAN,
            description: 'Absolute granule position',
        },
        {
            title: 'StreamSerialNumber',
            offset: 14,
            length: 4,
            dataType: DataType.LITTLE_ENDIAN,
            description: 'Serial number of the logical bitstream',
        },
        {
            title: 'PageSequenceNumber',
            offset: 18,
            length: 4,
            dataType: DataType.LITTLE_ENDIAN,
            description: 'Page sequence number',
        },
        {
            title: 'CRC32Checksum',
            offset: 22,
            length: 4,
            dataType: DataType.LITTLE_ENDIAN,
            description: 'CRC32 checksum',
        },
        {
            title: 'PageSegments',
            offset: 26,
            length: 1,
            dataType: DataType.BYTE,
            description: 'Number of segments in page',
        },
        {
            title: 'SegmentTable',
            offset: 27,
            length: 255,
            dataType: DataType.BIG_ENDIAN_32,
            description: 'Table of sizes of segments',
        },
    ];

    getMetadataByPath(filePath: string) {
        const buffer = fs.readFileSync(filePath);
        return this.getMetadataByBuffer(buffer);
    }

    getMetadataDescription() {
        const formatDescription = {
            audioFormat: AudioFormat.OGG,
        };

        this.dataBlocks.forEach((dataBlock: IDataBlock) => {
            formatDescription[dataBlock.title] = dataBlock.description;
        });

        return formatDescription;
    }

    getMetadataByBuffer(buffer: Buffer) {
        const result = {
            audioFormat: AudioFormat.OGG,
        };

        this.dataBlocks.forEach((dataBlock: IDataBlock) => {
            result[dataBlock.title] = getDataFromBuffer(buffer, dataBlock);
        });

        return result;
    }
}
