var NotifloudNotification = function () {

    var NOTIFICATION_CONTAINER_CLASS = "notifications-container";
    var NOTIFICATION_BELL_CLASS = "notification-bell";
    var NOTIFICATION_COUNT_CLASS = "notification-count";

    var notificationContainerElement;
    var notificationBellElement;
    var notificationBellCountElement;

    var notificationsCount = 0;

    function off(){
        notificationContainerElement.style.right = `-${notificationContainerElement.parentNode.offsetWidth - notificationContainerElement.offsetWidth}px`;
        notificationBellElement.style.right = "0";
    }

    function on(){
        if(notificationsCount > 0){
            notificationContainerElement.style.right = "0";
            notificationBellElement.style.right = `-${notificationBellElement.parentNode.offsetWidth - notificationBellElement.offsetWidth}px`;
        }
    }

    function set(notifications){
        notificationsCount += notifications.length;
        updateNotificationCount(notificationsCount);

        for(var notification of notifications){
            createNotificationElement(notification["title"], notification["description"]);
        }
    }

    function updateNotificationCount(count){
        if(count === 0)
            notificationBellCountElement.classList.add("zero");
        else {
            notificationBellCountElement.classList.remove("zero");
            notificationBellCountElement.innerHTML = count;
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
        notificationContainerElement.appendChild(temporaryElement.firstElementChild);
        return temporaryElement.firstElementChild;
    }

    (function setup(){
        notificationContainerElement = document.querySelector(`.${NOTIFICATION_CONTAINER_CLASS}`);
        notificationBellElement = document.querySelector(`.${NOTIFICATION_BELL_CLASS}`);
        notificationBellCountElement = notificationBellElement.querySelector(`.${NOTIFICATION_COUNT_CLASS}`);

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