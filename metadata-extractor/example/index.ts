import { extractMetadata, Metadata } from '../src/metadata-extractor'; 

const url: string = 'https://www.naver.com';

extractMetadata(url)
  .then((metadata: Metadata | null) => {
    if (metadata) {
      console.log('메타데이터 추출 결과 :', metadata);
    } else {
      console.log('메타데이터 추출 결과 없음.');
    }
  })
  .catch((error: Error) => {
    console.error('메타데이터 추출 실패', error);
  });