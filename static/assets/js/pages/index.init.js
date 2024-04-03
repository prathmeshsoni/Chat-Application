var input, filter, ul, li, a, i, j, div;

function searchUser() {
    for (input = document.getElementById("searchChatUser"), filter = input.value.toUpperCase(), ul = document.querySelector(".chat-room-list"), li = ul.getElementsByTagName("li"), i = 0; i < li.length; i++) {
        -1 < li[i].querySelector("p").innerText.toUpperCase().indexOf(filter) ? li[i].style.display = "" : li[i].style.display = "none"
    }
}

function searchContacts() {
    for (input = document.getElementById("searchContact"), filter = input.value.toUpperCase(), list = document.querySelector(".sort-contact"), li = list.querySelectorAll(".mt-3 li"), div = list.querySelectorAll(".mt-3 .contact-list-title"), j = 0; j < div.length; j++) {
        var e = div[j];
        txtValue = e.innerText, -1 < txtValue.toUpperCase().indexOf(filter) ? div[j].style.display = "" : div[j].style.display = "none"
    }
    for (i = 0; i < li.length; i++) contactName = li[i], txtValue = contactName.querySelector("h5").innerText, -1 < txtValue.toUpperCase().indexOf(filter) ? li[i].style.display = "" : li[i].style.display = "none"
}

function searchContactOnModal() {
    for (input = document.getElementById("searchContactModal"), filter = input.value.toUpperCase(), list = document.querySelector(".contact-modal-list"), li = list.querySelectorAll(".mt-2 li"), div = list.querySelectorAll(".mt-2 .contact-list-title"), j = 0; j < div.length; j++) {
        var e = div[j];
        txtValue = e.innerText, -1 < txtValue.toUpperCase().indexOf(filter) ? div[j].style.display = "" : div[j].style.display = "none"
    }
    for (i = 0; i < li.length; i++) contactName = li[i], txtValue = contactName.querySelector("h5").innerText, -1 < txtValue.toUpperCase().indexOf(filter) ? li[i].style.display = "" : li[i].style.display = "none"
}

function searchBookmark() {
    for (var e, t = document.getElementById("searchbookmark").value.toUpperCase(), a = document.getElementById("chat-bookmark-list").getElementsByTagName("li"), s = 0; s < a.length; s++) -1 < ((e = a[s].getElementsByTagName("a")[0]).textContent || e.innerText).toUpperCase().indexOf(t) ? a[s].style.display = "" : a[s].style.display = "none"
}

function getLocation() {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(showPosition) : x.innerHTML = "Geolocation is not supported by this browser."
}

function showPosition(e) {
    x.innerHTML = "Latitude: " + e.coords.latitude + "<br>Longitude: " + e.coords.longitude
}

function cameraPermission() {
    navigator.mediaDevices.getUserMedia ? navigator.mediaDevices.getUserMedia({video: !0}).then(function (e) {
        video.srcObject = e
    }).catch(function (e) {
        console.log(e)
    }) : console.log("No")
}

function audioPermission() {
    navigator.mediaDevices.getUserMedia({audio: !0}).then(function (e) {
        window.localStream = e, window.localAudio.srcObject = e, window.localAudio.autoplay = !0
    })
}

function themeColor(e) {
    var t = localStorage.getItem("activeCustomcolor");
    t && (document.getElementById(t).checked = !0), document.querySelectorAll(".theme-color").forEach(function (i) {
        var e, t, a = document.querySelector("input[name=bgcolor-radio]:checked");
        a && (a = a.id, e = document.getElementsByClassName(a), t = window.getComputedStyle(e[0], null).getPropertyValue("background-color"), rgbColorPrimary = t.substring(t.lastIndexOf("(") + 1, t.lastIndexOf(")"))), i.addEventListener("click", function (e) {
            i.id && localStorage.setItem("activeCustomcolor", i.id);
            var t, a, s = document.querySelector("input[name=bgcolor-radio]:checked");
            s && (s = s.id, (t = document.getElementsByClassName(s)) && (a = window.getComputedStyle(t[0], null).getPropertyValue("background-color"), rgbColorPrimary = a.substring(a.lastIndexOf("(") + 1, a.lastIndexOf(")")), window.localStorage.setItem("colorPrimary", rgbColorPrimary), document.documentElement.style.setProperty("--bs-primary-rgb", window.localStorage.getItem("colorPrimary"))))
        })
    }), document.querySelectorAll(".colorpicker-primary").forEach(function () {
        var e = localStorage.getItem("colorPrimary") ? "rgba(" + localStorage.getItem("colorPrimary") + ",1)" : "#6153CC",
            i = Pickr.create({
                el: ".colorpicker-primary",
                theme: "nano",
                default: e,
                swatches: null,
                defaultRepresentation: "RGBA",
                components: {
                    preview: !0,
                    opacity: !0,
                    hue: !0,
                    interaction: {hex: !1, rgba: !1, hsva: !1, input: !0, clear: !0, save: !0}
                }
            });
        i.on("clear", function (e) {
        }).on("cancel", function (e) {
        }).on("change", function (e, t, a) {
            var s = i.getColor().toRGBA().toString(0);
            rgbColorsPrimary = s.substring(s.indexOf("(") + 1, s.lastIndexOf(",")), localStorage.setItem("colorPrimary", rgbColorsPrimary), document.documentElement.style.setProperty("--bs-primary-rgb", window.localStorage.getItem("colorPrimary"))
        })
    })
}

!function () {
    var f = !1, g = "users-chat", r = "assets/images/users/user-dummy-img.jpg", d = "users", s = "assets/js/dir/",
        u = "", m = 1;

    function a() {
        var a = document.getElementsByClassName("user-chat");
        document.querySelectorAll(".chat-user-list li a").forEach(function (e) {
            e.addEventListener("click", function (e) {
                a.forEach(function (e) {
                    e.classList.add("user-chat-show")
                });
                var t = document.querySelector(".chat-user-list li.active");
                t && t.classList.remove("active"), this.parentNode.classList.add("active")
            })
        }), document.querySelectorAll(".sort-contact ul li").forEach(function (e) {
            e.addEventListener("click", function (e) {
                a.forEach(function (e) {
                    e.classList.add("user-chat-show")
                })
            })
        }), document.querySelectorAll(".user-chat-remove").forEach(function (e) {
            e.addEventListener("click", function (e) {
                a.forEach(function (e) {
                    e.classList.remove("user-chat-show")
                })
            })
        })
    }

    document.getElementById("copyClipBoard").style.display = "none", document.getElementById("copyClipBoardChannel").style.display = "none";

    function e(e, t) {
        var a = new XMLHttpRequest;
        a.open("GET", s + e, !0), a.responseType = "json", a.onload = function () {
            var e = a.status;
            t(200 === e ? null : e, a.response)
        }, a.send()
    }

    function o() {
        "users" == d ? (document.getElementById("channel-chat").style.display = "none", document.getElementById("users-chat").style.display = "block") : (document.getElementById("channel-chat").style.display = "block", document.getElementById("users-chat").style.display = "none"), H(s + "chats.json")
    }

    e("users.json", function (e, t) {
        null !== e ? console.log("Something went wrong: " + e) : (t[0].favorites.forEach(function (e, t) {
            var a = e.profile ? '<img src="' + e.profile + '" class="rounded-circle avatar-xs" alt=""><span class="user-status"></span>' : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-primary text-white"><span class="username">' + e.nickname + '</span><span class="user-status"></span></span></div>',
                s = e.messagecount ? '<div class="ms-auto"><span class="badge badge-soft-danger rounded p-1 fs-10">' + e.messagecount + "</span></div>" : "",
                i = e.messagecount ? '<a href="javascript: void(0);" class="unread-msg-user">' : '<a href="javascript: void(0);">',
                l = 1 === e.id ? "active" : "";
            document.getElementById("favourite-users").innerHTML += '<li id="contact-id-' + e.id + '" data-name="favorite" class="' + l + '">                  ' + i + '                       <div class="d-flex align-items-center">                          <div class="chat-user-img online align-self-center me-2 ms-0">                              ' + a + '                          </div>                          <div class="overflow-hidden me-2">                              <p class="text-truncate chat-username mb-0">' + e.name + '</p>                              <p class="text-truncate text-muted fs-13 mb-0">' + e.lastmessage + "</p>                          </div>                          " + s + "                      </div>                  </a>              </li>"
        }), t[0].users.forEach(function (e, t) {
            e.profile && e.profile;
            var a = e.messagecount ? '<div class="ms-auto"><span class="badge badge-soft-danger rounded p-1 fs-10">' + e.messagecount + "</span></div>" : "",
                s = e.messagecount ? '<a href="javascript: void(0);" class="unread-msg-user">' : '<a href="javascript: void(0);">',
                i = 1 === e.id ? "active" : "",
                l = e.profile ? '<img src="' + e.profile + '" class="rounded-circle avatar-xs" alt=""><span class="user-status"></span>' : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-primary text-white"><span class="username">' + e.nickname + '</span><span class="user-status"></span></span></div>';
            document.getElementById("usersList").innerHTML += '<li id="contact-id-' + e.id + '" data-name="favorite" class="' + i + '">        ' + s + '             <div class="d-flex align-items-center">                <div class="chat-user-img online align-self-center me-2 ms-0">                    ' + l + '                </div>                <div class="overflow-hidden me-2">                    <p class="text-truncate chat-username mb-0">' + e.name + '</p>                    <p class="text-truncate text-muted fs-13 mb-0">' + e.lastmessage + "</p>                </div>                " + a + "            </div>        </a>    </li>"
        }), t[0].channels.forEach(function (e, t) {
            var a = e.profile && e.profile,
                s = e.messagecount ? '<div class="flex-shrink-0 ms-2"><span class="badge badge-soft-danger rounded p-1 fs-10">' + e.messagecount + "</span></div>" : "",
                i = e.messagecount ? '<a href="javascript: void(0);" class="unread-msg-user">' : '<a href="javascript: void(0);">',
                a = e.profile ? '<img src="' + e.profile + '" class="rounded-circle avatar-xs" alt="">' : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-primary text-white"><span class="username">' + e.nickname + "</span></span></div>";
            document.getElementById("channelList").innerHTML += '<li id="contact-id-' + e.id + '" data-name="channel">                ' + i + '                     <div class="d-flex align-items-center">                        <div class="flex-shrink-0 me-2">                            <div class="chat-user-img online align-self-center">                            ' + a + '                            </div>                        </div>                        <div class="flex-grow-1 overflow-hidden">                            <h6 class="text-truncate mb-0">' + e.name + '</h6>                            <p class="text-truncate text-muted fs-13 mb-0">' + e.lastmessage + "</p>                        </div>                        <div>" + s + "</div>                    </div>                </a>            </li>"
        })), a(), document.querySelectorAll("#favourite-users li, #usersList li") && document.querySelectorAll("#favourite-users li, #usersList li").forEach(function (l) {
            l.addEventListener("click", function (e) {
                d = "users", o(), g = "users-chat";
                var t = l.getAttribute("id"), a = l.querySelector(".text-truncate").innerHTML;
                document.querySelector(".user-profile-sidebar .user-name").innerHTML = a, document.getElementById("users-chat").querySelector(".text-truncate .user-profile-show").innerHTML = a, document.querySelector(".user-profile-desc .text-truncate").innerHTML = a, document.querySelector(".chat-input-typing").style.display = "block", document.querySelector(".user-profile-status").style.display = "block", document.querySelector(".chat-input-typing .typing-user").innerHTML = a + ' is Typing<span class="typing ms-2"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>', document.querySelector(".audiocallModal .text-truncate").innerHTML = a, document.querySelector(".videocallModal .text-truncate").innerHTML = a;
                var s = document.getElementById(t).querySelector(".avatar-xs").getAttribute("src");
                s ? (document.querySelector(".user-own-img .avatar-sm").setAttribute("src", s), document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", s), document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", s), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", s)) : (document.querySelector(".user-own-img .avatar-sm").setAttribute("src", r), document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", r), document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", r), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", r));
                var i = l.querySelector(".avatar-xs").getAttribute("src");
                document.getElementById("users-conversation").querySelectorAll(".left .chat-avatar").forEach(function (e) {
                    i ? e.querySelector("img").setAttribute("src", i) : e.querySelector("img").setAttribute("src", r)
                }), window.stop()
            })
        }), document.querySelectorAll("#channelList li").forEach(function (i) {
            i.addEventListener("click", function (e) {
                g = "channel-chat", d = "channel", o();
                var t = i.getAttribute("id"), a = i.querySelector(".text-truncate").innerHTML;
                document.getElementById("channel-chat").querySelector(".text-truncate .user-profile-show").innerHTML = a, document.querySelector(".user-profile-desc .text-truncate").innerHTML = a, document.querySelector(".audiocallModal .text-truncate").innerHTML = a, document.querySelector(".videocallModal .text-truncate").innerHTML = a, document.querySelector(".user-profile-sidebar .user-name").innerHTML = a, document.querySelector(".chat-input-typing").style.display = "none", document.querySelector(".user-profile-status").style.display = "none";
                var s = document.getElementById(t).querySelector(".avatar-xs").getAttribute("src");
                null !== s ? (document.querySelector("#channel-chat .user-own-img .avatar-sm").setAttribute("src", s), document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", s), document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", s), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", s)) : (document.querySelector("#channel-chat .user-own-img .avatar-sm").setAttribute("src", r), document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", r), document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", r), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", r))
            })
        })
    }), e("callList.json", function (e, t) {
        null !== e ? console.log("Something went wrong: " + e) : (callList = t, callList.forEach(function (e, t) {
            var a = !0 === e.callVideo ? '<button type="button" class="btn btn-link p-0 fs-20 stretched-link" data-bs-toggle="modal" data-bs-target=".videocallModal"><i class="' + e.callTypeIcon + '"></i></button>' : '<button type="button" class="btn btn-link p-0 fs-20 stretched-link" data-bs-toggle="modal" data-bs-target=".audiocallModal"><i class="' + e.callTypeIcon + '"></i></button>',
                s = e.profile ? '<img src="' + e.profile + '" class="rounded-circle avatar-xs" alt="">' : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-danger text-white">RL</span></div>';
            document.getElementById("callList").innerHTML += '<li id="calls-id-' + e.id + '" >        <div class="d-flex align-items-center">        <div class="chat-user-img flex-shrink-0 me-2">            ' + s + '        </div>            <div class="flex-grow-1 overflow-hidden">                <p class="text-truncate mb-0">' + e.name + '</p>                <div class="text-muted fs-12 text-truncate"><i class="' + e.callArrowType + '"></i> ' + e.dateTime + '</div>            </div>            <div class="flex-shrink-0 ms-3">                <div class="d-flex align-items-center gap-3">                    <div>                        <h5 class="mb-0 fs-12 text-muted">' + e.callTime + "</h5>                    </div>                    <div>                       " + a + "                    </div>                </div>            </div>        </div>      </li>"
        })), document.querySelectorAll("#callList li").forEach(function (i) {
            i.addEventListener("click", function (e) {
                var t = i.getAttribute("id"), a = i.querySelector(".text-truncate").innerHTML;
                document.querySelector(".videocallModal .text-truncate").innerHTML = a, document.querySelector(".audiocallModal .text-truncate").innerHTML = a;
                var s = document.getElementById(t).querySelector(".avatar-xs").getAttribute("src");
                s ? (document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", s), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", s)) : (document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", r), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", r))
            })
        })
    }), e("contacts.json", function (e, t) {
        var i, l;
        null !== e ? console.log("Something went wrong: " + e) : ((u = t).sort(function (e, t) {
            return e.name.localeCompare(t.name)
        }), l = i = "", u.forEach(function (e, t) {
            var a = e.profile ? '<img src="' + e.profile + '" class="img-fluid rounded-circle" alt="">' : '<span class="avatar-title rounded-circle bg-primary fs-10">' + e.nickname + "</span>";
            i = '<li>              <div class="d-flex align-items-center">                  <div class="flex-shrink-0 me-2">                      <div class="avatar-xs">                          ' + a + '                      </div>                  </div>                  <div class="flex-grow-1">                      <h5 class="fs-14 m-0" >' + e.name + '</h5>                  </div>                  <div class="flex-shrink-0">                      <div class="dropdown">                          <a href="#" class="text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                              <i class="bx bx-dots-vertical-rounded align-middle"></i>                          </a>                          <div class="dropdown-menu dropdown-menu-end">                              <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Edit <i class="bx bx-pencil ms-2 text-muted"></i></a>                              <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Block <i class="bx bx-block ms-2 text-muted"></i></a>                              <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Remove <i class="bx bx-trash ms-2 text-muted"></i></a>                          </div>                      </div>                  </div>              </div>          </li>';
            var s = '<div class="mt-3" >              <div class="contact-list-title">' + e.name.charAt(0).toUpperCase() + '                </div>          <ul id="contact-sort-' + e.name.charAt(0) + '" class="list-unstyled contact-list" >';
            l != e.name.charAt(0) && (document.getElementsByClassName("sort-contact")[0].innerHTML += s), document.getElementById("contact-sort-" + e.name.charAt(0)).innerHTML = document.getElementById("contact-sort-" + e.name.charAt(0)).innerHTML + i, l = e.name.charAt(0)
        })), document.querySelectorAll(".sort-contact ul li").forEach(function (s) {
            s.addEventListener("click", function (e) {
                d = "users", o();
                var t = s.querySelector("li .fs-14").innerHTML;
                document.querySelector(".text-truncate .user-profile-show").innerHTML = t, document.querySelector(".user-profile-desc .text-truncate").innerHTML = t, document.querySelector(".audiocallModal .text-truncate").innerHTML = t, document.querySelector(".videocallModal .text-truncate").innerHTML = t, document.querySelector(".user-profile-sidebar .user-name").innerHTML = t, document.querySelector(".chat-input-typing").style.display = "block", document.querySelector(".user-profile-status").style.display = "block", document.querySelector(".chat-input-typing .typing-user").innerHTML = t + ' is Typing<span class="typing ms-2"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>';
                var a = s.querySelector("li .align-items-center").querySelector(".avatar-xs .rounded-circle").getAttribute("src");
                a ? (document.querySelector(".user-own-img .avatar-sm").setAttribute("src", a), document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", a), document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", a), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", a)) : (document.querySelector(".user-own-img .avatar-sm").setAttribute("src", r), document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", r), document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", r), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", r)), document.getElementById("users-conversation").querySelectorAll(".left .chat-avatar").forEach(function (e) {
                    a ? e.querySelector("img").setAttribute("src", a) : e.querySelector("img").setAttribute("src", r)
                }), window.stop()
            })
        }), a()
    }), o();
    var t = document.querySelector(".user-profile-sidebar");
    document.querySelectorAll(".user-profile-show").forEach(function (e) {
        e.addEventListener("click", function (e) {
            t.classList.toggle("d-block")
        })
    }), window.addEventListener("DOMContentLoaded", function () {
        var e = document.querySelector("#chat-conversation .simplebar-content-wrapper");
        e.scrollTop = e.scrollHeight
    });
    var i = document.getElementById("chatinputmorecollapse");

    function h(e) {
        var t = document.getElementById(e).querySelector("#chat-conversation .simplebar-content-wrapper"),
            a = document.getElementsByClassName("chat-conversation-list")[0] ? document.getElementById(e).getElementsByClassName("chat-conversation-list")[0].scrollHeight - window.innerHeight + 250 : 0;
        a && t.scrollTo({top: a, behavior: "smooth"})
    }

    document.body.addEventListener("click", function () {
        new bootstrap.Collapse(i, {toggle: !1}).hide()
    }), i && i.addEventListener("shown.bs.collapse", function () {
        new Swiper(".chatinput-links", {
            slidesPerView: 3,
            spaceBetween: 30,
            breakpoints: {768: {slidesPerView: 4}, 1024: {slidesPerView: 6}}
        })
    }), document.querySelectorAll(".contact-modal-list .contact-list li").forEach(function (e) {
        e.addEventListener("click", function () {
            e.classList.toggle("selected")
        })
    }), document.getElementById("favourite-users").onclick = function () {
        document.getElementById("chat-input").focus()
    }, document.getElementById("usersList").onclick = function () {
        document.getElementById("chat-input").focus()
    }, document.getElementById("channelList").onclick = function () {
        document.getElementById("chat-input").focus()
    };
    var l = document.querySelector("#chatinput-form"), y = document.querySelector("#chat-input"),
        b = document.querySelector(".chat-conversation-list");
    document.querySelector(".chat-input-feedback");

    function x() {
        var e = 12 <= (new Date).getHours() ? "pm" : "am",
            t = 12 < (new Date).getHours() ? (new Date).getHours() % 12 : (new Date).getHours(),
            a = (new Date).getMinutes() < 10 ? "0" + (new Date).getMinutes() : (new Date).getMinutes();
        return t < 10 ? "0" + t + ":" + a + " " + e : t + ":" + a + " " + e
    }

    setInterval(x, 1e3);
    var w, n, S = 0, E = [], c = 1, q = "";
    document.querySelector("#audiofile-input").addEventListener("change", function () {
        var a = document.querySelector(".file_Upload");
        n = document.querySelector("#audiofile-input").files[0], q = URL.createObjectURL(n);
        var e = new FileReader;
        e.readAsDataURL(n), a && a.classList.add("show"), e.addEventListener("load", function () {
            var e = n.name, t = Math.round(n.size / 1e6).toFixed(2);
            a.innerHTML = '<div class="card p-2 border mb-2 audiofile_pre d-inline-block position-relative">            <div class="d-flex align-items-center">                <div class="flex-shrink-0 avatar-xs ms-1 me-3">                    <div class="avatar-title bg-soft-primary text-primary rounded-circle">                        <i class="bx bx-headphone"></i>                    </div>                </div>                <div class="flex-grow-1 overflow-hidden">                <h5 class="fs-14 text-truncate mb-1">' + e + '</h5>                  <input type="hidden" name="downloadaudiodata" value="' + q + '"/>                        <p class="text-muted text-truncate fs-13 mb-0">' + t + 'mb</p>                </div>                <div class="flex-shrink-0 ms-3">                    <div class="d-flex gap-2">                        <div>                        <i class="ri-close-line text-danger audioFile-remove"  id="remove-audioFile"></i>                        </div>                    </div>                </div>            </div>          </div>', w = e, removeAudioFile(), E[c] = n
        }, !1), c++
    });
    var k, L, p, j = [], A = 1;
    document.querySelector("#attachedfile-input").addEventListener("change", function () {
        var a = document.querySelector(".file_Upload");
        p = document.querySelector("#attachedfile-input").files[0], fr = new FileReader, fr.readAsDataURL(p), a && a.classList.add("show"), fr.addEventListener("load", function () {
            var e = p.name, t = Math.round(p.size / 1e6).toFixed(2);
            a.innerHTML = '<div class="card p-2 border attchedfile_pre d-inline-block position-relative">            <div class="d-flex align-items-center">                <div class="flex-shrink-0 avatar-xs ms-1 me-3">                    <div class="avatar-title bg-soft-primary text-primary rounded-circle">                        <i class="ri-attachment-2"></i>                    </div>                </div>                <div class="flex-grow-1 overflow-hidden">                <a href="" id="a"></a>                    <h5 class="fs-14 text-truncate mb-1">' + e + '</h5>                    <input type="hidden" name="downloaddata" value="' + p + '"/>                    <p class="text-muted text-truncate fs-13 mb-0">' + t + 'mb</p>                </div>                <div class="flex-shrink-0 align-self-start ms-3">                    <div class="d-flex gap-2">                        <div>                        <i class="ri-close-line text-muted attechedFile-remove"  id="remove-attechedFile"></i>                        </div>                    </div>                </div>            </div>          </div>', k = e, L = t, j[A] = p, removeAttachedFile()
        }, !1), A++
    });
    var B = [];
    removeimg = 1;
    document.querySelector("#galleryfile-input").addEventListener("change", function () {
        var s = document.querySelector(".file_Upload");
        s.insertAdjacentHTML("beforeend", '<div class="profile-media-img image_pre"></div>');
        var i = document.querySelector(".file_Upload .profile-media-img");
        this.files && [].forEach.call(this.files, function (e) {
            if (!/\.(jpe?g|png|gif)$/i.test(e.name)) return alert(e.name + " is not an image");
            var t = new FileReader, a = "";
            t.addEventListener("load", function () {
                removeimg++, s && s.classList.add("show"), B.push(t.result), a += '<div class="media-img-list" id="remove-image-' + removeimg + '">          <a href="#">              <img src="' + this.result + '" alt="' + e.name + '" class="img-fluid">          </a>            <i class="ri-close-line image-remove" onclick="removeImage(`remove-image-' + removeimg + '`)"></i>          </div>', i.insertAdjacentHTML("afterbegin", a), 0
            }), t.readAsDataURL(e)
        })
    });
    l && l.addEventListener("submit", function (e) {
        e.preventDefault();
        var t, a, s, i, l = g, r = g, o = g, n = g, c = g, d = y.value, u = document.querySelector(".image_pre"),
            m = document.querySelector(".attchedfile_pre"), p = document.querySelector(".audiofile_pre"),
            v = document.querySelector(".chat-input-feedback");
        0 === d.length ? (v.classList.add("show"), setTimeout(function () {
            v.classList.remove("show")
        }, 2e3), null != u ? (v.classList.remove("show"), t = r, a = B, s = document.getElementById(t).querySelector(".chat-conversation-list"), i = "", a.forEach(function (e) {
            i += '<div class="message-img-list">          <div>            <a class="popup-img d-inline-block" href="' + e + '" target="_blank">                <img src="' + e + '" alt="" class="rounded border img-thumbnail" width="200" />            </a>          </div>          <div class="message-img-link">            <ul class="list-inline mb-0">              <li class="list-inline-item dropdown">                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                    <i class="bx bx-dots-horizontal-rounded"></i>                </a>          <div class="dropdown-menu">            <a class="dropdown-item d-flex align-items-center justify-content-between" href="' + e + '" download>Download <i class="bx bx-download ms-2 text-muted"></i></a>            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>            <a class="dropdown-item d-flex align-items-center justify-content-between delete-image" id="delete-item-' + ++S + '" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>          </div>        </li>      </ul>    </div>    </div>'
        }), null != a && (s.insertAdjacentHTML("beforeend", '<li class="chat-list right" id="chat-list-' + S + '" >        <div class="conversation-list">            <div class="user-chat-content">                <div class="ctext-wrap">                        <div class="message-img mb-0">' + i + '                    </div>                    </div>                  <div class="conversation-name">                    <small class="text-muted time">' + x() + '</small>                    <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                </div>          </div>        </li>'), _(), b.querySelectorAll(".chat-list").forEach(function (e) {
            e.querySelectorAll(".delete-image").forEach(function (e) {
                e.addEventListener("click", function () {
                    1 == e.closest(".message-img").childElementCount ? e.closest(".chat-list").remove() : e.closest(".message-img-list").remove()
                })
            })
        }), C.querySelectorAll(".chat-list").forEach(function (e) {
            e.querySelectorAll(".delete-image").forEach(function (e) {
                e.addEventListener("click", function () {
                    1 == e.closest(".message-img").childElementCount ? e.closest(".chat-list").remove() : e.closest(".message-img-list").remove()
                })
            })
        })), document.querySelector(".file_Upload").classList.remove("show"), B = []) : null != m ? (v.classList.remove("show"), function (e, t, a) {
            t = k, a = L;
            S++;
            var s = document.getElementById(e).querySelector(".chat-conversation-list");
            null != t && s.insertAdjacentHTML("beforeend", '<li class="chat-list right" id="chat-list-' + S + '" >          <div class="conversation-list">              <div class="user-chat-content">                  <div class="ctext-wrap">                      <div class="ctext-wrap-content">                          <div class="p-3 border rounded-3">                              <div class="d-flex align-items-center attached-file">                                  <div class="flex-shrink-0 avatar-sm me-3 ms-0 attached-file-avatar">                                      <div class="avatar-title bg-soft-light rounded-circle fs-20"><i class="ri-attachment-2"></i></div>                                  </div>                                  <div class="flex-grow-1 overflow-hidden">                                      <div class="text-start">                                          <h5 class="fs-14 text-white mb-1">' + t + '</h5>                                          <p class="text-white-50 text-truncate fs-13 mb-0">' + a + 'mb</p>                                      </div>                                  </div>                                  <div class="flex-shrink-0 ms-4">                                      <div class="d-flex gap-2 fs-20 d-flex align-items-start">                                          <div>                                              <a href="#" class="text-white-50 download-file" data-id="' + A + '"> <i class="bx bxs-download"></i> </a>                                          </div>                                      </div>                                  </div>                              </div>                          </div>                      </div>                      <div class="align-self-start message-box-drop d-flex">                      <div class="dropdown">                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                          <i class="ri-emotion-happy-line"></i>                        </a>                        <div class="dropdown-menu emoji-dropdown-menu">                          <div class="hstack align-items-center gap-2 px-2 fs-25">                            <a href="javascript:void(0);">💛</a>                            <a href="javascript:void(0);">🤣</a>                            <a href="javascript:void(0);">😜</a>                            <a href="javascript:void(0);">😘</a>                            <a href="javascript:void(0);">😍</a>                            <div class="avatar-xs">                            <a href="javascript:void(0);" class="avatar-title bg-soft-primary rounded-circle fs-19 text-primary">+</a>                            </div>                          </div>                        </div>                      </div>                      <div class="dropdown">                          <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="ri-more-2-fill"></i> </a>                          <div class="dropdown-menu">            <a class="dropdown-item d-flex align-items-center justify-content-between" href="' + t + '" download>Download <i class="bx bx-download ms-2 text-muted"></i></a>            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                          <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" id="delete-item-' + S + '" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>                      </div>                    </div>                    </div>                  </div>                <div class="conversation-name">                    <small class="text-muted time">' + x() + '</small>                      <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                    </div>                </div>              </div>            </li>');
            var i = document.getElementById("chat-list-" + S);
            i.querySelectorAll(".delete-item").forEach(function (e) {
                e.addEventListener("click", function () {
                    b.removeChild(i)
                })
            }), i.querySelectorAll(".download-file").forEach(function (i) {
                i.addEventListener("click", function (e) {
                    e.preventDefault();
                    var t, a, s = i.getAttribute("data-id");
                    window.File && window.FileReader && window.FileList && window.Blob ? (t = new Blob([j[s]], {type: "application/pdf"}), (a = document.createElement("a")).href = window.URL.createObjectURL(t), a.download = j[s].name, a.click()) : alert("The File APIs are not fully supported in this browser.")
                })
            }), document.querySelector(".file_Upload ").classList.remove("show")
        }(o, d)) : null != p && (v.classList.remove("show"), function (e, t) {
            t = w;
            S++;
            var a = document.getElementById(e).querySelector(".chat-conversation-list");
            null != t && a.insertAdjacentHTML("beforeend", '<li class="chat-list right" id="chat-list-' + S + '" >          <div class="conversation-list">              <div class="user-chat-content">                  <div class="ctext-wrap">                  <div class="audio-file-elem">                              <audio controls>                                  <source src="' + q + '" type="audio/mpeg">                              </audio>                          </div>                      <div class="align-self-start message-box-drop d-flex">                      <div class="dropdown">                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                          <i class="ri-emotion-happy-line"></i>                        </a>                        <div class="dropdown-menu emoji-dropdown-menu">                          <div class="hstack align-items-center gap-2 px-2 fs-25">                            <a href="javascript:void(0);">💛</a>                            <a href="javascript:void(0);">🤣</a>                            <a href="javascript:void(0);">😜</a>                            <a href="javascript:void(0);">😘</a>                            <a href="javascript:void(0);">😍</a>                            <div class="avatar-xs">                            <a href="javascript:void(0);" class="avatar-title bg-soft-primary rounded-circle fs-19 text-primary">+</a>                            </div>                          </div>                        </div>                      </div>                        <div class="dropdown">                            <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="ri-more-2-fill"></i> </a>                            <div class="dropdown-menu">            <a class="dropdown-item d-flex align-items-center justify-content-between" href="' + t + '" download>Download <i class="bx bx-download ms-2 text-muted"></i></a>            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                                <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" id="delete-item-' + S + '" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>                            </div>                        </div>                      </div>                      </div>                      <div class="conversation-name">                          <small class="text-muted time">' + x() + '</small>                            <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                          </div>                        </div>                      </div>                    </li>');
            var s = document.getElementById("chat-list-" + S);
            s.querySelectorAll(".delete-item").forEach(function (e) {
                e.addEventListener("click", function () {
                    b.removeChild(s)
                })
            }), document.querySelectorAll(".download-file").forEach(function (i) {
                i.addEventListener("click", function (e) {
                    e.preventDefault();
                    var t, a, s = i.getAttribute("data-id");
                    window.File && window.FileReader && window.FileList && window.Blob ? (t = new Blob([j[s]], {type: "application/mp3"}), (a = document.createElement("a")).href = window.URL.createObjectURL(t), a.download = E[s].name, a.click()) : alert("The File APIs are not fully supported in this browser.")
                })
            }), document.querySelector(".file_Upload ").classList.remove("show")
        }(n, d))) : 1 == f ? (function (e, t) {
            var a = document.querySelector(".user-profile-show").innerHTML,
                s = document.querySelector(".replyCard .replymessage-block .flex-grow-1 .mb-0").innerText;
            S++;
            var i = document.getElementById(e).querySelector(".chat-conversation-list");
            null != t && (i.insertAdjacentHTML("beforeend", '<li class="chat-list right" id="chat-list-' + S + '" >                <div class="conversation-list">                    <div class="user-chat-content">                        <div class="ctext-wrap">                            <div class="ctext-wrap-content">                            <div class="replymessage-block mb-0 d-flex align-items-start">                        <div class="flex-grow-1">                            <h5 class="conversation-name">' + a + '</h5>                            <p class="mb-0">' + s + '</p>                        </div>                        <div class="flex-shrink-0">                            <button type="button" class="btn btn-sm btn-link mt-n2 me-n3 fs-18">                            </button>                        </div>                    </div>                                <p class="mb-0 ctext-content mt-1">                                    ' + t + '                                </p>                            </div>                            <div class="align-self-start message-box-drop d-flex">                            <div class="dropdown">                              <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                                <i class="ri-emotion-happy-line"></i>                              </a>                              <div class="dropdown-menu emoji-dropdown-menu">                                <div class="hstack align-items-center gap-2 px-2 fs-25">                                  <a href="javascript:void(0);">💛</a>                                  <a href="javascript:void(0);">🤣</a>                                  <a href="javascript:void(0);">😜</a>                                  <a href="javascript:void(0);">😘</a>                                  <a href="javascript:void(0);">😍</a>                                  <div class="avatar-xs">                                    <a href="javascript:void(0);" class="avatar-title bg-soft-primary rounded-circle fs-19 text-primary">+</a>                                  </div>                                </div>                              </div>                            </div>                              <div class="dropdown">                                  <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                                      <i class="ri-more-2-fill"></i>                                  </a>                                  <div class="dropdown-menu">                                      <a class="dropdown-item d-flex align-items-center justify-content-between reply-message" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>                                      <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>                                      <a class="dropdown-item d-flex align-items-center justify-content-between copy-message" href="#" id="copy-message-' + S + '">Copy <i class="bx bx-copy text-muted ms-2"></i></a>                                      <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                                      <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Mark as Unread <i class="bx bx-message-error text-muted ms-2"></i></a>                                      <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" id="delete-item-' + S + '" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>                              </div>                            </div>                        </div>                    </div>                    <div class="conversation-name">                        <small class="text-muted time">' + x() + '</small>                        <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                    </div>                </div>            </div>        </li>'), 0);
            var l = document.getElementById("chat-list-" + S);
            l.querySelectorAll(".delete-item").forEach(function (e) {
                e.addEventListener("click", function () {
                    b.removeChild(l)
                })
            }), l.querySelectorAll(".copy-message").forEach(function (e) {
                e.addEventListener("click", function () {
                    document.getElementById("copyClipBoard").style.display = "block", document.getElementById("copyClipBoardChannel").style.display = "block", setTimeout(function () {
                        document.getElementById("copyClipBoard").style.display = "none", document.getElementById("copyClipBoardChannel").style.display = "none"
                    }, 1e3)
                })
            }), l.querySelectorAll(".reply-message").forEach(function (s) {
                s.addEventListener("click", function () {
                    var e = s.closest(".ctext-wrap").children[0].children[0].innerText,
                        t = document.querySelector(".user-profile-show").innerHTML;
                    document.querySelector(".replyCard .replymessage-block .flex-grow-1 .mb-0").innerText = e;
                    var a = !s.closest(".chat-list") || s.closest(".chat-list").classList.contains("left") ? t : "You";
                    document.querySelector(".replyCard .replymessage-block .flex-grow-1 .conversation-name").innerText = a
                })
            }), l.querySelectorAll(".copy-message").forEach(function (e) {
                e.addEventListener("click", function () {
                    l.childNodes[1].children[1].firstElementChild.firstElementChild.getAttribute("id"), isText = l.childNodes[1].children[1].firstElementChild.firstElementChild.innerText, navigator.clipboard.writeText(isText)
                })
            })
        }(c, d), f = !1) : function (e, t) {
            S++;
            var a = document.getElementById(e).querySelector(".chat-conversation-list");
            null != t && a.insertAdjacentHTML("beforeend", '<li class="chat-list right" id="chat-list-' + S + '" >                <div class="conversation-list">                    <div class="user-chat-content">                        <div class="ctext-wrap">                            <div class="ctext-wrap-content">                                <p class="mb-0 ctext-content">' + t + '</p>                            </div>                            <div class="align-self-start message-box-drop d-flex">                            <div class="dropdown">                              <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                                <i class="ri-emotion-happy-line"></i>                              </a>                              <div class="dropdown-menu emoji-dropdown-menu">                                <div class="hstack align-items-center gap-2 px-2 fs-25">                                  <a href="javascript:void(0);">💛</a>                                  <a href="javascript:void(0);">🤣</a>                                  <a href="javascript:void(0);">😜</a>                                  <a href="javascript:void(0);">😘</a>                                  <a href="javascript:void(0);">😍</a>                                  <div class="avatar-xs">                                  <a href="javascript:void(0);" class="avatar-title bg-soft-primary rounded-circle fs-19 text-primary">+</a>                                  </div>                                </div>                              </div>                            </div>                              <div class="dropdown">                                  <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                                      <i class="ri-more-2-fill"></i>                                  </a>                                  <div class="dropdown-menu">                                      <a class="dropdown-item d-flex align-items-center justify-content-between reply-message" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>                                      <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>                                      <a class="dropdown-item d-flex align-items-center justify-content-between copy-message" href="#" id="copy-message-' + S + '">Copy <i class="bx bx-copy text-muted ms-2"></i></a>                                      <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                                      <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Mark as Unread <i class="bx bx-message-error text-muted ms-2"></i></a>                                      <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" id="delete-item-' + S + '" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>                              </div>                            </div>                        </div>                    </div>                    <div class="conversation-name">                        <small class="text-muted time">' + x() + '</small>                        <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                    </div>                </div>            </div>        </li>');
            var s = document.getElementById("chat-list-" + S);
            s.querySelectorAll(".delete-item").forEach(function (e) {
                e.addEventListener("click", function () {
                    a.removeChild(s)
                })
            }), s.querySelectorAll(".copy-message").forEach(function (e) {
                e.addEventListener("click", function () {
                    document.getElementById("copyClipBoard").style.display = "block", document.getElementById("copyClipBoardChannel").style.display = "block", setTimeout(function () {
                        document.getElementById("copyClipBoard").style.display = "none", document.getElementById("copyClipBoardChannel").style.display = "none"
                    }, 1e3)
                })
            }), s.querySelectorAll(".reply-message").forEach(function (i) {
                i.addEventListener("click", function () {
                    var e = document.querySelector(".replyCard"), t = document.querySelector("#close_toggle"),
                        a = i.closest(".ctext-wrap").children[0].children[0].innerText,
                        s = document.querySelector(".user-profile-show").innerHTML;
                    f = !0, e.classList.add("show"), t.addEventListener("click", function () {
                        e.classList.remove("show")
                    }), document.querySelector(".replyCard .replymessage-block .flex-grow-1 .mb-0").innerText = a, document.querySelector(".replyCard .replymessage-block .flex-grow-1 .conversation-name").innerText = s
                })
            }), s.querySelectorAll(".copy-message").forEach(function (e) {
                e.addEventListener("click", function () {
                    var e = s.childNodes[1].firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerText;
                    navigator.clipboard.writeText(e)
                })
            })
        }(l, d), h(l || r || o || n || c), y.value = "", document.querySelector(".image_pre") && document.querySelector(".image_pre").remove(), document.getElementById("galleryfile-input").value = "", document.querySelector(".attchedfile_pre") && document.querySelector(".attchedfile_pre").remove(), document.getElementById("attachedfile-input").value = "", document.querySelector(".audiofile_pre") && document.querySelector(".audiofile_pre").remove(), document.getElementById("audiofile-input").value = "", document.getElementById("close_toggle").click()
    });
    var C = document.querySelector("#channel-conversation");
    document.querySelector("#profile-foreground-img-file-input").addEventListener("change", function () {
        var e = document.querySelector(".profile-foreground-img"),
            t = document.querySelector(".profile-foreground-img-file-input").files[0], a = new FileReader;
        a.addEventListener("load", function () {
            e.src = a.result
        }, !1), t && a.readAsDataURL(t)
    }), document.querySelector("#profile-img-file-input").addEventListener("change", function () {
        var e = document.querySelector(".user-profile-image"),
            t = document.querySelector(".profile-img-file-input").files[0], a = new FileReader;
        a.addEventListener("load", function () {
            e.src = a.result
        }, !1), t && a.readAsDataURL(t)
    }), document.getElementById("user-profile-edit-btn").addEventListener("click", function (e) {
        document.querySelectorAll(".edit-input .form-control").forEach(function (e) {
            var t = document.getElementById("edit-icon");
            e.disabled ? (t.classList.replace("bxs-pencil", "bxs-save"), e.disabled = !1) : (t.classList.replace("bxs-save", "bxs-pencil"), e.disabled = !0)
        })
    });
    for (var v = document.getElementsByClassName("favourite-btn"), M = 0; M < v.length; M++) {
        var T = v[M];
        T.onclick = function () {
            T.classList.toggle("active")
        }
    }
    new FgEmojiPicker({
        trigger: [".emoji-btn"],
        removeOnSelection: !1,
        closeButton: !0,
        position: ["top", "right"],
        preFetch: !0,
        dir: "assets/js/dir/json",
        insertInto: document.querySelector(".chat-input")
    });

    function I(e, t, a, s, i, l, r) {
        var o = '<div class="ctext-wrap">';
        if (null != t) o += '<div class="ctext-wrap-content" id=' + e + '>        <p class="mb-0 ctext-content">' + t + "</p></div>"; else if (a && 0 < a.length) {
            for (o += '<div class="message-img mb-0">', M = 0; M < a.length; M++) o += '<div class="message-img-list">            <div>              <a class="popup-img d-inline-block" href="' + a[M] + '">                <img src="' + a[M] + '" alt="" class="rounded border img-thumbnail">              </a>            </div>            <div class="message-img-link">              <ul class="list-inline mb-0">                <li class="list-inline-item dropdown">                  <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                      <i class="bx bx-dots-horizontal-rounded"></i>                  </a>                <div class="dropdown-menu">                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="' + a[M] + '" download>Download <i class="bx bx-download ms-2 text-muted"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between"  href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between delete-image" href="#">Delete <i class="bx bx-trash ms-2 text-muted"></i></a>                </div>              </li>          </ul>        </div>      </div>';
            o += "</div>"
        } else 0 < s.length ? o += '<div class="ctext-wrap-content">            <div class="p-3 border rounded-3">            <div class="d-flex align-items-center attached-file">                <div class="flex-shrink-0 avatar-sm me-3 ms-0 attached-file-avatar">                    <div class="avatar-title bg-soft-light rounded-circle fs-20">                        <i class="ri-attachment-2"></i>                    </div>                </div>                <div class="flex-grow-1 overflow-hidden">                    <div class="text-start">                        <h5 class="fs-14 text-white mb-1">design-phase-1-approved.pdf</h5>                        <p class="text-white-50 text-truncate fs-13 mb-0">12.5 MB</p>                    </div>                </div>                <div class="flex-shrink-0 ms-4">                    <div class="d-flex gap-2 fs-20 d-flex align-items-start">                        <div>                            <a href="#" class="text-white-50">                                <i class="bx bxs-download"></i>                            </a>                        </div>                    </div>                </div>             </div>            </div>            </div>            <div class="emoji-icon">                <a class="dropdown-toggle" href="#">👍</a>            </div>            <div class="align-self-start message-box-drop d-flex">              <div class="dropdown">                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                  <i class="ri-emotion-happy-line"></i>                </a>                <div class="dropdown-menu emoji-dropdown-menu">                  <div class="hstack align-items-center gap-2 px-2 fs-25">                    <a href="javascript:void(0);">💛</a>                    <a href="javascript:void(0);">🤣</a>                    <a href="javascript:void(0);">😜</a>                    <a href="javascript:void(0);">😘</a>                    <a href="javascript:void(0);">😍</a>                    <div class="avatar-xs">                    <a href="javascript:void(0);" class="avatar-title bg-soft-primary rounded-circle fs-19 text-primary">+</a>                    </div>                  </div>                </div>              </div>              <div class="dropdown">                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                    <i class="ri-more-2-fill"></i>                </a>                <div class="dropdown-menu">                  <a class="dropdown-item d-flex align-items-center justify-content-between"  href="' + s + '" download>Download <i class="bx bx-download ms-2 text-muted"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>                </div>              </div>          </div>' : i && 0 < i.length ? o += '<div class="audio-file-elem">                              <audio controls>                                  <source src="' + i + '" type="audio/mpeg">                              </audio>                          </div>                  <div class="align-self-start message-box-drop d-flex">              <div class="dropdown">                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                  <i class="ri-emotion-happy-line"></i>                </a>                <div class="dropdown-menu emoji-dropdown-menu">                  <div class="hstack align-items-center gap-2 px-2 fs-25">                    <a href="javascript:void(0);">💛</a>                    <a href="javascript:void(0);">🤣</a>                    <a href="javascript:void(0);">😜</a>                    <a href="javascript:void(0);">😘</a>                    <a href="javascript:void(0);">😍</a>                    <div class="avatar-xs">                    <a href="javascript:void(0);" class="avatar-title bg-soft-primary rounded-circle fs-19 text-primary">+</a>                    </div>                  </div>                </div>              </div>              <div class="dropdown">                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                    <i class="ri-more-2-fill"></i>                </a>                <div class="dropdown-menu">                  <a class="dropdown-item d-flex align-items-center justify-content-between"  href="' + i + '" download>Download <i class="bx bx-download ms-2 text-muted"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>                </div>              </div>          </div>' : l && 0 < l.length && (o += '<div>        <iframe src="' + l + '" title="YouTube video" class="w-100 rounded" autoplay allowfullscreen></iframe>      </div>                  <div class="align-self-start message-box-drop d-flex">              <div class="dropdown">                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                  <i class="ri-emotion-happy-line"></i>                </a>                <div class="dropdown-menu emoji-dropdown-menu">                  <div class="hstack align-items-center gap-2 px-2 fs-25">                    <a href="javascript:void(0);">💛</a>                    <a href="javascript:void(0);">🤣</a>                    <a href="javascript:void(0);">😜</a>                    <a href="javascript:void(0);">😘</a>                    <a href="javascript:void(0);">😍</a>                    <div class="avatar-xs">                    <a href="javascript:void(0);" class="avatar-title bg-soft-primary rounded-circle fs-19 text-primary">+</a>                    </div>                  </div>                </div>              </div>              <div class="dropdown">                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                    <i class="ri-more-2-fill"></i>                </a>                <div class="dropdown-menu">                  <a class="dropdown-item d-flex align-items-center justify-content-between"  href="' + l + '" download>Download <i class="bx bx-download ms-2 text-muted"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                  <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>                </div>              </div>          </div>');
        return !0 === r && (o += '<div class="align-self-start message-box-drop d-flex">            <div class="dropdown">                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                  <i class="ri-emotion-happy-line"></i>                </a>                <div class="dropdown-menu emoji-dropdown-menu">                  <div class="hstack align-items-center gap-2 px-2 fs-25">                    <a href="javascript:void(0);">💛</a>                    <a href="javascript:void(0);">🤣</a>                    <a href="javascript:void(0);">😜</a>                    <a href="javascript:void(0);">😘</a>                    <a href="javascript:void(0);">😍</a>                    <div class="avatar-xs">                    <a href="javascript:void(0);" class="avatar-title bg-soft-primary rounded-circle fs-19 text-primary">+</a>                    </div>                  </div>                </div>            </div>            <div class="dropdown">                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                    <i class="ri-more-2-fill"></i>                </a>                <div class="dropdown-menu">                    <a class="dropdown-item d-flex align-items-center justify-content-between reply-message" href="#" id="reply-message-' + S + '" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>                    <a class="dropdown-item d-flex align-items-center justify-content-between copy-message" href="#" id="copy-message-' + S + '">Copy <i class="bx bx-copy text-muted ms-2"></i></a>                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Mark as Unread <i class="bx bx-message-error text-muted ms-2"></i></a>                    <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>                </div>            </div>        </div>'), o += "</div>"
    }

    function H(e) {
        var t, a, s;
        t = e, a = function (e, t) {
            var l, r, a, i, o, s, n, c;
            null !== e ? console.log("Something went wrong: " + e) : (l = "users" == d ? t[0].chats : t[0].channel_chat, document.getElementById(d + "-conversation").innerHTML = "", r = 0, l.forEach(function (t, e) {
                var a, s, i;
                0 < r ? --r : (a = t.from_id == m ? " right" : " left", s = u.find(function (e) {
                    return e.id == t.from_id
                }), i = '<li class="chat-list' + a + '" id=' + t.id + '>                        <div class="conversation-list">', m != t.from_id && (i += '<div class="chat-avatar"><img src="' + s.profile + '" alt=""></div>'), i += '<div class="user-chat-content">', i += I(t.id, t.msg, t.has_images, t.has_files, t.has_audios, t.has_videos, t.has_dropDown), l[e + 1] && t.from_id == l[e + 1].from_id && (r = function (e, t, a) {
                    for (var s = 0; e[t] && e[t + 1] && e[t + 1].from_id == a;) s++, t++;
                    return s
                }(l, e, t.from_id), i += function (e, t, a) {
                    for (var s = 0; e[t] && e[t + 1] && e[t + 1].from_id == a;) s = I(e[t + 1].id, e[t + 1].msg, e[t + 1].has_images, e[t + 1].has_files, e[t + 1].has_audios, e[t + 1].has_videos, e[t + 1].has_dropDown), t++;
                    return s
                }(l, e, t.from_id)), i += '<div class="conversation-name"><small class="text-muted time">' + t.datetime + '</small> <span class="text-success check-message-icon"><i class="bx bx-check-double"></i></span></div>', i += "</div>                </div>            </li>", document.getElementById(d + "-conversation").innerHTML += i)
            })), b.querySelectorAll(".delete-item").forEach(function (e) {
                e.addEventListener("click", function () {
                    2 == e.closest(".user-chat-content").childElementCount ? e.closest(".chat-list").remove() : e.closest(".ctext-wrap").remove()
                })
            }), C.querySelectorAll(".delete-item").forEach(function (e) {
                e.addEventListener("click", function () {
                    2 == e.closest(".user-chat-content").childElementCount ? e.closest(".chat-list").remove() : e.closest(".ctext-wrap").remove()
                })
            }), b.querySelectorAll(".chat-list").forEach(function (e) {
                e.querySelectorAll(".delete-image").forEach(function (e) {
                    e.addEventListener("click", function () {
                        1 == e.closest(".message-img").childElementCount ? e.closest(".chat-list").remove() : e.closest(".message-img-list").remove()
                    })
                })
            }), b.querySelectorAll(".copy-message").forEach(function (t) {
                t.addEventListener("click", function () {
                    var e = t.closest(".ctext-wrap").children[0] ? t.closest(".ctext-wrap").children[0].children[0].innerText : "";
                    navigator.clipboard.writeText(e)
                })
            }), C.querySelectorAll(".copy-message").forEach(function (t) {
                t.addEventListener("click", function () {
                    var e = t.closest(".ctext-wrap").children[0] ? t.closest(".ctext-wrap").children[0].children[0].innerText : "";
                    navigator.clipboard.writeText(e)
                })
            }), h("users-chat"), _(), document.querySelectorAll(".copy-message").forEach(function (e) {
                e.addEventListener("click", function () {
                    document.getElementById("copyClipBoard").style.display = "block", document.getElementById("copyClipBoardChannel").style.display = "block", setTimeout(function () {
                        document.getElementById("copyClipBoard").style.display = "none", document.getElementById("copyClipBoardChannel").style.display = "none"
                    }, 1e3)
                })
            }), a = b.querySelectorAll(".reply-message"), i = document.querySelector(".replyCard"), o = document.querySelector("#close_toggle"), a.forEach(function (s) {
                s.addEventListener("click", function () {
                    f = !0, i.classList.add("show"), o.addEventListener("click", function () {
                        i.classList.remove("show")
                    });
                    var e = s.closest(".ctext-wrap").children[0].children[0].innerText;
                    document.querySelector(".replyCard .replymessage-block .flex-grow-1 .mb-0").innerText = e;
                    var t = document.querySelector(".user-profile-show").innerHTML,
                        a = !s.closest(".chat-list") || s.closest(".chat-list").classList.contains("left") ? t : "You";
                    document.querySelector(".replyCard .replymessage-block .flex-grow-1 .conversation-name").innerText = a
                })
            }), s = C.querySelectorAll(".reply-message"), n = document.querySelector(".replyCard"), c = document.querySelector("#close_toggle"), s.forEach(function (a) {
                a.addEventListener("click", function () {
                    f = !0, n.classList.add("show"), c.addEventListener("click", function () {
                        n.classList.remove("show")
                    });
                    var e = a.closest(".ctext-wrap").children[0].children[0].innerText;
                    document.querySelector(".replyCard .replymessage-block .flex-grow-1 .mb-0").innerText = e;
                    var t = document.querySelector(".user-profile-show").innerHTML;
                    document.querySelector(".replyCard .replymessage-block .flex-grow-1 .conversation-name").innerText = t
                })
            })
        }, (s = new XMLHttpRequest).open("GET", t, !0), s.responseType = "json", s.onload = function () {
            var e = s.status;
            a(200 === e ? null : e, s.response)
        }, s.send()
    }

    function _() {
        GLightbox({selector: ".popup-img", title: !1})
    }

    document.getElementById("emoji-btn").addEventListener("click", function () {
        setTimeout(function () {
            var e, t = document.getElementsByClassName("fg-emoji-picker")[0];
            !t || (e = window.getComputedStyle(t) ? window.getComputedStyle(t).getPropertyValue("left") : "") && (e = (e = e.replace("px", "")) - 40 + "px", t.style.left = e)
        }, 0)
    })
}(), document.documentElement.style.setProperty("--bs-primary-rgb", window.localStorage.getItem("colorPrimary"));
var primaryColor = window.getComputedStyle(document.body, null).getPropertyValue("--bs-primary-rgb");

function removeImage(e) {
    document.querySelector("#" + e).remove(), 0 == document.querySelectorAll(".image-remove").length && document.querySelector(".file_Upload").classList.remove("show")
}

function removeAttachedFile() {
    document.getElementById("remove-attechedFile") && (document.getElementsByClassName("attechedFile-remove")[0], document.getElementById("remove-attechedFile").addEventListener("click", function (e) {
        e.target.closest(".attchedfile_pre").remove()
    })), document.querySelector("#remove-attechedFile").addEventListener("click", function () {
        document.querySelector(".file_Upload ").classList.remove("show")
    })
}

function removeAudioFile() {
    document.getElementById("remove-audioFile") && (document.getElementsByClassName("audioFile-remove")[0], document.getElementById("remove-audioFile").addEventListener("click", function (e) {
        e.target.closest(".audiofile_pre").remove()
    })), document.querySelector("#remove-audioFile").addEventListener("click", function () {
        document.querySelector(".file_Upload ").classList.remove("show")
    })
}

themeColor(primaryColor);