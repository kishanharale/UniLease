const aiPopup = document.getElementById('ai-popup');
const tryAiBtn = document.getElementById('try-ai-btn');
const imageSearchBtn = document.getElementById('image-search-btn');
const imageUpload = document.getElementById('image-upload');
const textSearchBtn = document.getElementById('text-search-btn');
const textInput = document.getElementById('text-input');
const submitBtn = document.getElementById('submit-btn');

tryAiBtn.addEventListener('click', () => {
    aiPopup.style.display = 'flex';
});

imageSearchBtn.addEventListener('click', () => {
    imageUpload.click();
});

submitBtn.addEventListener('click', async () => {
    const file = imageUpload.files[0];
    const text = textInput.value;

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://127.0.0.1:8000/search/image', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        alert(JSON.stringify(result));
    } else if (text) {
        const response = await fetch('http://127.0.0.1:8000/search/text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: text })
        });

        const result = await response.json();
        alert(JSON.stringify(result));
    } else {
        alert('Please provide either an image or text for search.');
    }
});
