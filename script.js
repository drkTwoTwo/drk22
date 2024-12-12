 
function loadContent(section) {
    const contentWindow = document.getElementById('content-window');
    let fileName;

    switch (section) {
        case 'whoami':
            fileName = 'whoami.html'; // File for About section
            break;

        case 'writeups':
            fileName = 'writeup.html'; // File for Writeups section
            break;

        case 'social':
            fileName = 'social.html'; // File for Other section
            break;
        case 'working':
            fileName = 'working.html'; // File for Other section
            break;
        case 'packer':
            filename = 'writeup/packer.html';
            break;

        default:
            contentWindow.innerHTML = `
                <h1>Welcome!</h1>
                <p>Want to know about CTF ?</p>
                <br><p>You can find  writeups on /CTFwriteups</p>
                <h2>Where to start Hacking ?</h2>
                <p>CTF is the great way to start your journy..</p><br>
                <p>It teach you how to find stuffs</p>
            `;
            return; // Exit the function if no matching section
    }

    // Fetch the HTML file dynamically and insert it into the content window
    fetch(fileName)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text(); // Convert the response to text
        })
        .then((html) => {
            contentWindow.innerHTML = html; // Insert fetched HTML into content window
        })
        .catch((error) => {
            console.error(`Error fetching ${fileName}:`, error);
            contentWindow.innerHTML = `<p>Error loading content. Please try again later.</p>`;
        });
}

document.getElementById("toggle-btn").addEventListener("click", function() {
    const leftPanel = document.getElementById("left-panel");
    const rightPanel = document.getElementById("right-panel");

    leftPanel.classList.toggle("hidden");  // Toggle the left panel visibility
    rightPanel.classList.toggle("full-width");  // Toggle right panel to 100% width
});
