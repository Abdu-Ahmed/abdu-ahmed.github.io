document.addEventListener('DOMContentLoaded', function() {
    const element = document.getElementById('typing-text');
    const words = ['BDULRAHMAN', 'HMED'];
    let wordIndex = 0;
    let charIndex = 0;
    let typing = true;

    function type() {
        if (typing) {
            element.textContent += words[wordIndex].charAt(charIndex);
            charIndex++;
            if (charIndex === words[wordIndex].length) {
                typing = false;
                setTimeout(type, 1500); // Pause before backspacing
            } else {
                setTimeout(type, 200); // Typing speed
            }
        } else {
            element.textContent = element.textContent.slice(0, -1);
            charIndex--;
            if (charIndex === 0) {
                typing = true;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500); // Pause before typing the next word
            } else {
                setTimeout(type, 100); // Backspacing speed
            }
        }
    }

    type();
});