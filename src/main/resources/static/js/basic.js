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
            for (let i = response.length-1; i > -1; i--) {
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
                        <a id="${id}-title" class="title" href="/detail?id=${JSON.stringify(id)}">
                            ${title}
                        </a>
                    </div>`;
    // 2. #cards-box 에 HTML을 붙인다.
    $('#cards-box').append(tempHtml);
}

// 포스트 생성합니다.
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
    let author = $('#author').text()
    // 4. 전달할 data JSON으로 만듭니다.
    let data = {'title': title, 'author': author, 'contents': contents};
    // 5. POST /api/memos 에 data를 전달합니다.
    $.ajax({
        type: "POST",
        url: "/api/posts",
        contentType: "application/json", // JSON 형식으로 전달함을 알리기
        data: JSON.stringify(data),//string 밖에 못주고 받으므로 json을 string 형태로 보냄
        success: function (response) {
            alert('게시글이 성공적으로 작성되었습니다.');
            window.location.reload(); //새로고침이
        }
    });
}

function logout() {
    alert('로그아웃 되었습니다.');
}