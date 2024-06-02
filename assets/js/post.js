"use strict";const settingsMenu=document.querySelector(".setting_menu"),darkBtn=document.getElementById("dark_btn"),preview=document.getElementById("preview");let previewImgs=[];function settingsMenuToggle(){settingsMenu?settingsMenu.classList.toggle("setting_menu_height"):console.error("Settings menu element not found.")}function dragNdrop(e){e=e.target.files;0<e.length&&Array.from(e).forEach(e=>{var t=new FileReader;t.onload=function(e){var e=e.target.result,t=(previewImgs.push(e),document.createElement("img"));t.setAttribute("src",e),preview?preview.appendChild(t):console.error("Preview element not found.")},t.readAsDataURL(e)})}function drag(){var e=document.getElementById("uploadFile");e?e.parentNode.className="draging dragBox":console.error("Upload file element not found.")}function drop(){var e=document.getElementById("uploadFile");e?e.parentNode.className="dragBox":console.error("Upload file element not found.")}function savePostToLocalStorage(e){var t=JSON.parse(localStorage.getItem("posts"))||[];t.push(e),localStorage.setItem("posts",JSON.stringify(t))}function createImageModal(){const t=document.createElement("div");t.classList.add("image-modal"),t.innerHTML=`
        <div class="image-modal-content">
            <span class="close">&times;</span>
            <div class="image-gallery"></div>
        </div>
    `,document.body.appendChild(t),t.querySelector(".close").onclick=function(){t.style.display="none"},t.onclick=function(e){e.target===t&&(t.style.display="none")}}function showImagesInModal(e){var t=document.querySelector(".image-modal");if(t){const o=t.querySelector(".image-gallery");o?(o.innerHTML="",e.forEach(e=>{var t=document.createElement("img");t.src=e,o.appendChild(t)}),t.style.display="block"):console.error("Image gallery element not found in modal.")}else console.error("Modal element not found.")}function displayPost(o){var e=document.createElement("div");e.classList.add("add_post_container"),e.style.display="block",e.dataset.id=o.id;let n=`
        <div class="post_row">
            <div class="user_profile">
                <img src="${o.user.profileImage}" alt="Profile Image">
                <div>
                    <p class="userName">${o.user.name}</p>
                    <p class="date"><small>${new Date(o.date).toLocaleString()}</small></p>
                </div>
            </div>
            <a href=""><i class=""></i></a>
            <button class="delete_post" onclick="deletePost(${o.id})">Delete</button>
        </div>
        <p class="postContent">${o.content}</p>
    `;0<o.images.length&&(n+='<div class="post_image_container grid_image_container">',o.images.forEach((e,t)=>{t<3?n+=`<img class="post_img" src="${e}" alt="postImage" onclick='showImagesInModal(${JSON.stringify(o.images)})'>`:3===t&&(n+=`
                    <div class="more_images">
                        <img class="post_img" src="${e}" alt="postImage">
                        <div class="more_overlay">+${o.images.length-4}</div>
                    </div>
                `)}),n+="</div>"),o.urlPreview&&o.urlPreview.url&&(n+=`
            <div class="url_preview">
                <a href="${o.urlPreview.url}" target="_BLANK">
                    <img src="${o.urlPreview.image}" alt="Preview Image"/>
                    <div>
                        <h4>${o.urlPreview.title}</h4>
                        <p>${o.urlPreview.description}</p>
                        <span>${o.urlPreview.domain}</span>
                    </div>
                </a>
            </div>
        `),n+=`
        <div class="post_row">
            <div class="activity_icon">
                <div><img src="assets/images/like-blue.png" alt="Like">290</div>
                <div><img src="assets/images/comments.png" alt="Comments">98</div>
                <div><img src="assets/images/share.png" alt="Share">9834</div>
            </div>
            <div class="post_profile_icon">
                <img src="assets/images/5.jpg" alt="Profile Pic"> <i class="fa fa-caret-down"></i>
            </div>
        </div>
    `,e.innerHTML=n;var t=document.body.querySelector(".post_col");t?(t.appendChild(e),e.querySelectorAll(".post_img").forEach(e=>{e.addEventListener("click",()=>{showImagesInModal(o.images)})})):console.error("Parent element not found for appending the post.")}function deletePost(t){let e=JSON.parse(localStorage.getItem("posts"))||[];e=e.filter(e=>e.id!==t),localStorage.setItem("posts",JSON.stringify(e));var o=document.querySelector(`.add_post_container[data-id='${t}']`);o?o.remove():console.error(`Post element with ID ${t} not found.`)}function loadPostsFromLocalStorage(){let e=localStorage.getItem("posts");if(e){try{e=JSON.parse(e)}catch(e){return void console.error("Error parsing JSON:",e)}e.sort((e,t)=>new Date(t.date)-new Date(e.date)),e.forEach(e=>{displayPost(e)})}}darkBtn?darkBtn.onclick=function(){darkBtn.classList.toggle("dark_btn_on")}:console.error("Dark mode button not found."),document.addEventListener("DOMContentLoaded",function(){var e=document.querySelectorAll(".add_post_link a"),e=(e?e.forEach(e=>{e.addEventListener("click",function(e){e.preventDefault();e=e.target.id;if(console.log(e),"post-pic"===e){var t=document.querySelector(".uploadOuter");t?t.style.display="block":console.error("Upload outer element not found.")}else if("post-felling"===e)fetchingApi();else if("post-video"===e){t=document.getElementById("webCam");if(t){t.style.display="block";const o=document.getElementById("vid");o?(e=navigator.mediaDevices,o.muted=!0,e.getUserMedia({video:!0,audio:!0}).then(e=>{o.srcObject=e,o.addEventListener("loadedmetadata",()=>{o.play()}),o.stream=e}).catch(alert)):console.error("Video element not found.")}else console.error("WebCam element not found.")}})}):console.error("Post links not found."),document.getElementById("post_button"));e?e.onclick=function(){var e={id:Date.now(),user:{name:"John Doe",profileImage:"assets/images/profile-pic.png"},date:new Date,content:document.getElementById("input_value").value,images:previewImgs,urlPreview:urlData},e=(savePostToLocalStorage(e),displayPost(e),previewImgs=[],document.getElementById("input_value"));e?e.value="":console.error("Input value element not found.")}:console.error("Post button element not found."),createImageModal(),loadPostsFromLocalStorage()});const emojiSelector=document.getElementById("emojiSelector"),emojiList=document.getElementById("emojiList");let selectedEmoji="";function fetchingApi(){emojiSelector?(emojiSelector.classList.toggle("active"),emojiSelector.style.display="block",fetch("https://emoji-api.com/emojis?access_key=8f1226c4f21f2ba77b7c603b0ade575a4271e3b5").then(e=>e.json()).then(e=>loadEmoji(e))):console.error("Emoji selector element not found.")}function loadEmoji(e){emojiList?(emojiList.innerHTML="",e.forEach(t=>{var e=document.createElement("li");e.textContent=t.character,e.addEventListener("click",function(){console.log("Emoji clicked "+t.character),selectedEmoji=t.character;var e=document.getElementById("input_value");e?(e.value=selectedEmoji+" "+e.value,(e=document.querySelector(".post_text"))?e.innerHTML=` ${t.character} `:console.error("Post text element not found.")):console.error("Input value element not found.")}),emojiList.appendChild(e)})):console.error("Emoji list element not found.")}let urlData={};function fetchUrlPreview(i){$.post("https://graph.facebook.com/v20.0/",{id:i,scrape:!0,access_token:"EAAiYtZBMt3wABO6owBqfBIvU8VK5Tp6B52NAZCfc9fSUR88Pi3yEMHKYNcBaWZBc4RW6NZAdPTjcreyGYX4CsXBEtFUiJWr4zRfnqZAEQXY0ydiAgo3g0bjBspLBiMBOa7ZA3iJzpqhMr5iLEjnH91HJasedXzxupGIAUJGIqoFC7SS1xU5Wn7YqeuKyPfPMCgwx4q0pQOVHD54VNWIhoZAQD2Bzsl5mSzTkwZDZD"}).done(function(e){var t=e.title||"",o=e.description||"",e=e.image[0]?e.image[0].url:"",n=i.split("/")[2];let a=t||o||e?`<a href="${i}" target="_BLANK"><img src="${e}"/><div><h4>${t}</h4><p>${o}</p><span>${n}</span></div></a>`:"<p>No preview available.</p>";$("#review").html(a),urlData={url:i,title:t,description:o,image:e,domain:n}}).fail(function(){$("#review").html("<p>Error fetching preview.</p>")})}$("#input_value").keydown(function(){setTimeout(function(){var e=$("#input_value").val().match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi);e&&0<e.length?($("#demo").css("display","block"),$("#review").css("display","block"),$("#review").html('<center><img src="https://loading.io/spinners/spinner/index.ajax-spinner-preloader.gif" class="loading"/>'),fetchUrlPreview(e[0])):$("#review").css("display","none")},50)});
//# sourceMappingURL=post.js.map
