var NotifloudNotification = function () {

    var NOTIFICATION_CONTAINER_CLASS = "notifications-container";
    var NOTIFICATION_BELL_CLASS = "notification-bell";

    var ACTIVE_CLASS = "active";

    var notificationContainerElement;
    var notificationBellElement;

    function toggle(){
        if(notificationContainerElement.classList.contains(ACTIVE_CLASS)){
            notificationContainerElement.classList.remove(ACTIVE_CLASS);
        } else {
            notificationContainerElement.classList.add(ACTIVE_CLASS);
        }
    }

    function off(){
        notificationContainerElement.style.right = `-${notificationContainerElement.parentNode.offsetWidth - notificationContainerElement.offsetWidth}px`;

        notificationBellElement.style.right = "0";
    }

    function on(){
        notificationContainerElement.style.right = "0";

        notificationBellElement.style.right = `-${notificationBellElement.parentNode.offsetWidth - notificationBellElement.offsetWidth}px`;
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
            toggle: toggle
        });
    }();
}();