import {
    getParserStrategyByPath,
    getParserStrategyByAudioFormat,
} from './helper/parser-strategy.helper';
import { AudioFormat } from './interface/audio-format.enum';
import { AbstractParser } from './parser/abstract.parser';

function getByPath(filePath: string, audioFormat: AudioFormat) {
    let parser: AbstractParser = getParserStrategyByPath(filePath);
    return parser.getMetadataByPath(filePath);
}

function getByBuffer(buffer: Buffer, audioFormat: AudioFormat) {
    const parser: AbstractParser = getParserStrategyByAudioFormat(audioFormat);
    return parser.getMetadataByBuffer(buffer);
}

function getDescription(audioFormat: AudioFormat) {
    const parser: AbstractParser = getParserStrategyByAudioFormat(audioFormat);
    return parser.getMetadataDescription();
}

export const AudioMetadata = {
    getByPath,
    getByBuffer,
    getDescription,
};
