
// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const headerHamburger = document.querySelector('.s-header__menu-toggle .hamburger');
    const sidebarClose = document.querySelector('.s-sidebar__close .hamburger');
    
    // Check if elements exist before manipulating them
    if (!sidebar || !headerHamburger || !sidebarClose) {
        console.warn('Required elements not found for sidebar functionality');
        return;
    }
    
    // Function to update sidebar state
    function updateSidebarState() {
        if (sidebar.classList.contains('active')) {
            sidebarClose.classList.add('active');
        } else {
            sidebarClose.classList.remove('active');
        }
    }
    
    // Add click event listeners for toggling
    headerHamburger.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        headerHamburger.classList.toggle('active');
        updateSidebarState();
    });
    
    sidebarClose.addEventListener('click', function() {
        sidebar.classList.remove('active');
        headerHamburger.classList.remove('active');
        sidebarClose.classList.remove('active');
    });
    
    // Initialize sidebar state
    updateSidebarState();
});