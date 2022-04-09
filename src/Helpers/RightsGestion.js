export var rightIsInRole = function (myRights, rightName) {
    for (let i = 0; i < myRights.length; ++i) {
        if (myRights[i].name === rightName) {
            return true;
        }
    }
    return false;
}

export var rightIsInRoleV2 = function (myRights, rightName) {
    for (let i = 0; i < myRights.length; ++i) {
        if (myRights[i].right.name === rightName) {
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

export var hasRight = function (rightName) {
    let rights = getRightsFromToken();
    if (rights == null)
        return false;
    for (let i = 0; i < rights.length; ++i) {
        if (rights[i] == rightName)
            return true;
    }
    return false;
}

export var getRightsFromToken = function () {
    const token = localStorage.getItem("Token");
    if (token == null)
        return null;
    const decodedToken = parseJwt(token);
    let rights = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return rights;
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};