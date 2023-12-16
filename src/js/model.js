import jsonData from "./../data.json"

export const state = {
    currentUser: {},
    comments: [],
    lastId: 4,
    idToEle: new Map()

}
const updateEle = (comment, isReply) => {
    comment.maxScore = comment.score + 1;
    comment.minScore = comment.score - 1;
    comment.isReply = isReply;
    state.idToEle.set(comment.id, comment);
    return comment;
}
const fetchData = function () {
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
const createDate = function () {
    return 'Today';
}
export const generateReplyObject = function (ele, repliedToId) {
    try {
        if (!ele) throw new Error('not valid ele');
        const obj = {};
        obj.id = state.lastId + 1;
        obj.content = ele.querySelector('textarea').value;
        obj.createdAt = createDate();
        if (repliedToId !== -1) {
            obj.replyingTo = state.idToEle.get(repliedToId).user.username;
        }
        obj.user = state.currentUser;
        obj.score = 0;
        updateEle(obj, true);
        return obj;


    } catch (err) {
        throw err;
    }
}

export const addReply = function (repliedToId, obj) {
    const repliedToElement = state.idToEle.get(repliedToId);
    if (!repliedToElement) return;
    if (repliedToElement.isReply) {
        const i = state.comments.findIndex(ele => ele.replies.includes(repliedToElement));
        state.comments[i].replies.push(obj);
    } else
        repliedToElement.replies.push(obj);
    state.lastId++;
    state.idToEle.set(obj.id, obj);
}
export const addComment = function (obj) {
    obj.replies = [];
    state.comments.push(obj);
    state.lastId++;
    state.idToEle.set(obj.id, obj);

}

export const deleteFromState = function (id) {
    const ele = state.idToEle.get(id);
    if (!ele) return;
    if (ele.isReply)
        state.comments.forEach(comment => {
            const i = comment.replies.indexOf(ele);
            if (i !== -1) comment.replies.splice(i, 1);
        })
    else {
        const i = state.comments.indexOf(ele);
        if (i !== -1) state.comments.splice(i, 1);
    }

    state.idToEle.delete(id);
}

export const updateContent = function (id, newContent) {
    const ele = state.idToEle.get(id);
    ele.content = newContent;
}
// helper

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

