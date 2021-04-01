$(document).ready(function () {
    backHome()
    getDetail()
    getComment()
})

// 사용자가 내용을 올바르게 입력하였는지 확인합니다.
function isValidContents(contents) {
    if (contents == '') {
        alert('내용을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 140) { // trim - 앞,뒤 공백 제거
        alert('내용을 공백 포함 140자 이하로 입력해주세요');
        return false;
    }
    return true;
}

function backHome() {
    $('#home').on('click', function () {
        window.location.href = "/"
    })
}

function getDetail() {
    let id = location.search.split('=')[1]
    $('#cards-box').empty();
    $.ajax({
        type: 'GET',
        url: `/api/detail/${id}`,
        success: function (response) {
            addDetail(response['id'], response['author'], response['title'], response['contents'], response['modifiedAt'])
        }
    })
}

function addDetail(id, author, title, contents, modifiedAt) {
    let tempHtml = `<div id="cards-box">
                        <div class ="card">
                            <div class="card-body">
                                <h2 id="title" class="title">${title}</h2>
                                <p class="post-author metadata">
                                    <span id = "author" class="author">${author}</span> <span class="date">${modifiedAt}</span>
                                </p>
                            </div>
                            <div class="card-text">
                                <p id = "contents" class="contents">
                                    ${contents}
                                </p>
                            </div>
                            <!-- 수정 영역 -->
                            <div class="contents">
                            <div id="editarea" class="edit">
                                <textarea id="textarea" class="te-edit" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                        <div class="footer">
                            <img id="edit" onclick="editPost()" class="icon-start-edit" src="images/edit.png"
                                 alt="">
                            <img id="delete" onclick="deleteOne()" class="icon-delete" src="images/delete.png"
                                 alt="">
                            <img id="submit" onclick="submitEdit()" class="icon-end-edit" src="images/done.png"
                                 alt="">
                        </div>
                        </div>
                
                    </div>`
    $('#cards-box').append(tempHtml)
}

function editPost() {
    showEdits();
    let contents = $(`.contents`).text().trim();
    $(`#textarea`).val(contents);
}

function showEdits() {
    $(`#editarea`).show();
    $(`#submit`).show();
    $(`#delete`).show();

    $(`#contents`).hide();
    $(`#edit`).hide();
}

// // 포스트를 수정합니다.
function submitEdit() {
    // 게시물 번호를 가져옵니다
    let id = location.search.split('=')[1]
    // 제목, 내용, 작성자를 가져옵니다.
    let title = $(`#title`).text();
    let contents = $(`#textarea`).val().trim();
    let author = $(`#author`).text();
    // author 와 현재 유저네임이 같은지 확인합니다.
    let cur_username = $('#username').text();
    if (cur_username != author) {
        alert("자신이 작성한 글만 수정이 가능합니다")
        return;
    }
    // 작성한 포스트가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }
    // 전달할 data JSON으로 만듭니다.
    let data = {'title': title, 'author': author, 'contents': contents};
    $.ajax({
        type: "PUT",
        url: `/api/posts/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('포스트 변경에 성공하였습니다.');
            window.location.reload();
        }
    });
}

// 메모를 삭제합니다.
function deleteOne() {
    let id = location.search.split('=')[1]
    let author = $('#author').text()
    let cur_username = $('#username').text()

    if (cur_username != author) {
        alert("자신이 작성한 글만 삭제가 가능합니다")
        return;
    }

    $.ajax({
        type: "DELETE",
        url: `/api/posts/${id}`,
        success: function (response) {
            alert('게시글 삭제에 성공하였습니다.');
            window.location.href = "/";
        }
    })
}

//////// comment
function getComment() {
    // let id = location.search.split('=')[1]
    $('#comment-box').empty();
    $.ajax({
        type: 'GET',
        url: `/api/comments/${id}`,
        success: function (response) {
            addComment(response['id'], response['author'], response['contents'], response['modifiedAt'])
        }
    })
}

function addComment(id, author, contents, modifiedAt) {
    let tempHtml = `<div id="comment-box">
                        <div class ="card">
                            <div class="card-body">
                                <p class="post-author metadata">
                                    <span id = "commentAuthor" class="author">${author}</span> <span class="date">${modifiedAt}</span>
                                </p>
                            </div>
                            <div class="card-text">
                                <p id = "commentContents" class="contents">
                                    ${contents}
                                </p>
                            </div>
                            <!-- 수정 영역 -->
                            <div class="contents">
                            <div id="commentEditArea" class="edit">
                                <textarea id="commentTextarea" class="te-edit" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                        <div class="footer">
                            <img id="commentEdit" onclick="editComment()" class="icon-start-edit" src="images/edit.png"
                                 alt="">
                            <img id="commentDelete" onclick="deleteComment()" class="icon-delete" src="images/delete.png"
                                 alt="">
                            <img id="commentSubmit" onclick="submitEditComment()" class="icon-end-edit" src="images/done.png"
                                 alt="">
                        </div>
                        </div>
                
                    </div>`
    $('#comment-box').append(tempHtml)
}

// 댓글 생성합니다.
function writeComment() {
    // 1. 작성한 댓글을 불러옵니다.
    let contents = $('#comment_contents').val();
    // 2. 작성한 댓글이 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }
    let author = $('#comment_author').text()
    // 4. 전달할 data JSON으로 만듭니다.
    let data = {'author': author, 'contents': contents};
    // 5. POST /api/comments 에 data를 전달합니다.
    $.ajax({
        type: "POST",
        url: "/api/comments",
        contentType: "application/json", // JSON 형식으로 전달함을 알리기
        data: JSON.stringify(data),//string 밖에 못주고 받으므로 json을 string 형태로 보냄
        success: function (response) {
            alert('댓글이 성공적으로 작성되었습니다.');
            window.location.reload(); //새로고침
        }
    });
}

function editComment() {
    showEdits();
    let contents = $(`.contents`).text().trim();
    $(`#commentTextarea`).val(contents);
}

function showComment() {
    $(`#commentEditArea`).show();
    $(`#commentSubmit`).show();
    $(`#commentDelete`).show();

    $(`#commentContents`).hide();
    $(`#commentEdit`).hide();
}

// // 포스트를 수정합니다.
function submitEditComment() {
    // 게시물 번호를 가져옵니다
    // let id = location.search.split('=')[1]
    // 제목, 내용, 작성자를 가져옵니다.
    let contents = $(`#commentTextarea`).val().trim();
    let author = $(`#commentAuthor`).text();
    // author 와 현재 유저네임이 같은지 확인합니다.
    let cur_username = $('#username').text();
    if (cur_username != author) {
        alert("자신이 작성한 글만 수정이 가능합니다")
        return;
    }
    // 작성한 포스트가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }
    // 전달할 data JSON으로 만듭니다.
    let data = {'author': author, 'contents': contents};
    $.ajax({
        type: "PUT",
        url: `/api/posts/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('댓글 변경에 성공하였습니다.');
            window.location.reload();
        }
    });
}

function deleteComment() {
    // let id = location.search.split('=')[1]
    let author = $('#commentAuthor').text()
    let cur_username = $('#username').text()

    if (cur_username != author) {
        alert("자신이 작성한 댓글만 삭제가 가능합니다")
        return;
    }

    $.ajax({
        type: "DELETE",
        url: `/api/posts/${id}`,
        success: function (response) {
            alert('댓글 삭제에 성공하였습니다.');
            window.location.href = "/";
        }
    })
}