var NotifloudToast = function () {
    var DEFAULT_TITLE = "You forgot to add a title!";
    var DEFAULT_CONTENT = "You forgot to add content!"

    var toastsContainer;
    
    var toasts = [];

    var configuration = {
        duration: 5000, // 5 seconds
    };

    var icons = {
        'success': '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"></path></svg>',
        'error': '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"></path></svg>',
        'info': '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m10.277 5.433-4.031.505-.145.67.794.145c.516.123.619.309.505.824L6.101 13.68c-.34 1.578.186 2.32 1.423 2.32.959 0 2.072-.443 2.577-1.052l.155-.732c-.35.31-.866.434-1.206.434-.485 0-.66-.34-.536-.939l1.763-8.278zm.122-3.673a1.76 1.76 0 1 1-3.52 0 1.76 1.76 0 0 1 3.52 0z"></path></svg>',
        'warning': '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.002 14a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm.195-12.01a1.81 1.81 0 1 1 3.602 0l-.701 7.015a1.105 1.105 0 0 1-2.2 0l-.7-7.015z"></path></svg>',
        'loading': '<svg viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg>',
        'close': '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>'
    };

    function create(title, content, type) {
        var toastElement = createToastElement(title, content, type);
        
        toastElement.querySelector(".close").addEventListener("click", function(event) { 
            close(event.target.closest(".toast"));
        });

        setTimeout(function () {
            close(toastElement);
        }, configuration.duration);

        toastElement.style.maxHeight = `${toastElement.scrollHeight}px`;

        toasts.push(toastElement);
        toastsContainer.appendChild(toastElement);
        setupStyling(toastElement);
    }

    function setupStyling(element){
        element.style.opacity = "1";
        element.style.maxHeight = `${element.scrollHeight}px`;
    }

    function close(element) {
        element.style.right = `-${element.offsetWidth + 16}px`;

        setTimeout(function () {
            toasts.splice(toasts.indexOf(element), 1);
            element.remove();
        }, 500);
    }

    function closeAll(){
        for(var toast of toasts){
            close(toast);
        }
        toasts = [];
    }

    function createToastElement(title, content, type){
        return createElement(`
            <div class="toast">
                <div class="toast-inner">
                    <div class="icon ${type}">${icons[type]}</div>
                    <div class="content">
                        <h2>${title ?? DEFAULT_TITLE}</h2>
                        <p>${content ?? DEFAULT_CONTENT}</p>
                    </div>
                    <button class="close">${icons["close"]}</button>
                </div>
            </div>
        `);
    }

    function createElement(serialized) {
        var temporaryElement = document.createElement("div");
        temporaryElement.innerHTML += serialized;
        return temporaryElement.firstElementChild;
    }

    function initialize(){
        document.addEventListener("DOMContentLoaded", function() {
            toastsContainer = createElement(`
                <div class="toasts"></div>
            `);
            document.body.appendChild(toastsContainer);
        });
    }

    return function () {
        initialize();
        return Object.freeze({
            success: function (title, content) { create(title, content, "success") },
            error: function (title, content) { create(title, content, "error") },
            info: function (title, content) { create(title, content, "info") },
            warning: function (title, content) { create(title, content, "warning") },
            loading: function (title, content) { create(title, content, "loading") },

            close: closeAll
        });
    }();
}();