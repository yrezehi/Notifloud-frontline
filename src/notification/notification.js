var NotifloudNotification = function () {

    var NOTIFICATION_CONTAINER_CLASS = "notifications-container";
    var NOTIFICATION_BELL_CLASS = "notification-bell";
    var NOTIFICATION_COUNT_CLASS = "notification-count";

    var notificationContainerElement;
    var notificationBellElement;
    var notificationBellCountElement;

    var notificationsCount = 0;

    var configuration = {
        duration: 5000, // 5 seconds
        direction: "ltr"
    };

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
            var notificationElement = createNotificationElement(notification["title"], notification["description"]);
            if(notification["callback"]){
                notificationElement.addEventListener("click", notification["callback"]);
            }
        }
    }

    function updateNotificationCount(count){
        if(count === 0)
            notificationBellCountElement.classList.add("zero");
        else {
            notificationBellElement.classList.add("active");
            notificationBellCountElement.classList.remove("zero");
            notificationBellCountElement.innerHTML = count;
        }
    }

    function createNotificationElement(title, description){
        return createNotificationElement(`
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

    function createNotificationElement(serialized) {
        var temporaryElement = document.createElement("div");
        temporaryElement.innerHTML += serialized;
        var firstElement = temporaryElement.firstElementChild; 
        notificationContainerElement.appendChild(firstElement);
        return firstElement;
    }

    function configure(properties){
        Object.keys(properties).forEach(property => {
            if (configurationProperty in configuration){
                configuration[prpropertyop] = properties[property];
            }
            else { 
                console.error(`property named ${property} was not found!`);
            }
        });
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
            set: set,
            configure: configure
        });
    }();
}();