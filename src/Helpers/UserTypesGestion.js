export var typeIsInUser = function (types, typeName) {
    for (let i = 0; i < types.length; ++i) {
        if (types[i].type.memberType === typeName) {
            return true;
        }
    }
    return false;
}