var NotifloudNotification = function () {

    var NOTIFICATION_CONTAINER_CLASS = "notifications-container";
    var NOTIFICATION_BELL_CLASS = "notification-bell";

    var ACTIVE_CLASS = "active";

    var notificationContainerElement;
    var notificationBellElement;

    function off(){
        notificationContainerElement.style.right = `-${notificationContainerElement.parentNode.offsetWidth - notificationContainerElement.offsetWidth}px`;
        notificationBellElement.style.right = "0";
    }

    function on(){
        notificationContainerElement.style.right = "0";
        notificationBellElement.style.right = `-${notificationBellElement.parentNode.offsetWidth - notificationBellElement.offsetWidth}px`;
    }

    function set(notifications){
        for(var notification of notifications){
            createNotificationElement(notification["title"], notification["description"]);
        }
    }

    function createNotificationElement(title, description){
        return createElement(`
            <div class="notification">
                <div class="notification-title-container">
                    <span class="notification-title">
                        ${title}
                    </span>
                    <span class="notification-date">
                        3 Hours ago
                    </span>
                </div>
                <span class="notification-content">
                    ${description}
                </span>
            </div>
        `);
    }

    function createElement(serialized) {
        var temporaryElement = document.createElement("div");
        temporaryElement.innerHTML += serialized;
        return temporaryElement.firstElementChild;
    }

    (function setup(){
        notificationContainerElement = document.querySelector(`.${NOTIFICATION_CONTAINER_CLASS}`);
        notificationBellElement = document.querySelector(`.${NOTIFICATION_BELL_CLASS}`);

        notificationContainerElement.style.right = `-${notificationContainerElement.parentNode.offsetWidth - notificationContainerElement.offsetWidth}px`;

        notificationBellElement.addEventListener("mouseover", on);
        notificationContainerElement.addEventListener("mouseleave", off);
    })();

    return function () {
        return Object.freeze({
            set: set  
        });
    }();
}();