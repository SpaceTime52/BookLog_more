function getNicknameLoggedIn() {
  console.log(checkLogin()["nickname"]);
  return;
}

//쿠키가 있으면 답변을 받을 수 있을거임
function checkLogin() {
  $.ajax({
    type: "GET",
    url: "/check-login",
    data: {},
    success: function (response) {
      if (response["username"]) {
        $("#nav1_beforeLogin").addClass("d-none");
        $("#nav2_beforeLogin").addClass("d-none");
        $("#nav1_afterLogin").removeClass("d-none");
        $("#nav2_afterLogin").removeClass("d-none");
        $("#nickname_nav").text(response["nickname"]);

        return response;
      } else {
        console.log(response["msg"]);
      }
    },
  });
}

function render_nav() {
  let nav_html = `
                <header id="header" class="version-ii">
                  <div class="stick-holder">
                  <div class="container">
                      <div class="row holder">
                        <div class="col-xs-3 col-sm-2">
                            <!-- Logo of the page -->
                            <div class="logo">
                            <a href="/" style='text-decoration:none;'
                                ><i class="fa-solid fa-book fa-2xl" style='color: #333;'></i></a>
                            </div>
                            <!-- Logo of the page end -->
                        </div>
                        <div class="col-xs-9 col-sm-10 nav-holder">

                            <!-- Nav of the page -->
                            <nav id="nav" class="nav justify-content-end">
                              <ul class="nav">

                                <!-- Nav of the page -->
                                <li id="nav1_beforeLogin" class="nav-item m-2">
                                  <a class="nav-link text-dark d-block" id="login_nav" aria-current="page" href="javascript:open_loginModal();">로그인</a>
                                </li>
                                <li id="nav2_beforeLogin" class="nav-item m-2">
                                  <a class="nav-link text-dark d-block" id="register_nav" href='javascript:open_resgisterModal();'>회원가입</a>
                                </li>
                                <!-- Nav of the page -->

                                <!-- Nav of the page : after Login -->
                                <li id="nav1_afterLogin" class="nav-item m-2  d-none">
                                  <a class="nav-link text-dark d-block " id="nickname_nav"></a>
                                </li>
                                <li id="nav2_afterLogin" class="nav-item m-2  d-none">
                                  <a class="nav-link text-dark d-block" id="logout_nav" onclick="click_logout()">로그아웃</a>
                                </li>
                                <!-- Nav of the page : after Login -->

                              </ul>
                            </nav>

                        </div>
                      </div>
                  </div>
                  </div>
                  <section class="widget profile-widget p-5" id="head-section">
                  <h2>" 단 한 권의 책만 <br>읽은 사람을 경계하라 "</h2>
                  <p class='m-0'> 책을 접할 때에도 다양한 관점을 가지는 게 좋습니다. 서로 읽은 책을 공유하면서 인사이트를 나누어요.<br>/이 페이지는 팀프로젝트로 제작되었습니다./</p>
                  </section>
              </header> `;

  $("#header-slot").append(nav_html);
}

function render_loginRegisterModal() {
  let modal_html = `
                  <!-- Login Modal -->
                  <div class="modal fade" id="loginModal" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div class="modal-content">

                        <div class="modal-header">
                          <h5 class="modal-title" id="loginModalLabel">로그인</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">
                          <div class="widget widget_search m-0">
                            <input
                              type="text"
                              class = "mb-3"
                              id="input-username"
                              placeholder="아이디를 입력하세요."
                              onKeypress="javascript:if(event.keyCode==13){checkFill();}"
                            />
                            <input
                              type="password"
                              class = "mb-3"
                              id="input-password"
                              placeholder="비밀번호를 입력하세요."
                              onKeypress="javascript:if(event.keyCode==13){checkFill();}"
                            />
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-warning" onclick="sign_in()">로그인</button>
                          <button type="button" class="btn btn-warning" data-bs-dismiss="modal">취소</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Login Modal End -->
                  
                  <!-- Register Modal -->
                  <div class="modal fade" id="registerModal" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">

                      <div class="modal-header">
                        <h5 class="modal-title" id="registerModalLabel">회원 가입</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                      </div>

                      <div class="modal-body">
                        <div class="widget widget_search m-0">

                          <input
                            type="text"
                            class = "mb-1"
                            id="input-username-signup"
                            placeholder="아이디"
                          />
                          
                          <p id="help-id" class="help"> 아이디는 6-10자의 영문과 숫자와 일부 특수문자(._-)만 입력 가능합니다.</p>
                          <p id="help-id-login" class="help is-danger"></p>

                          <input
                            type="password"
                            class = "mb-1"
                            id="input-password1"
                            placeholder="비밀번호"
                          />
                          <p id="help-password" class="help"> 영문과 숫자 조합의 8-20자의 비밀번호를 설정해주세요. 특수문자(!@#$%^&*)도 사용 가능합니다.</p>

                          <input
                            type="password"
                            class = "mb-1"
                            id="input-password2"
                            placeholder="비밀번호 재입력"
                          />
                          <p id="help-password2" class="help"> 비밀번호를 다시 한 번 입력해주세요. </p>

                          <input
                            type="text"
                            class = "mb-1"
                            id="input-nickname"
                            placeholder="닉네임"
                          />
                          <p id="help-nickname" class="help"> 닉네임은 한글 또는 영문 3~7글자만 가능합니다. </p>
                          
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-warning" onclick="sign_up()">회원 가입</button>
                        <button type="button" class="btn btn-warning" data-bs-dismiss="modal" >취소</button>
                      </div>
                    </div>
                  </div>
                  </div>
                  <!-- Register Modal End -->
                  `;

  $("body").append(modal_html);
}

function open_loginModal() {
  $("#loginModal").modal("show");
}

function open_resgisterModal() {
  $("#registerModal").modal("show");

  let idOnInput = document.getElementById("input-username-signup");
  idOnInput.addEventListener("input", (event) => {
    let username = event.target.value;

    if (username == "") {
      $("#help-id")
        .text("아이디를 입력해주세요.")
        .removeClass("is-safe")
        .addClass("is-danger");
    } else if (!iDchecker(username)) {
      $("#help-id")
        .text(
          "아이디의 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-10자 길이"
        )
        .removeClass("is-safe")
        .addClass("is-danger");
    } else {
      $("#help-id").addClass("is-loading");

      $.ajax({
        type: "POST",
        url: "/register/check_dup",
        data: {
          username_give: username,
        },
        success: function (response) {
          if (response["exists"]) {
            $("#help-id")
              .text("이미 존재하는 아이디입니다.")
              .removeClass("is-safe")
              .addClass("is-danger");
          } else {
            $("#help-id")
              .text("사용할 수 있는 아이디입니다.")
              .removeClass("is-danger")
              .addClass("is-success");
          }
          $("#help-id").removeClass("is-loading");
        },
      });
    }
  });

  let pw_1onInput = document.getElementById("input-password1");
  pw_1onInput.addEventListener("input", (event) => {
    let password = event.target.value;

    if (password == "") {
      $("#help-password")
        .text("비밀번호를 입력해주세요.")
        .removeClass("is-safe")
        .addClass("is-danger");
    } else if (!pWchecker(password)) {
      $("#help-password")
        .text(
          "비밀번호의 형식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*) 사용가능 8-20자"
        )
        .removeClass("is-safe")
        .addClass("is-danger");
    } else {
      $("#help-password")
        .text("사용할 수 있는 비밀번호입니다.")
        .removeClass("is-danger")
        .addClass("is-success");
    }
  });

  let pw_2onInput = document.getElementById("input-password2");
  pw_2onInput.addEventListener("input", (event) => {
    let password2 = event.target.value;
    let password1 = document.getElementById("input-password1").value;

    if (password2 == "") {
      $("#help-password2")
        .text("비밀번호를 입력해주세요.")
        .removeClass("is-safe")
        .addClass("is-danger");
    } else if (password2 != password1) {
      $("#help-password2")
        .text("입력하신 두개의 비밀번호가 일치하지 않습니다.")
        .removeClass("is-safe")
        .addClass("is-danger");
    } else {
      $("#help-password2")
        .text("비밀번호가 일치합니다.")
        .removeClass("is-danger")
        .addClass("is-success");
    }
  });

  let nick_onInput = document.getElementById("input-nickname");
  nick_onInput.addEventListener("input", (event) => {
    let nickname = event.target.value;

    if (nickname == "") {
      $("help-nickname")
        .text("리뷰를 작성하실 때 활용할 닉네임을 설정해주세요.")
        .removeClass("is-safe")
        .addClass("is-danger");
    } else if (!nicknameChecker(nickname)) {
      $("#help-nickname")
        .text("닉네임의 형식을 확인해주세요.한글 또는 영문 3~7자 사용 가능")
        .removeClass("is-safe")
        .addClass("is-danger");
    } else {
      $("#help-nickname").addClass("is-loading");

      $.ajax({
        type: "POST",
        url: "/register/check_nickname",
        data: {
          nickname_tocheck: nickname,
        },
        success: function (response) {
          if (response["exists"]) {
            $("#help-nickname")
              .text("이미 존재하는 닉네임입니다.")
              .removeClass("is-safe")
              .addClass("is-danger");
          } else {
            $("#help-nickname")
              .text("닉네임으로 사용 가능합니다.")
              .removeClass("is-danger")
              .addClass("is-success");
          }
          $("#help-nickname").removeClass("is-loading");
        },
      });
    }
  });
}

// ------------------------------------------

function checkFill() {
  let username = $("#input-username").val();
  let password = $("#input-password").val();

  if (!username) {
    alert("ID를 입력해주세요");
  } else if (!password) {
    alert("비밀번호를 입력해주세요");
  } else {
    sign_in();
  }
}

function sign_in() {
  let username = $("#input-username").val();
  let password = $("#input-password").val();

  $.ajax({
    type: "POST",
    url: "/login/sign_in",
    data: {
      username_give: username,
      password_give: password,
    },
    success: function (response, id) {
      if (response["result"] == "success") {
        console.log(response["id"], response["nickname"], "로그인 완료");

        // 토큰을 받아 쿠키 "/" 경로에 담음
        $.cookie("mytoken", response["token"], { path: "/" });

        // 로그인이 되었으므로 로그인 창 닫고 메뉴 바꿈
        $("#loginModal").modal("hide");
        checkLogin();
      } else {
        alert(response["msg"]);
      }
    },
  });
} // 쿠키, 세션 등록 필요함

function sign_up() {
  let username = $("#input-username-signup").val();
  let password = $("#input-password1").val();
  let nickname = $("#input-nickname").val();

  if (
    $("#help-id").hasClass("is-success") &&
    $("#help-password").hasClass("is-success") &&
    $("#help-password2").hasClass("is-success") &&
    $("#help-nickname").hasClass("is-success")
  ) {
    $.ajax({
      type: "POST",
      url: "/register/sign_up",
      data: {
        username_give: username,
        password_give: password,
        nickname_give: nickname,
      },
      success: function (response) {
        alert("회원가입을 축하드립니다!");
        $("#registerModal").modal("hide");

        $("#input-password1").val("");
        $("#input-password2").val("");
        $("#input-nickname").val("");

        open_loginModal();

        $("#input-username").val($("#input-username-signup").val());
        $("#input-username-signup").val("");
      },
    });
  } else {
    alert("기입하신 내용을 확인해주세요.");
  }
}

// 정규표현식 검증 함수
function iDchecker(username) {
  let regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{6,10}$/;
  return regExp.test(username);
}

function pWchecker(pw) {
  let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
  return regExp.test(pw);
}

function nicknameChecker(nickname) {
  let regExp = /^[가-힣0-9a-zA-Z]{3,7}$/;
  return regExp.test(nickname);
}

function click_logout() {
  if (confirm("로그아웃 하시겠습니까?")) {
    // 로그아웃 되면
    $("#nav1_beforeLogin").removeClass("d-none");
    $("#nav2_beforeLogin").removeClass("d-none");
    $("#nav1_afterLogin").addClass("d-none");
    $("#nav2_afterLogin").addClass("d-none");

    alert("로그아웃이 완료되었습니다.");

    $.removeCookie("mytoken", { path: "/" });
  }
}
