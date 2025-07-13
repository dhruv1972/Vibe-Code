const defaultSuggestions = [
    "Compliment a stranger today.",
    "Hold the door open for someone.",
    "Send a thank you message to a friend.",
    "Pick up litter you see on the ground.",
    "Let someone go ahead of you in line.",
    "Leave a positive review for a local business.",
    "Donate unused clothes to charity.",
    "Write a note of encouragement to someone.",
    "Smile at five people today.",
    "Share your umbrella with someone in the rain."
];

function getUserSuggestions() {
    return JSON.parse(localStorage.getItem('userSuggestions') || '[]');
}

function saveUserSuggestions(suggestions) {
    localStorage.setItem('userSuggestions', JSON.stringify(suggestions));
}

function getAllSuggestions() {
    return [...defaultSuggestions, ...getUserSuggestions()];
}

function showSuggestion(text) {
    const suggestionDiv = document.getElementById('suggestion');
    suggestionDiv.style.opacity = 0;
    setTimeout(() => {
        suggestionDiv.textContent = text;
        suggestionDiv.style.opacity = 1;
    }, 250);
}

function getRandomSuggestion() {
    const suggestions = getAllSuggestions();
    return suggestions[Math.floor(Math.random() * suggestions.length)];
}

document.getElementById('new-suggestion').addEventListener('click', () => {
    showSuggestion(getRandomSuggestion());
});

document.getElementById('add-suggestion').addEventListener('click', () => {
    const input = document.getElementById('custom-suggestion');
    const value = input.value.trim();
    if (value.length > 0) {
        const userSuggestions = getUserSuggestions();
        userSuggestions.push(value);
        saveUserSuggestions(userSuggestions);
        input.value = '';
        showSuggestion(value);
    }
});

// Optional: Enter key adds suggestion

document.getElementById('custom-suggestion').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('add-suggestion').click();
    }
});

// On load, show a random suggestion
showSuggestion(getRandomSuggestion()); 