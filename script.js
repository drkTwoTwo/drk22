// Function to load content dynamically
function loadContent(section) {
    const contentWindow = document.getElementById('content-window');
    let fileName;

    switch (section) {
        case 'whoami':
            fileName = 'whoami.html';
            break;
        case 'writeups':
            fileName = 'writeup.html';
            break;
        case 'social':
            fileName = 'social.html';
            break;
        case 'working':
            fileName = 'working.html';
            break;
        case 'packer':
            fileName = 'writeup/packer.html'
            break;
        case 'packer1':
            fileName = 'writeup/packer1.html'
            break;
        case 'picker2':
            fileName = 'writeup/picker2.html';
            break;
        case 'picker3':
            fileName = 'writeup/picker3.html';
        default:
            // Default content
            contentWindow.innerHTML = `
                <h1>Welcome!</h1>
                <p>This is the default content.</p>
            `;
            return;
    }

    // Fetch and load the content
    fetch(fileName)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then((html) => {
            contentWindow.innerHTML = html; // Update the content window
        })
        .catch((error) => {
            console.error(`Error loading content from ${fileName}:`, error);
            contentWindow.innerHTML = `<p>Error loading content. Please try again later.</p>`;
        });
}

// Function to handle navigation and update the history state
function navigateTo(section) {
    // Push the new state into the history stack
    history.pushState({ section: section }, '', `#${section}`);
    loadContent(section); // Load the selected content
}

// Handle the back/forward button navigation
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.section) {
        loadContent(event.state.section); // Load the section stored in the history state
    } else {
        loadContent(null); // Load the default content
    }
});

// Handle the initial content load based on the URL hash
window.addEventListener('DOMContentLoaded', () => {
    const initialSection = location.hash ? location.hash.substring(1) : null;
    loadContent(initialSection); // Load content based on the initial hash
});


// Toggle visibility for the panels (left and right)
document.getElementById("toggle-btn").addEventListener("click", function() {
    const leftPanel = document.getElementById("left-panel");
    const rightPanel = document.getElementById("right-panel");

    leftPanel.classList.toggle("hidden");  // Toggle the left panel visibility
    rightPanel.classList.toggle("full-width");  // Toggle right panel to 100% width
});
