# audio-metadata

### Description

This is a library for reading metadata from audio files. It supports the following formats:

* MP3 - `AudioFormat.MP3`
* OGG - `AudioFormat.OGG`
* WAV - `AudioFormat.WAV`

Future support is planned for:

* MP4
* FLAC
* AIFF
* WMA
* AAC

### Usage

##### Import

AudioMetadata and AudioFormat are the only classes you need to import.

```typescript
import {AudioMetadata, AudioFormat} from 'audio-metadata';
```

##### Get metadata description

This will return an object with the metadata description.

```typescript
AudioMetadata.getMetadataDescription(AudioFormat.MP3)
```

##### Get metadata by file path

If the file is stored locally, the metadata can be read by passing the file path and the format.

Format detection by file extension is not supported.

```typescript
AudioMetadata.getByPath('test.mp3', AudioFormat.MP3);
```

##### Get metadata by file buffer

If the file is stored in memory, the metadata can be read by passing the file buffer and the format.

```typescript
AudioMetadata.getByBuffer(buffer, AudioFormat.WAV);
```

### Notice

This library is still in development. It is not recommended to use it in production. Issues and pull requests are
welcome.
