"use strict";var settingsMenu=document.querySelector(".setting_menu"),darkBtn=document.getElementById("dark_btn");function settingsMenuToggle(){settingsMenu.classList.toggle("setting_menu_height")}darkBtn.onclick=function(){darkBtn.classList.toggle("dark_btn_on")};let preview=document.getElementById("preview"),previewImgs=[];function dragNdrop(e){e=e.target.files;0<e.length&&Array.from(e).forEach(e=>{var t=new FileReader;t.onload=function(e){var e=e.target.result,t=(previewImgs.push(e),document.createElement("img"));t.setAttribute("src",e),preview.appendChild(t)},t.readAsDataURL(e)})}function drag(){document.getElementById("uploadFile").parentNode.className="draging dragBox"}function drop(){document.getElementById("uploadFile").parentNode.className="dragBox"}function savePostToLocalStorage(e){var t=JSON.parse(localStorage.getItem("posts"))||[];t.push(e),localStorage.setItem("posts",JSON.stringify(t))}function createImageModal(){let t=document.createElement("div");t.classList.add("image-modal"),t.innerHTML=`
        <div class="image-modal-content">
            <span class="close">&times;</span>
            <div class="image-gallery"></div>
        </div>
    `,document.body.appendChild(t),t.querySelector(".close").onclick=function(){t.style.display="none"},t.onclick=function(e){e.target===t&&(t.style.display="none")}}function showImagesInModal(e){var t=document.querySelector(".image-modal");let a=t.querySelector(".image-gallery");a.innerHTML="",e.forEach(e=>{var t=document.createElement("img");t.src=e,a.appendChild(t)}),t.style.display="block"}function displayPost(a){var e=document.createElement("div");e.classList.add("add_post_container"),e.style.display="block",e.dataset.id=a.id;let i=`
        <div class="post_row">
            <div class="user_profile">
                <img src="${a.user.profileImage}" alt="Profile Image">
                <div>
                    <p class="userName">${a.user.name}</p>
                    <p class="date"><small>${new Date(a.date).toLocaleString()}</small></p>
                </div>
            </div>
            <a href=""><i class=""></i></a>
            <button class="delete_post" onclick="deletePost(${a.id})">Delete</button>
            </div>
        <p class="postContent">${a.content}</p>
    `;0<a.images.length&&(i+='<div class="post_image_container grid_image_container">',a.images.forEach((e,t)=>{t<3?i+=`<img class="post_img" src="${e}" alt="postImage" onclick="showImagesInModal(${JSON.stringify(a.images)})">`:3===t&&(i+=`
                    <div class="more_images">
                        <img class="post_img" src="${e}" alt="postImage">
                        <div class="more_overlay">+${a.images.length-4}</div>
                    </div>
                `)}),i+="</div>"),a.urlPreview&&a.urlPreview.url&&(i+=`
            <div class="url_preview">
                <a href="${a.urlPreview.url}" target="_BLANK">
                    <img src="${a.urlPreview.image}" alt="Preview Image"/>
                    <div>
                        <h4>${a.urlPreview.title}</h4>
                        <p>${a.urlPreview.description}</p>
                        <span>${a.urlPreview.domain}</span>
                    </div>
                </a>
            </div>
        `),i+=`
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
    `,e.innerHTML=i,("http://localhost:8000/userProfile.html"===window.location.href?document.body.querySelector(".post_col"):document.body.querySelector(".main_content")).appendChild(e),e.querySelectorAll(".post_img").forEach(e=>{e.addEventListener("click",function(){showImagesInModal(a.images)})})}function deletePost(t){let e=JSON.parse(localStorage.getItem("posts"))||[];e=e.filter(e=>e.id!==t),localStorage.setItem("posts",JSON.stringify(e));var a=document.querySelector(`.add_post_container[data-id='${t}']`);a&&a.remove()}function loadPostsFromLocalStorage(){let e=localStorage.getItem("posts");if(e){try{e=JSON.parse(e)}catch(e){return void console.error("Error parsing JSON:",e)}e.sort((e,t)=>new Date(t.date)-new Date(e.date)),e.forEach(e=>{displayPost(e)})}}document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".add_post_link a").forEach(function(e){e.addEventListener("click",function(e){e.preventDefault();e=e.target.id;if(console.log(e),"post-pic"===e)document.querySelector(".uploadOuter").style.display="block";else if("post-felling"===e)fetchingApi();else if("post-video"===e){document.getElementById("webCam").style.display="block";let t=document.getElementById("vid");e=navigator.mediaDevices;t.muted=!0,e.getUserMedia({video:!0,audio:!0}).then(e=>{t.srcObject=e,t.addEventListener("loadedmetadata",()=>{t.play()}),t.stream=e}).catch(alert)}})}),document.querySelector(".close").addEventListener("click",function(){var e=document.getElementById("vid");e.stream&&e.stream.getTracks().forEach(e=>e.stop()),document.getElementById("webCam").style.display="none"})}),document.getElementById("button_value").onclick=()=>{var e=document.getElementById("input_value").value,e=(preview.style.display="none",document.querySelector(".uploadOuter").style.display="none",{id:Date.now(),user:{name:"Sajeda Jomaa",profileImage:"assets/images/5.jpg"},content:e,images:previewImgs,date:(new Date).toISOString(),urlPreview:{url:urlData.url,title:urlData.title,description:urlData.description,image:urlData.image,domain:urlData.domain}});savePostToLocalStorage(e),displayPost(e),previewImgs=[],document.getElementById("input_value").value=""},createImageModal(),document.addEventListener("DOMContentLoaded",()=>{loadPostsFromLocalStorage()});const emojiSelector=document.getElementById("emojiSelector"),emojiList=document.getElementById("emojiList");function fetchingApi(){emojiSelector.classList.toggle("active"),emojiSelector.style.display="block",fetch("https://emoji-api.com/emojis?access_key=8f1226c4f21f2ba77b7c603b0ade575a4271e3b5").then(e=>e.json()).then(e=>loadEmoji(e))}let selectedEmoji="";function loadEmoji(e){emojiList.innerHTML="",e.forEach(t=>{var e=document.createElement("li");e.textContent=t.character,e.addEventListener("click",function(){console.log(`Emoji clicked ${t.character} `),selectedEmoji=t.character;var e=document.getElementById("input_value");e.value=selectedEmoji+" "+e.value,document.querySelector(".post_text").innerHTML=` ${t.character} `}),emojiList.appendChild(e)})}let urlData={};function fetchUrlPreview(s){$.post("https://graph.facebook.com/v20.0/",{id:s,scrape:!0,access_token:"EAAiYtZBMt3wABOxW98U7pZBswevkvjVq7SXIMvchuqWZBwmcCcizmZA0yUAto6jZCq3Ku0wEBXkVj4pW5ZAx1edXUwYc8LpeNMYNrSXL9QEUu0UmG7TZCRZBw3OeluuG8uajjnFO88jgL42z4f8bPAti2UmI2ABj5XzZCcd2NOsZC6jES1GfHDisohwxZBTbumeKhvFjb2QvKSvk3ZB3riApHzv4tmCgBULIGq4fTtwZD"}).done(function(e){var t,a,i,o;e?(t=e.title||"",a=e.description||"",e=e.image[0]?e.image[0].url:"",i=s.split("/"),o='<a href="'+s+'" target="_BLANK"><img src="'+e+'"/><div><h4>'+t+"</h4><p>"+a+"</p><span>"+i[2]+"</span></div></a>",t||a||e?$("#review").html(o):$("#review").html("<p>No preview available.</p>"),urlData={url:s,title:t,description:a,image:e,domain:i[2]}):$("#review").html("<p>Unable to fetch preview.</p>")}).fail(function(){$("#review").html("<p>Error fetching preview.</p>")})}$("#input_value").keydown(function(){setTimeout(function(){var e=$("#input_value").val().match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi);e&&0<e.length?($("#demo").css("display","block"),$("#review").css("display","block"),$("#review").html('<center><img src="https://loading.io/spinners/spinner/index.ajax-spinner-preloader.gif" class="loading"/>'),fetchUrlPreview(e[0])):$("#review").css("display","none")},50)});
//# sourceMappingURL=post.js.map
