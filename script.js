// Function to load content dynamically
function loadContent(section) {
    const contentWindow = document.getElementById('content-window');
    if (!contentWindow) {
        console.error('Error: #content-window not found');
        return;
    }

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
            fileName = 'writeup/packer.html';
            break;
        case 'packer1':
            fileName = 'writeup/packer1.html';
            break;
        case 'packer2': // Fixed typo
            fileName = 'writeup/packer2.html';
            break;
        case 'packer3': // Fixed typo
            fileName = 'writeup/packer3.html';
            break;
        default:
            contentWindow.innerHTML = `
                <h1>--> Welcome!</h1>
                <p>Hi! My Name is Khanjeet Gogoi, Let's Dive into the Hacking World.<br>
                You can find writeups on /CTFwriteups</p>
                <h2>--> Where to Start Hacking?</h2>
                <p>Interested in Android app hacking / cracking / exploiting?</p>
                <p>DM me on Discord if you're interested!</p>
            `;
            const leftPanel = document.getElementById("left-panel");
            const rightPanel = document.getElementById("right-panel");

            if (leftPanel && rightPanel) {
                leftPanel.classList.toggle("hidden");
                rightPanel.classList.toggle("full-width");
            }
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
            contentWindow.innerHTML = html;
        })
        .catch((error) => {
            console.error(`Error loading ${fileName}:`, error);
            contentWindow.innerHTML = `<p>Failed to load ${fileName}. Please try again later.</p>`;
        });
}

function navigateTo(section) {
    // Push a new state if the section is different
    if (location.hash !== `#${section}`) {
        history.pushState({ section: section }, '', `#${section}`);
        loadContent(section);
    }
}

window.addEventListener('popstate', (event) => {
    if (event.state && event.state.section) {
        loadContent(event.state.section);
    } else {
        loadContent(null);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const initialSection = location.hash ? location.hash.substring(1) : null;
    loadContent(initialSection);
});

// Toggle panel visibility
const toggleBtn = document.getElementById("toggle-btn");
if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
        const leftPanel = document.getElementById("left-panel");
        const rightPanel = document.getElementById("right-panel");

        if (leftPanel && rightPanel) {
            leftPanel.classList.toggle("hidden");
            rightPanel.classList.toggle("full-width");
        }
    });
}
