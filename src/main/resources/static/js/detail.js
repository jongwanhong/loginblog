$(document).ready(function () {
    backHome()
    getDetail()
    $('.comment__card-box').empty();
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

// 사용자가 제목을 올바르게 입력하였는지 확인합니다.
function isValidTitle(title) {
    if (title == '') {
        alert('제목을 입력해주세요');
        return false;
    }
    if (title.trim().length > 30) {
        alert('제목을 공백 포함 30자 이하로 입력해주세요');
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