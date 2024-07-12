async function displayMarkdown() {
    try {
        // Get the current HTML file name
        const htmlFileName = window.location.pathname.split('/').pop();

        const markdownFileName = htmlFileName.replace('.html', '.md');
        
        const markdownFilePath = `/markdown/${markdownFileName}`;

        console.log(`Fetching ${markdownFilePath}`);
        const response = await fetch(markdownFilePath);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const text = await response.text();
        console.log('Markdown content fetched:', text);

        const htmlContent = marked.parse(text);
        console.log('HTML content:', htmlContent);

        const markdownContentElement = document.getElementById('markdown-content');
        markdownContentElement.innerHTML = htmlContent;
        console.log('Markdown content displayed successfully');

        // Parse the content with Twemoji
        twemoji.parse(markdownContentElement);
        console.log('Twemoji parsing applied successfully');
        
    } catch (error) {
        console.error('Error fetching or parsing markdown file:', error);
    }
}

document.addEventListener('DOMContentLoaded', displayMarkdown);
