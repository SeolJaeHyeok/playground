import { IncomingMessage } from 'http';
import * as https from 'https';

export interface Metadata {
  [key: string]: string;
}

export function extractMetadata(url: string): Promise<Metadata | null> {
  return new Promise<Metadata | null>((resolve, reject) => {
    https.get(url, (res: IncomingMessage) => {
      let data: string = '';
      res.on('data', (chunk: string | Buffer) => {
        data += chunk.toString();
      });
      res.on('end', () => {
        try {
          const metadata: Metadata = parseMetadata(data);
          resolve(metadata);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error: Error) => {
      reject(error);
    });
  });
}

function parseMetadata(html: string): Metadata {
  const metadata: Metadata = {};
  const metaTagsRegex: RegExp = /<meta\s+([^>]+)>/gi;
  let match: RegExpExecArray | null;

  while ((match = metaTagsRegex.exec(html)) !== null) {
    const tag: string = match[1];
    const nameMatch: RegExpMatchArray | null = tag.match(/name="([^"]+)"/i);
    const propertyMatch: RegExpMatchArray | null = tag.match(/property="([^"]+)"/i);
    const contentMatch: RegExpMatchArray | null = tag.match(/content="([^"]+)"/i);

    if (nameMatch && contentMatch) {
      const name: string = nameMatch[1];
      const content: string = contentMatch[1];
      metadata[name] = content;
    } else if (propertyMatch && contentMatch) {
      const property: string = propertyMatch[1];
      const content: string = contentMatch[1];
      metadata[property] = content;
    }
  }

  return metadata;
}
