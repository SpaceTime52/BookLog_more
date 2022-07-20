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
                              <nav id="nav" class="navbar navbar-default">

                              </nav>
                              <!-- Nav of the page -->
                          </div>
                        </div>
                    </div>
                    </div>
                    <section class="widget profile-widget p-5" id="head-section">
                    <h2>단 한 권의 책만 <br>읽은 사람을 경계하라</h2>
                    <p class='m-0'> 책을 접할 때에도 다양한 관점을 가지는 게 좋습니다. 서로 읽은 책을 공유하면서 인사이트를 나누어요.<br>/이 페이지는 팀프로젝트로 제작되었습니다./</p>
                    </section>
                </header> `;

  $("#header-slot").append(nav_html);
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

// function render_nav(nickname, title) {
//   let nav_html = `<nav class="navbar bg-light justify-content-md-center" id="nav">
//       <div class="container-fluid px-5 bg-white">
//         <a class="navbar-brand" href='/'>
//         HOME
//         </a>
//         <ul class="nav justify-content-end">
//           <li class="nav-item">
//             <a class="nav-link active text-dark" id="for_control_1" aria-current="page" href="/login">로그인</a>
//           </li>
//           <li class="nav-item">
//             <a class="nav-link text-dark"id="for_control_2" href='/register'>회원가입</a>
//           </li>
//           <li class="nav-item">
//             <a class="nav-link text-dark disabled is-hidden" id="nickname"></a>
//             <a class="nav-link text-dark is-hidden" id="logout" onclick="click_logout()">로그아웃</a>
//           </li>
//         </ul>
//       </div>
//       </nav>
//       <div class="book-top-bar"> </div>
//       `;

//   $("#header_above").append(nav_html);
// }

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
