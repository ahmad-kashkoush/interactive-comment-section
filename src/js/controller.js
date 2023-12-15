import { increaseScore, decreaseScore, state } from "./model";
import {
    draft as Draft,
    messageWrapper as MessageWrapper
} from "./UI";

// Configurations

const renderComments = function () {
    state.comments.forEach(comment => {
        document.querySelector(".draft").insertAdjacentHTML("beforebegin", MessageWrapper.generateMarkup(comment.id));
    })

}
// init is the runner of application
const addUpdateScoreHandlers = function () {
    const handler = function (e, update) {
        e.preventDefault();
        const ele = e.target.closest('button');
        const container = e.target.closest('.comment');
        if (!ele) return;
        const id = container.dataset.id;
        container.querySelector('.score').textContent = `${update(+id)}`;
    }
    document.querySelectorAll(".inc").forEach(btn => {
        btn.addEventListener("click", function (e) {
            handler(e, increaseScore);
        })
    })
    document.querySelectorAll(".dec").forEach(btn => {
        btn.addEventListener("click", function (e) {
            handler(e, decreaseScore);
        })
    })
}

// add reply
const generateReply = function () {
    document.querySelectorAll('.btn-reply').forEach(reply => {
        reply.addEventListener('click', function (e) {
            const ele = e.target.closest('.comment');
            if (!ele) return;
            const id = +ele.dataset.id;
            document.querySelectorAll('.draft').forEach(draft => draft.remove())

            const markup = Draft.generateMarkup();
            ele.insertAdjacentHTML('afterend', markup);

        })
    })
}

const init = function () {
    renderComments();
    addUpdateScoreHandlers();
    generateReply();
}
init();