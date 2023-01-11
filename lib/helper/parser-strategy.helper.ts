import { AudioFormat } from '../interface/audio-format.enum';
import { AbstractParser } from '../parser/abstract.parser';
import { Mp3ParserStrategy } from '../parser/mp3-parser.strategy';
import { OggParserStrategy } from '../parser/ogg-parser.strategy';
import { WavParserStrategy } from '../parser/wav-parser.strategy';

export function getParserStrategyByPath(filePath: string) {
    // split at each . and get the last part
    const extension = filePath.split('.').pop();

    switch (extension.toLowerCase()) {
        case 'ogg':
            return new OggParserStrategy();
        case 'mp3':
            return new Mp3ParserStrategy();
        case 'wav':
            return new WavParserStrategy();
        default:
            throw new Error(`File extension ${extension} is not supported`);
    }
}

export function getParserStrategyByAudioFormat(
    audioFormat: AudioFormat
): AbstractParser {
    switch (audioFormat) {
        case AudioFormat.OGG:
            return new OggParserStrategy();
        case AudioFormat.MP3:
            return new Mp3ParserStrategy();
        case AudioFormat.WAV:
            return new WavParserStrategy();
        default:
            throw new Error(`Audio format ${audioFormat} is not supported`);
    }
}
