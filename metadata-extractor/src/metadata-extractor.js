"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMetadata = void 0;
var https = require("https");
function extractMetadata(url) {
    return new Promise(function (resolve, reject) {
        https.get(url, function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk.toString();
            });
            res.on('end', function () {
                try {
                    var metadata = parseMetadata(data);
                    resolve(metadata);
                }
                catch (error) {
                    reject(error);
                }
            });
        }).on('error', function (error) {
            reject(error);
        });
    });
}
exports.extractMetadata = extractMetadata;
function parseMetadata(html) {
    var metadata = {};
    var metaTagsRegex = /<meta\s+([^>]+)>/gi;
    var match;
    while ((match = metaTagsRegex.exec(html)) !== null) {
        var tag = match[1];
        var nameMatch = tag.match(/name="([^"]+)"/i);
        var propertyMatch = tag.match(/property="([^"]+)"/i);
        var contentMatch = tag.match(/content="([^"]+)"/i);
        if (nameMatch && contentMatch) {
            var name_1 = nameMatch[1];
            var content = contentMatch[1];
            metadata[name_1] = content;
        }
        else if (propertyMatch && contentMatch) {
            var property = propertyMatch[1];
            var content = contentMatch[1];
            metadata[property] = content;
        }
    }
    return metadata;
}
