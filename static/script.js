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
                                  <li class="nav-item">
                                    <a class="nav-link text-dark" style="display: inline-block;" id="for_control_1" aria-current="page" href="javascript:open_loginModal();">로그인</a>
                                  </li>
                                  <li class="nav-item">
                                    <a class="nav-link text-dark" style="display: inline-block;" id="for_control_2" href='javascript:open_resgisterModal();'>회원가입</a>
                                  </li>
                                  <li class="nav-item">
                                    <a class="nav-link text-dark disabled is-hidden" style="display: inline-block;" id="nickname"></a>
                                    <a class="nav-link text-dark is-hidden" style="display: inline-block;" id="logout" onclick="click_logout()">로그아웃</a>
                                  </li>
                                </ul>
                              </nav>
                              <!-- Nav of the page -->
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
                            />
                            <input
                              type="password"
                              class = "mb-3"
                              id="input-password"
                              placeholder="비밀번호를 입력하세요."
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
                            class = "mb-3"
                            id="input-username-signup"
                            placeholder="아이디"
                          />
                          <p id="help-id" class="help"> 아이디는 2-10자의 영문과 숫자와 일부 특수문자(._-)만 입력 가능합니다.</p>
                          <p id="help-id-login" class="help is-danger"></p>

                          <input
                            type="password"
                            class = "mb-3"
                            id="input-password1"
                            placeholder="비밀번호"
                          />
                          <p id="help-password" class="help"> 영문과 숫자 조합의 8-20자의 비밀번호를 설정해주세요. 특수문자(!@#$%^&*)도 사용 가능합니다.</p>

                          <input
                            type="password"
                            class = "mb-3"
                            id="input-password2"
                            placeholder="비밀번호 재입력"
                          />
                          <p id="help-password2" class="help"> 비밀번호를 다시 한 번 입력해주세요. </p>

                          <input
                            type="text"
                            class = "mb-3"
                            id="input-nickname"
                            placeholder="닉네임"
                          />
                          <p id="help-nickname" class="help"> 닉네임은 한글 2~4글자만 가능합니다. </p>
                          
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
}

// ------------------------------------------

function sign_in() {
  let username = $("#input-username").val();
  let password = $("#input-password").val();

  if (username == "") {
    $("#help-id-login").text("아이디를 입력해주세요.");
    $("#input-username").focus();

    return;
  } else {
    $("#help-id-login").text("");
  }

  if (password == "") {
    $("#help-password-login").text("비밀번호를 입력해주세요.");
    $("#input-password").focus();
    return;
  } else {
    $("#help-password-login").text("");
  }

  $.ajax({
    type: "POST",
    url: "/login/sign_in",
    data: {
      username_give: username,
      password_give: password,
    },
    success: function (response, id) {
      if (response["result"] == "success") {
        $.cookie("mytoken", response["token"], { path: "/" });
        login_check(response);

        window.location.replace("/");
      } else {
        alert(response["msg"]);
      }
    },
  });
}

function login_check(response) {
  let check = response["result"];
  let check_id = response["id"];

  $.ajax({
    type: "POST",
    url: "/login/login_check",
    data: {
      check_done_give: check,
      check_id_give: check_id,
    },
    success: function (nickname) {
      console.log(nickname);
    },
  });
}

function is_password(asValue) {
  let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
  return regExp.test(asValue);
}

function is_nick(asValue) {
  let regExp = /^[가-힣]{2,4}$/;
  return regExp.test(asValue);
}

function toggle_sign_up() {
  window.location.href = "/register";
}

function sign_up() {
  let username = $("#input-username").val();
  let password = $("#input-password").val();
  let password2 = $("#input-password2").val();
  let nickname = $("#input-nickname").val();

  if ($("#help-id").hasClass("is-danger")) {
    alert("아이디를 다시 확인해주세요.");
    return;
  } else if (!$("#help-id").hasClass("is-success")) {
    alert("아이디 중복확인을 해주세요.");
    return;
  }

  if (password == "") {
    $("#help-password")
      .text("비밀번호를 입력해주세요.")
      .removeClass("is-safe")
      .addClass("is-danger");
    $("#input-password").focus();
    return;
  } else if (!is_password(password)) {
    $("#help-password")
      .text(
        "비밀번호의 형식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*) 사용가능 8-20자"
      )
      .removeClass("is-safe")
      .addClass("is-danger");
    $("#input-password").focus();
    return;
  } else {
    $("#help-password")
      .text("사용할 수 있는 비밀번호입니다.")
      .removeClass("is-danger")
      .addClass("is-success");
  }
  if (password2 == "") {
    $("#help-password2")
      .text("비밀번호를 입력해주세요.")
      .removeClass("is-safe")
      .addClass("is-danger");
    $("#input-password2").focus();
    return;
  } else if (password2 != password) {
    $("#help-password2")
      .text("비밀번호가 일치하지 않습니다.")
      .removeClass("is-safe")
      .addClass("is-danger");
    $("#input-password2").focus();
    return;
  } else {
    $("#help-password2")
      .text("비밀번호가 일치합니다.")
      .removeClass("is-danger")
      .addClass("is-success");
  }
  if (!is_nick(nickname)) {
    $("#help-nickname")
      .text("닉네임의 형식을 확인해주세요.한글 2~4자 사용 가능")
      .removeClass("is-safe")
      .addClass("is-danger");
    $("#input-nickname").focus();
    return;
  }
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
      window.location.replace("/login");
    },
  });
}

// 정규표현식 검증 함수
function is_nickname(asValue) {
  let regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
  return regExp.test(asValue);
}

function is_password(asValue) {
  let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
  return regExp.test(asValue);
}
function is_nick(asValue) {
  let regExp = /^[가-힣]{2,4}$/;
  return regExp.test(asValue);
}

//아이디 중복확인 함수
function check_dup() {
  let username = $("#input-username").val();

  if (username == "") {
    $("#help-id")
      .text("아이디를 입력해주세요.")
      .removeClass("is-safe")
      .addClass("is-danger");
    $("#input-username").focus();
    return;
  }
  if (!is_nickname(username)) {
    $("#help-id")
      .text(
        "아이디의 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-10자 길이"
      )
      .removeClass("is-safe")
      .addClass("is-danger");
    $("#input-username").focus();
    return;
  }

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
        $("#input-username").focus();
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
function toggle_sign_up() {
  window.location.replace("/");
}

// (function (factory) {
//   if (typeof define === "function" && define.amd) {
//     define(["jquery"], factory);
//   } else if (typeof exports === "object") {
//     factory(require("jquery"));
//   } else {
//     factory(jQuery);
//   }
// })(function ($) {
//   var pluses = /\+/g;
//   function encode(s) {
//     return config.raw ? s : encodeURIComponent(s);
//   }
//   function decode(s) {
//     return config.raw ? s : decodeURIComponent(s);
//   }
//   function stringifyCookieValue(value) {
//     return encode(config.json ? JSON.stringify(value) : String(value));
//   }
//   function parseCookieValue(s) {
//     if (s.indexOf('"') === 0) {
//       s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
//     }
//     try {
//       s = decodeURIComponent(s.replace(pluses, " "));
//       return config.json ? JSON.parse(s) : s;
//     } catch (e) {}
//   }
//   function read(s, converter) {
//     var value = config.raw ? s : parseCookieValue(s);
//     return $.isFunction(converter) ? converter(value) : value;
//   }
//   var config = ($.cookie = function (key, value, options) {
//     if (arguments.length > 1 && !$.isFunction(value)) {
//       options = $.extend({}, config.defaults, options);

//       if (typeof options.expires === "number") {
//         var days = options.expires,
//           t = (options.expires = new Date());
//         t.setTime(+t + days * 864e5);
//       }
//       return (document.cookie = [
//         encode(key),
//         "=",
//         stringifyCookieValue(value),
//         options.expires ? "; expires=" + options.expires.toUTCString() : "", // use expires attribute, max-age is not supported by IE
//         options.path ? "; path=" + options.path : "",
//         options.domain ? "; domain=" + options.domain : "",
//         options.secure ? "; secure" : "",
//       ].join(""));
//     }

//     var result = key ? undefined : {};

//     var cookies = document.cookie ? document.cookie.split("; ") : [];

//     for (var i = 0, l = cookies.length; i < l; i++) {
//       var parts = cookies[i].split("=");
//       var name = decode(parts.shift());
//       var cookie = parts.join("=");

//       if (key && key === name) {
//         result = read(cookie, value);
//         break;
//       }

//       if (!key && (cookie = read(cookie)) !== undefined) {
//         result[name] = cookie;
//       }
//     }

//     return result;
//   });

//   config.defaults = {};

//   $.removeCookie = function (key, options) {
//     if ($.cookie(key) === undefined) {
//       return false;
//     }

//     $.cookie(key, "", $.extend({}, options, { expires: -1 }));
//     return !$.cookie(key);
//   };
// });

//------------------------------------------------------------------

// function click_logout() {
//   $.removeCookie = function (key, options) {
//     if ($.cookie(key) === undefined) {
//       return false;
//     }

//     $.cookie(key, "", $.extend({}, options, { expires: -1 }));
//     return !$.cookie(key);
//   };
//   $.removeCookie("mytoken", { path: "/" });
//   alert("로그아웃이 되었습니다.");

//   window.location.href = "/";
// }

// function addNickname() {
//   $.ajax({
//     type: "POST",
//     url: "/index/addnick",
//     data: {},
//     success: function (nick) {
//       $("#nickname").text(nick["nick"] + " 님");
//     },
//   });
// }

// function hidebtn() {
//   if (document.cookie != "") {
//     console.log("로그인이 되어있습니다.");
//     $("#for_control_1").hide();
//     $("#for_control_2").hide();
//     $("#nickname").toggleClass("is-hidden");
//     $("#logout").toggleClass("is-hidden");
//     addNickname();
//   } else {
//     console.log("로그인이 되어있지 않습니다.");
//     $("#nickname").hide();
//     $("#logout").hide();
//   }
// }
