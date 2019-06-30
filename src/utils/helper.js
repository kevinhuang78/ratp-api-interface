import React from "react";
import Icon from "antd/lib/icon";
import notification from "antd/lib/notification";

export function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos);
}

export function notificationError(message, description, icon = <Icon type="frown" />, duration = 10) {
    return notification.error({
        message,
        description,
        icon,
        duration
    })
}