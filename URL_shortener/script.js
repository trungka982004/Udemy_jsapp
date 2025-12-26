const ACCESS_TOKEN = '43bf7e283839a024cfe54c6649ba0e04a129757a'; // Replace with your actual access token

async function shortenUrl() {
    const longUrl = document.getElementById('longURL').value.trim();
    console.log("Entered URL:", longUrl);
    
    if (!longUrl) {
        alert('Please enter a URL to shorten.');
        return;
    }

    const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';
    
    const headers = {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    };

    const data = {
        long_url: longUrl
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        document.getElementById('shortUrl').value = result.link;
    } catch (error) {
        alert('Failed to shorten URL. Please try again later.');
    }
}

function copyToClipboard() {
    const shortenUrlInput = document.getElementById('shortUrl');

    if (!shortenUrlInput.value) {
        alert('No short URL to copy.');
        return;
    }

    shortenUrlInput.select();
    document.execCommand('copy');
    alert('Short URL copied to clipboard!');
}