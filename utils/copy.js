export const COPY_TO_CLIPBOARD = (content) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = content;
    const plainText = tempElement.textContent;

    const textArea = document.createElement('textarea');
    textArea.value = plainText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}