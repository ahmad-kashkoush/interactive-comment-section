import {
    increaseScore,
    decreaseScore,
    state,
    addReply,
    generateReplyObject,
    deleteFromState,
    addComment,
    updateContent
} from "./model";
import {
    draft as Draft,
    messageWrapper as MessageWrapper,
    comment2 as Comment,
    editDraft
} from "./UI";

// Configurations
const lastDraft = document.querySelector('main >.draft');
const insertComment = function (id) {
    lastDraft.insertAdjacentHTML("beforebegin", MessageWrapper.generateMarkup(id));
}
const renderComments = function () {
    state.comments.forEach(comment => {
        insertComment(comment.id);
    })

}
const addEventsToEle = function (ele) {
    addUpdateScoreHandlers(ele);
    addReply2(ele);
    deleteComment(ele);
}

// init is the runner of application
const addUpdateScoreHandlers = function (addToEle = document) {
    const handler = function (e, update) {
        e.preventDefault();
        const ele = e.target.closest('button');
        const container = e.target.closest('.comment');
        if (!ele) return;
        const id = container.dataset.id;
        container.querySelector('.score').textContent = `${update(+id)}`;
    }
    addToEle.querySelectorAll(".inc").forEach(btn => {
        btn.addEventListener("click", function (e) {
            handler(e, increaseScore);
        })
    })
    addToEle.querySelectorAll(".dec").forEach(btn => {
        btn.addEventListener("click", function (e) {
            handler(e, decreaseScore);
        })
    })
}

// add reply

const addReply2 = function (addToEle = document) {

    addToEle.querySelectorAll('.draft').forEach(draft => {
        draft.addEventListener('submit', function (e) {
            e.preventDefault();
            const ele = e.target.closest('.draft');
            const repliedToId = +ele.dataset.repliedToId;
            const repliedToComment = state.idToEle.get(repliedToId);
            let myAddedEle;
            if (!repliedToComment) {
                const obj = generateReplyObject(ele, -1);
                addComment(obj);
                insertComment(obj.id);

                myAddedEle = document.querySelector(`div[data-id="${obj.id}"]`);
            } else {
                const obj = generateReplyObject(ele, repliedToId);
                addReply(repliedToId, obj);
                const markup = Comment.generateMarkup(obj.id);

                // console.log(ele.closest('.message-wrapper'));
                const insertionEle = ele.closest('.message-wrapper').querySelector('.replies');
                const idd = +ele.closest('.message-wrapper').querySelector('.comment').dataset.id;
                const comment = state.idToEle.get(idd);
                insertionEle.setAttribute('style', `--replies-number: ${comment.replies.length}`);
                insertionEle.insertAdjacentHTML('beforeend', markup);
                myAddedEle = insertionEle.querySelector(`div[data-id="${obj.id}"]`);


            }
            // Add Events to new added Element
            deleteComment(myAddedEle);
            editComment(myAddedEle);
            addUpdateScoreHandlers(myAddedEle);
            addToEle.querySelectorAll('.message-wrapper .draft').forEach(draft => draft.remove())
        })
    })
}

const openReplyDraft = function (addToEle = document) {
    addToEle.querySelectorAll('.btn-reply').forEach(reply => {
        reply.addEventListener('click', function (e) {
            const ele = e.target.closest('.comment');
            if (!ele) return;
            const id = +ele.dataset.id;
            document.querySelectorAll('.message-wrapper .draft').forEach(draft => draft.remove())

            const markup = Draft.generateMarkup(-1, id);
            ele.insertAdjacentHTML('afterend', markup);
            addReply2();
        })
    });

}

const deleteComment = function (addToEle = document) {
    addToEle.querySelectorAll('.btn-delete').forEach(deleteBtn => {
        deleteBtn.addEventListener('click', function (e) {
            const ele = e.target.closest('.comment');
            const id = +ele.dataset.id;
            deleteFromState(id);
            ele.remove();
        })
    })
}


const editComment = function (addToEle = document) {
    addToEle.querySelectorAll('.btn-edit').forEach(editBtn => {
        editBtn.addEventListener('click', function (e) {
            const ele = e.target.closest('.comment');
            const id = +ele.dataset.id;
            ele.innerHTML = editDraft.generateMarkup(id);
            ele.querySelector('.btn-update').addEventListener('click', function (e2) {
                e.preventDefault();
                const newContent = ele.querySelector('textarea').value;
                updateContent(id, newContent);
                ele.innerHTML = Comment.generateMarkup(id, true);

            })
        })
    })

}
const init = async function () {

    renderComments();
    addUpdateScoreHandlers();
    openReplyDraft();
    deleteComment();
    editComment();
    addReply2();

    // edit();

}
init();