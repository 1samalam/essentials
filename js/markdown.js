async function displayMarkdown() {
    try {
        // Get the current HTML file name without the extension
        const htmlFileName = window.location.pathname.split('/').pop();
        // Remove any trailing slash if present
        const cleanHtmlFileName = htmlFileName.replace(/\/$/, '');
        // Construct the corresponding Markdown file name
        const markdownFileName = cleanHtmlFileName.endsWith('.html') ?
            cleanHtmlFileName.replace('.html', '.md') :
            `${cleanHtmlFileName}.md`;
        // Construct the full path to the Markdown file
        const markdownFilePath = `/markdown/${markdownFileName}`;

        console.log(`Fetching ${markdownFilePath}`);
        const response = await fetch(markdownFilePath);

        if (!response.ok) {
            throw new Error(`Failed to fetch Markdown file (${response.status} ${response.statusText})`);
        }

        const text = await response.text();
        console.log('Markdown content fetched:', text);

        const htmlContent = marked.parse(text);
        console.log('HTML content:', htmlContent);

        document.getElementById('markdown-content').innerHTML = htmlContent;
        console.log('Markdown content displayed successfully');
        
        // Parse emojis with Twemoji after content is loaded
        twemoji.parse(document.getElementById('markdown-content'));

    } catch (error) {
        console.error('Error fetching or parsing markdown file:', error);
    }
}

document.addEventListener('DOMContentLoaded', displayMarkdown);
