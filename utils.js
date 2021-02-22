//Extenal function used for sorting 
compare = (a, b) => {
    if (a.priority < b.priority) {
        return -1;
    }
    if (a.priority > b.priority) {
        return 1;
    }
    return 0;
}

exports.compare = compare;
