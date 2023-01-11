// use generics
export abstract class AbstractParser {
    public abstract getMetadataByPath(filePath: string): any;

    public abstract getMetadataByBuffer(buffer: Buffer): any;

    public abstract getMetadataDescription(): any;
}
