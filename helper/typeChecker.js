export function isImage(imgDataUrl){
    return imgDataUrl && imgDataUrl.startsWith('data:image/');
}