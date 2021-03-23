// 사용자가 내용을 올바르게 입력하였는지 확인합니다.
function isValidContents(contents) {
    if (contents == '') {
        alert('내용을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 140) { // trim - 앞,뒤 공백 제거
        alert('공백 포함 140자 이하로 입력해주세요');
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
        alert('공백 포함 30자 이하로 입력해주세요');
        return false;
    }
    return true;
}

// 사용자가 이름을 올바르게 입력하였는지 확인합니다.
function isValidAuthor(author) {
    if (author == '') {
        alert('이름을 입력해주세요');
        return false;
    }
    if (author.trim().length > 10) {
        alert('공백 포함 10자 이하로 입력해주세요');
        return false;
    }
    return true;
}

// 수정 버튼을 눌렀을 때, 기존 작성 내용을 textarea 에 전달합니다.
// 숨길 버튼을 숨기고, 나타낼 버튼을 나타냅니다.
function editPost(id) {
    showEdits(id);
    let contents = $(`#${id}-contents`).text().trim();
    $(`#${id}-textarea`).val(contents);
}

function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-contents`).hide();
    $(`#${id}-edit`).hide();
}

function hideEdits(id) {
    $(`#${id}-editarea`).hide();
    $(`#${id}-submit`).hide();
    $(`#${id}-delete`).hide();

    $(`#${id}-contents`).show();
    $(`#${id}-edit`).show();
}

$(document).ready(function () {
    // HTML 문서를 로드할 때마다 실행합니다.
    getMessages();
})

// 포스트를 불러와서 보여줍니다.
function getMessages() {
    // 1. 기존 포스트 내용을 지웁니다.
    $('#cards-box').empty();
    // 2. 포스트 목록을 불러와서 HTML로 붙입니다.
    $.ajax({
        type: 'GET',
        url: '/api/posts',
        success: function (response) {
            for (let i=0; i<response.length; i++){
                let post = response[i];
                let id = post.id;
                let title = post.title;
                let author = post.author;
                let contents = post.contents;
                let modifiedAt = post.modifiedAt;
                addHTML(id, title, author, contents, modifiedAt)
            }
        }

    })
}


// 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
function addHTML(id, title, author, contents, modifiedAt) {
    // 1. HTML 태그를 만듭니다.
    let tempHtml = `<div class="card">
            <!-- date/username 영역 -->
            <div class="metadata">
                <div id="${id}-author" class="author">
                    ${author}
                </div>
                <div class="date">
                    ${modifiedAt}
                </div>
            </div>
            <div id="${id}-title" class="title" data-toggle="modal" data-target="#modal-post">
                ${title}
            </div>
            <!-- 수정 영역 -->
            <div class="contents">

                <div id="${id}-editarea" class="edit">
                    <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                </div>
            </div>
            <div class="footer">
                <img id="${id}-edit" onclick="editPost('${id}')" class="icon-start-edit" src="images/edit.png"
                     alt="">
                <img id="${id}-delete" onclick="deleteOne('${id}')" class="icon-delete" src="images/delete.png"
                     alt="">
                <img id="${id}-submit" onclick="submitEdit('${id}')" class="icon-end-edit" src="images/done.png"
                     alt="">
            </div>
        </div>
        <!-- 모달 포스트 -->
        <div class="modal fade" id="modal-post" role="dialog" aria-labelledby="introHeader" aria-hidden="true"
             tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                            <div id="${id}-title" class="title">
                                ${title}
                            </div>
                            <div class="metadata">
                                <div id="${id}-author" class="author">
                                    ${author}
                                </div>
                                <div class="date">
                                    ${modifiedAt}
                                </div>
                            </div>
                    </div>
                    <div class="modal-body">
                        <!-- 아래 영역-->
                        <div class="footer card-body text-secondary">
                            <div id="${id}-contents" class="contents">
                                ${contents}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    // 2. #cards-box 에 HTML을 붙인다.
    $('#cards-box').append(tempHtml);
}


// 메모를 생성합니다.
function writePost() {
    // 1. 작성한 메모를 불러옵니다.
    let contents = $('#contents').val();
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }
    let title = $('#title').val();
    if (isValidTitle(title) == false) {
        return;
    }
    let author = $('#author').val();
    if (isValidAuthor(author) == false) {
        return;
    }
    // 4. 전달할 data JSON으로 만듭니다.
    let data = {'title': title, 'author': author, 'contents': contents};
    // 5. POST /api/memos 에 data를 전달합니다.
    $.ajax({
        type: "POST",
        url: "/api/posts",
        contentType: "application/json", // JSON 형식으로 전달함을 알리기
        data: JSON.stringify(data),//string 밖에 못주고 받으므로 json을 string 형태로 보냄
        success: function (response) {
            alert('게시글 성공적으로 작성되었습니다.');
            window.location.reload(); //새로고침
        }
    });
}


// 포스트를 수정합니다.
function submitEdit(id) {
    // 1. 작성 대상 포스트의 author와 contents 를 확인합니다.
    let title = $(`#${id}-title`).text().trim();
    let author = $(`#${id}-author`).text().trim();
    let contents = $(`#${id}-textarea`).val().trim();
    // 2. 작성한 포스트가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }
    // 3. 전달할 data JSON으로 만듭니다.
    let data = {'title': title, 'author': author, 'contents': contents};
    // 4. PUT /api/memos/{id} 에 data를 전달합니다.
    $.ajax({
        type: "PUT",
        url: `/api/posts/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지 변경에 성공하였습니다.');
            window.location.reload();
        }
    });
}

// 메모를 삭제합니다.
function deleteOne(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/posts/${id}`,
        success: function (response) {
            alert('메시지 삭제에 성공하였습니다.');
            window.location.reload();
        }
    })
}