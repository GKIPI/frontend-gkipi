export function convertImageToBase64(fileInput, callback) {
    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Image = event.target.result;
            callback(base64Image);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}
