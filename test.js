function getTimeString(time) {
    // get hours and rest second
    const hour = parseInt(time / 3600);
    let remainingSecond = parseInt(time % 3600);
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

console.log(getTimeString(7865));