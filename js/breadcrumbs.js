document.addEventListener('DOMContentLoaded', function () {
    const breadcrumbContainer = document.getElementById('breadcrumbs');
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(part => part); // Remove empty parts
    const basePath = '/collection'; // Updated base path
    const homeName = 'essentials'; // Adjust this based on your home name

    let breadcrumbHTML = '<p><span><a href="/index.html">' + homeName + '</a></span> / ';

    pathParts.forEach((part, index) => {
        if (part === 'collection' && index === 0) {
            // Handle the collection link
            breadcrumbHTML += `<span><a href="${basePath}/guide">collection</a></span> / `;
        } else {
            const displayName = decodeURIComponent(part.replace(/-/g, ' '));
            const link = basePath + '/' + pathParts.slice(1, index + 1).join('/');

            if (index < pathParts.length - 1) {
                breadcrumbHTML += `<span><a href="${link}">${displayName}</a></span> / `;
            } else {
                breadcrumbHTML += `<span>${displayName}</span>`;
            }
        }
    });

    breadcrumbHTML += '</p>';
    breadcrumbContainer.innerHTML = breadcrumbHTML;
});
