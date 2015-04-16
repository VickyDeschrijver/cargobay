/* ==========================================================================
   Sidebar Toggle

   Initialize:
   cargobay.sidebarToggle();

   Support:
   Latest Chrome
   Latest FireFox
   Latest Safari
   IE10 and up
   ========================================================================== */

var cargobay = cargobay || {};

cargobay.sidebarToggle = function(undefined) {

    var activeSidebarClass = 'sidebar-toggle__sidebar--active';

    var init, _toggle;

    var aniSidebarOpen = {},
        aniSidebarClose = {},
        aniContainerOpen = {},
        aniContainerClose = {};

    var sidebarWidth, sidebarHeight;

    var btn,
        container,
        content,
        sidebar,
        position = '',
        preventOverflow = true,
        duration = 0;

    // Toggle
    _toggle = function() {
        if(!sidebar.classList.contains(activeSidebarClass)) {
            sidebar.classList.add(activeSidebarClass);

            Velocity({
                elements: sidebar,
                properties: aniSidebarOpen,
                options: {
                    duration: duration,
                    easing: 'ease'
                }
            });

            Velocity({
                elements: content,
                properties: aniContainerOpen,
                options: {
                    duration: duration,
                    easing: 'ease'
                }
            });

            if(preventOverflow) {
                document.querySelector('.sidebar-toggle-container').classList.add('sidebar-toggle-container--prevent-overflow');
            }

            content.addEventListener('click', _toggle);

        } else {
            sidebar.classList.remove(activeSidebarClass);

            Velocity({
                elements: sidebar,
                properties: aniSidebarClose,
                options: {
                    duration: duration,
                    easing: 'ease'
                }
            });

            Velocity({
                elements: content,
                properties: aniContainerClose,
                options: {
                    duration: duration,
                    easing: 'ease'
                }
            });

            if(preventOverflow) {
                document.querySelector('.sidebar-toggle-container').classList.remove('sidebar-toggle-container--prevent-overflow');
            }

            content.removeEventListener('click', _toggle);
        }
    };


    // Init
    init = function() {
        [].forEach.call( document.querySelectorAll('.js-sidebar-toggle__toggle-btn'), function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                btn = this;
                container = document.querySelector(btn.getAttribute('data-container'));
                content = document.querySelector(btn.getAttribute('data-content'));
                sidebar = document.querySelector(btn.getAttribute('data-sidebar'));
                position = btn.getAttribute('data-position');
                preventOverflow = btn.getAttribute('data-prevent-overflow');
                duration = btn.getAttribute('data-duration');

                // Set direction variables
                if(position === 'left') {
                    sidebarWidth = sidebar.offsetWidth;

                    aniSidebarOpen.translateX = ['0', '-100%'];
                    aniSidebarClose.translateX = ['-100%', '0'];

                    aniContainerOpen.translateX = [sidebarWidth, '0'];
                    aniContainerClose.translateX = ['0', sidebarWidth];
                }
                if(position === 'right') {
                    sidebarWidth = sidebar.offsetWidth;

                    aniSidebarOpen.translateX = ['0', '100%'];
                    aniSidebarClose.translateX = ['100%', '0'];

                    aniContainerOpen.translateX = ['-' + sidebarWidth, '0'];
                    aniContainerClose.translateX = ['0', '-' + sidebarWidth];
                }
                if(position === 'top') {
                    sidebarHeight = sidebar.offsetHeight;

                    aniSidebarOpen.translateY = ['0', '-100%'];
                    aniSidebarClose.translateY = ['-100%', '0'];

                    aniContainerOpen.translateY = [sidebarHeight, '0'];
                    aniContainerClose.translateY = ['0', sidebarHeight];
                }
                if(position === 'bottom') {
                    sidebarHeight = sidebar.offsetHeight;

                    aniSidebarOpen.translateY = ['0', '100%'];
                    aniSidebarClose.translateY = ['100%', '0'];

                    aniContainerOpen.translateY = ['-' + sidebarHeight, '0'];
                    aniContainerClose.translateY = ['0', '-' + sidebarHeight];
                }

                // Animate toggle
                _toggle();
            });
        });
    }();
};
