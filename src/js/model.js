import jsonData from "./../data.json"

export const state = {
    currentUser: {},
    comments: [],
    lastId: 4,
    idToEle: new Map()

}
const fetchData = function () {
    const updateEle = (comment, isReply) => {
        comment.maxScore = comment.score + 1;
        comment.minScore = comment.score - 1;
        comment.isReply = isReply;
        state.idToEle.set(comment.id, comment);
        return comment;
    }
    state.currentUser = jsonData.currentUser;
    state.comments = jsonData.comments;
    state.comments = state.comments.map(comment => {
        comment = updateEle(comment, false);
        comment.replies = comment.replies.map(ele => updateEle(ele, true));
        return comment;
    })
}
fetchData();

// Update Score
export const increaseScore = function (id) {
    const ele = state.idToEle.get(id);
    if (!ele) return;
    return ele.score += ele.score !== ele.maxScore;
}


export const decreaseScore = function (id) {
    const ele = state.idToEle.get(id);
    if (!ele) return;
    return ele.score -= ele.score !== ele.minScore
}



// helper
// const findI = (arr, id) => arr.findIndex(ele => ele.id === id);

// const getIdOfElement = function (id) {
//     let i = findI(state.comments, id);
//     const isReply = i === -1;
//     let j = -1;
//     if (isReply)
//         i = state.comments.findIndex(ele => {
//             j = findI(ele.replies, id)
//             return j !== -1;

//         });
//     i = i === -1 && isReply ? -1 : i;

//     return [i, j, isReply];
// }

