export var rightIsInRole = function (myRights, rightName) {
    for (let i = 0; i < myRights.length; ++i) {
        if (myRights[i].name === rightName) {
            return true;
        }
    }
    return false;
}

export var isAdmin = function (myRights) {
    for (let i = 0; i < myRights.length; ++i) {
        if (
            (myRights[i].name === "manage_members") ||
            (myRights[i].name === "manage_events") ||
            (myRights[i].name === "manage_partitions") ||
            (myRights[i].name === "manage_locker_room") ||
            (myRights[i].name === "manage_communication") ||
            (myRights[i].name === "manage_sinisters")
        ) {
            return true;
        }
    }
    return false;
}