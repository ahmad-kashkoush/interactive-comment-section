import { state } from "./model";

const _generateCommentMarkup = function (id) {
    const findId = (arr) => arr.find(ele => ele.id === id);
    let comment = state.comments.find(ele => ele.id === id || findId(ele.replies));
    if (!comment) return '';
    if (comment.id !== id) comment = findId(comment.replies);
    const isMe = state.currentUser.username == comment.user.username;
    const commentMarkup = `
    <div class="comment" data-id="${comment.id}">
      <div class="row2">
        <div class="upvote">
          <button class="inc">
            <img src="${"./../assets/images/icon-plus.svg"}" alt="" />
          </button>
          <span class="score">${comment.score}</span>
          <button class="dec">
          <img src="${"./../assets/images/icon-minus.svg"}" alt="" />
          </button>
        </div>
        ${!isMe ? `
        <button class="btn btn-style c-primary show-mobile">
          <img src="${"./../assets/images/icon-reply.svg"}" alt="" />
          <span>reply</span>
        </button>`: `   <div class="btns-me show-mobile">
        <button class="btn c-primary btn-style">
          <img src="./assets/images/icon-edit.svg" alt="" />
          <span>edit</span>
        </button>
        <button class="btn c-red btn-style">
          <img src="./assets/images/icon-delete.svg" alt="" />
          <span>delete</span>
        </button>
      </div>`}
      </div>
      <div class="col-2">
        <div class="row">
          <div class="metadata">
            <figure>
              <img
                src="${comment.user.image.png}"
                alt=""
                class="avatar"
              />
              <figcaption class="username">${comment.user.username}</figcaption>
            </figure>
            <span class="created-at">${comment.createdAt}</span>
          </div>
          ${!isMe ?
            ` <button class="btn btn-style c-primary show-desktop">
            <img src="${"./../assets/images/icon-reply.svg"}" alt="" />
           <span>reply</span>
         </button>
       </div>
     `: ` <div class="btns-me show-desktop">
     <button class="btn c-primary btn-style">
       <img src="./assets/images/icon-edit.svg" alt="" />
       <span>edit</span>
     </button>
     <button class="btn c-red btn-style">
       <img src="./assets/images/icon-delete.svg" alt="" />
       <span>delete</span>
     </button>
   </div>
 </div>`
        }
        <p class="content">
        ${comment.content}
      </p>
    </div>
  </div>
         
    `
    return commentMarkup;
}
const _generaterepliesMarkup = function (id) {
    const comment = state.comments.find(ele => ele.id === id);
    if (!comment) return '';

    if (comment.replies.length === 0) return '';
    console.log(comment.replies);
    const repliesMarkup = comment.replies.map(reply => _generateCommentMarkup(reply.id)).join('');


    return `
    <div class="replies" style="--replies-number: ${comment.replies.length}">
            ${repliesMarkup}
    </div >
    `

}
const generateMessageWrapper = function (id) {
    const commentMarkup = _generateCommentMarkup(id);
    if (commentMarkup === '') return '';
    return `
    <div  class="message-wrapper" >
        ${_generateCommentMarkup(id)}
        ${_generaterepliesMarkup(id)}
   </div>
    `
}
const renderComments = function () {
    state.comments.forEach(comment => {
        document.querySelector(".draft").insertAdjacentHTML("beforebegin", generateMessageWrapper(comment.id));
    })

}
// init is the runner of application
const init = function () {
    renderComments();
}
init();