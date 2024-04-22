"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_extractor_1 = require("../src/metadata-extractor");
var url = 'https://www.naver.com';
(0, metadata_extractor_1.extractMetadata)(url)
    .then(function (metadata) {
    if (metadata) {
        console.log('메타데이터 추출 결과 :', metadata);
    }
    else {
        console.log('메타데이터 추출 결과 없음.');
    }
})
    .catch(function (error) {
    console.error('메타데이터 추출 실패', error);
});
