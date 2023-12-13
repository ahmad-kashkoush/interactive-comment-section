import jsonData from "./../data.json"

export const state = {
    currentUser: {},
    comments: []

}

const fetchData = function () {
    state.currentUser = jsonData.currentUser;
    state.comments = jsonData.comments;
}
fetchData();