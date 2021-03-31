$(document).ready(function () {
    backHome()
    getId()
    showHide()
    deleteOne()
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


function getId() {
    let id = location.search.split('=')[1]
    getDetail(id)
    getComment(id)
}

function backHome() {
    $('#home').on('click', function () {
        window.location.href = "/"
    })
}

function getDetail(id) {
    // $('.content_container').empty();
    let idx = id
    $.ajax({
        type: 'GET',
        url: `/api/detail/${idx}`,
        success: function (response) {
            addDetail(response['id'], response['author'], response['title'], response['contents'], response['modifiedAt'])
        }
    })
}

function addDetail(id, author, title, contents, modifiedAt) {
    let tempHtml = `<div id="cards-box">
        <div class ="card">
            <div class="card-body">
                <h2 class="title">${title}</h2>
                <p class="post-author metadata">
                    <span class="author">${author}</span> <span class="date">${modifiedAt}</span>
                </p>
            </div>
            <div class="card-text">
                <p class="contents">
                    ${contents}
                </p>
            </div>
        </div>
    </div>`
    $('#cards-box').append(tempHtml)
}

function showHide() {
    $('#edit').on('click', function () {
        let username = $('.username').text()
        let cur_username = $('.username01').text()
        if (cur_username != username) {
            alert("자신이 작성한 글만 수정이 가능합니다!")
            return;
        }
        $('.detail').hide()
        $('.detail__edit').show()
        let title = $('.title').text()
        let contents = $('.contents').text().trim()
        let author = $('.post-author').text().trim()
        $('.post-author-edit').text(author)
        $('.detail-input').val(title)
        $('.detail-textarea').val(contents)
    })
    $('.cancel').on('click', function () {
        $('.detail').show()
        $('.detail__edit').hide()
        $('.detail-input').val('')
        $('.detail-textarea').val('')
    })
}

// 포스트를 수정합니다.
function submitEdit() {
    let id = location.search.split('=')[1]
    let title = $('.detail-input').text().trim();
    let contents = $('.detail-textarea').val().trim();
    let author = $('.author').text().trim();
    // 작성한 포스트가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }
    if (isValidTitle(title) == false) {
        return;
    }
    // 전달할 data JSON으로 만듭니다.
    let data = {'title': title, 'author': author, 'contents': contents};
    // PUT /api/memos/{id} 에 data를 전달합니다.
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

// 포스트를 삭제합니다.
function deleteOne() {
    $('#delete').on('click', function () {
        let author = $('.author').text()
        let cur_username = $('.username01').text()

        if (cur_username != author) {
            alert("자신이 작성한 글만 삭제가 가능합니다")
            return;
        }
        let id = location.search.split('=')[1]
        $.ajax({
            type: "DELETE",
            url: `/api/posts/${id}`,
            success: function (response) {
                alert('게시글 삭제에 성공하였습니다');
                window.location.href = "/ ";
            }
        })
    })
}