import { state } from "./model";

class Markup {
  generateMarkup(id) {
    return '';
  }
}
class Comment extends Markup {
  generateMarkup(id, isForUpdate = false) {
    const comment = state.idToEle.get(id);
    if (!comment) return;
    const isMe = state.currentUser.username === comment.user.username;
    const starter = `${!isForUpdate ? ` <div class="comment" data-id="${comment.id}">` : ''}`;
    const ender = `${!isForUpdate ? '</div>' : ''}`;
    const commentMarkup = `
      ${starter}
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
          <button class="btn btn-style c-primary btn-reply show-mobile">
            <img src="${"./../assets/images/icon-reply.svg"}" alt="" />
            <span>reply</span>
          </button>`: `   <div class="btns-me btn-edit show-mobile">
          <button class="btn c-primary btn-style">
            <img src="./assets/images/icon-edit.svg" alt="" />
            <span>edit</span>
          </button>
          <button class="btn c-red btn-style btn-delete">
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
        ` <button class="btn btn-style c-primary btn-reply show-desktop">
              <img src="${"./../assets/images/icon-reply.svg"}" alt="" />
             <span>reply</span>
           </button>
         </div>
       `: ` <div class="btns-me show-desktop">
       <button class="btn c-primary btn-edit btn-style">
         <img src="./assets/images/icon-edit.svg" alt="" />
         <span>edit</span>
       </button>
       <button class="btn c-red btn-style btn-delete">
         <img src="./assets/images/icon-delete.svg" alt="" />
         <span>delete</span>
       </button>
     </div>
   </div>`
      }
          <p class="content">
          ${!comment.replyingTo ? '' :
        `<span class="c-primary">@${comment.replyingTo}</span>`}
          ${comment.content}
        </p>
      </div>
    ${ender}
           
      `
    return commentMarkup;
  }
}
export const comment2 = new Comment();

class Replies extends Markup {
  generateMarkup(id) {
    const comment = state.idToEle.get(id);
    if (!comment) return '';
    if (comment.replies.length === 0) return '';
    const repliesMarkup = comment.replies.map(reply => comment2.generateMarkup(reply.id)).join('');


    return `
    <div class="replies" style="--replies-number: ${comment.replies.length}">
    ${repliesMarkup}
    </div >
      `
  }

}
class MessageWrapper extends Markup {
  generateMarkup(id) {
    const commentMarkup = comment2.generateMarkup(id);
    if (commentMarkup === '') return '';
    return `
    <div  class="message-wrapper" >
    ${commentMarkup}
    ${new Replies().generateMarkup(id)}
    </div>
    `
  }
}
export const messageWrapper = new MessageWrapper();
class Draft extends Markup {
  generateMarkup(id = state.lastId + 1, repliedToId) {
    return `
    <form action="" class="draft comment" data-replied-to-id="${repliedToId}">
    <textarea placeholder="Add a comment..."></textarea>
    <div class="row">
    <img
    src="./../assets/images/avatars/image-juliusomo.png"
    class="avatar"
    alt=""
    />
    <button class="btn btn-send bg-primary">Reply</button>
    </div>
    </form>
    `;
  }
}
export const draft = new Draft();

class EditDraft extends Markup {
  generateMarkup(id) {
    const comment = state.idToEle.get(id);
    if (!id) return;
    return `
   
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
         <div class="btns-me btn-edit show-mobile">
      <button class="btn c-primary btn-style">
        <img src="./assets/images/icon-edit.svg" alt="" />
        <span>edit</span>
      </button>
      <button class="btn c-red btn-style btn-delete">
        <img src="./assets/images/icon-delete.svg" alt="" />
        <span>delete</span>
      </button>
    </div>
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
         <div class="btns-me show-desktop">
   <button class="btn c-primary btn-edit btn-style">
        <img src="./assets/images/icon-edit.svg" alt="" />
        <span>edit</span>
      </button>
      <button class="btn c-red btn-style btn-delete">
        <img src="./assets/images/icon-delete.svg" alt="" />
        <span>delete</span>
      </button>
    </div>
    </div>
      
       <textarea class="content">
      ${comment.content}
    </textarea>
    <div>
    <button class="btn btn-update bg-primary">Update</button>
    </div>
      </div >
     `
  }
}
export const editDraft = new EditDraft();