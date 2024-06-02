"use strict";document.addEventListener("DOMContentLoaded",function(){document.querySelector(".setting_menu");const e=document.getElementById("dark_btn");document.getElementById("preview");let n=[];function i(n){var e=document.createElement("div");e.classList.add("add_post_container"),e.style.display="block",e.dataset.id=n.id;let o=`
            <div class="post_row">
                <div class="user_profile">
                    <img src="${n.user.profileImage}" alt="Profile Image">
                    <div>
                        <p class="userName">${n.user.name}</p>
                        <p class="date"><small>${new Date(n.date).toLocaleString()}</small></p>
                    </div>
                </div>
                <a href=""><i class=""></i></a>
                <button class="delete_post" onclick="deletePost(${n.id})">Delete</button>
            </div>
            <p class="postContent">${n.content}</p>
        `;0<n.images.length&&(o+='<div class="post_image_container grid_image_container">',n.images.forEach((e,t)=>{t<3?o+=`<img class="post_img" src="${e}" alt="postImage" onclick='showImagesInModal(${JSON.stringify(n.images)})'>`:3===t&&(o+=`
                        <div class="more_images">
                            <img class="post_img" src="${e}" alt="postImage">
                            <div class="more_overlay">+${n.images.length-4}</div>
                        </div>
                    `)}),o+="</div>"),n.urlPreview&&n.urlPreview.url&&(o+=`
                <div class="url_preview">
                    <a href="${n.urlPreview.url}" target="_BLANK">
                        <img src="${n.urlPreview.image}" alt="Preview Image"/>
                        <div>
                            <h4>${n.urlPreview.title}</h4>
                            <p>${n.urlPreview.description}</p>
                            <span>${n.urlPreview.domain}</span>
                        </div>
                    </a>
                </div>
            `),o+=`
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
        `,e.innerHTML=o;var t=document.body.querySelector(".post_col");t?(t.appendChild(e),e.querySelectorAll(".post_img").forEach(e=>{e.addEventListener("click",()=>{var e=n.images,t=document.querySelector(".image-modal");if(t){const o=t.querySelector(".image-gallery");o?(o.innerHTML="",e.forEach(e=>{var t=document.createElement("img");t.src=e,o.appendChild(t)}),t.style.display="block"):console.error("Image gallery element not found in modal.")}else console.error("Modal element not found.")})})):console.error("Parent element not found for appending the post.")}e?e.onclick=function(){e.classList.toggle("dark_btn_on")}:console.error("Dark mode button not found.");var t=document.querySelectorAll(".add_post_link a"),t=(t?t.forEach(e=>{e.addEventListener("click",function(e){e.preventDefault();e=e.target.id;if(console.log(e),"post-pic"===e){var t=document.querySelector(".uploadOuter");t?t.style.display="block":console.error("Upload outer element not found.")}else if("post-felling"===e)a?(a.classList.toggle("active"),a.style.display="block",fetch("https://emoji-api.com/emojis?access_key=8f1226c4f21f2ba77b7c603b0ade575a4271e3b5").then(e=>e.json()).then(e=>{e=e,s?(s.innerHTML="",e.forEach(t=>{var e=document.createElement("li");e.textContent=t.character,e.addEventListener("click",function(){console.log("Emoji clicked "+t.character),l=t.character;var e=document.getElementById("input_value");e?(e.value=l+" "+e.value,(e=document.querySelector(".post_text"))?e.innerHTML=` ${t.character} `:console.error("Post text element not found.")):console.error("Input value element not found.")}),s.appendChild(e)})):console.error("Emoji list element not found.")})):console.error("Emoji selector element not found.");else if("post-video"===e){t=document.getElementById("webCam");if(t){t.style.display="block";const o=document.getElementById("vid");o?(o.muted=!0,navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then(e=>{o.srcObject=e,o.addEventListener("loadedmetadata",()=>{o.play()}),o.stream=e}).catch(alert)):console.error("Video element not found.")}else console.error("WebCam element not found.")}})}):console.error("Post links not found."),document.getElementById("post_button"));t?t.onclick=function(){var e,t={id:Date.now(),user:{name:"John Doe",profileImage:"assets/images/profile-pic.png"},date:new Date,content:document.getElementById("input_value").value,images:n,urlPreview:r},o=(o=t,(e=JSON.parse(localStorage.getItem("posts"))||[]).push(o),localStorage.setItem("posts",JSON.stringify(e)),i(t),n=[],document.getElementById("input_value"));o?o.value="":console.error("Input value element not found.")}:console.error("Post button element not found.");{const o=document.createElement("div");o.classList.add("image-modal"),o.innerHTML=`
            <div class="image-modal-content">
                <span class="close">&times;</span>
                <div class="image-gallery"></div>
            </div>
        `,document.body.appendChild(o),(t=o.querySelector(".close"))?t.onclick=function(){o.style.display="none"}:console.error("Close button not found in modal."),o.onclick=function(e){e.target===o&&(o.style.display="none")}}!function(){let e=localStorage.getItem("posts");if(e){try{e=JSON.parse(e)}catch(e){return console.error("Error parsing JSON:",e)}e.sort((e,t)=>new Date(t.date)-new Date(e.date)),e.forEach(e=>{i(e)})}}();const a=document.getElementById("emojiSelector"),s=document.getElementById("emojiList");let l="";let r={};$("#input_value").keydown(function(){setTimeout(function(){var a,e=$("#input_value").val().match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi);e&&0<e.length?($("#demo").css("display","block"),$("#review").css("display","block"),$("#review").html('<center><img src="https://loading.io/spinners/spinner/index.ajax-spinner-preloader.gif" class="loading"/>'),a=e[0],$.post("https://graph.facebook.com/v20.0/",{id:a,scrape:!0,access_token:"EAAiYtZBMt3wABO6owBqfBIvU8VK5Tp6B52NAZCfc9fSUR88Pi3yEMHKYNcBaWZBc4RW6NZAdPTjcreyGYX4CsXBEtFUiJWr4zRfnqZAEQXY0ydiAgo3g0bjBspLBiMBOa7ZA3iJzpqhMr5iLEjnH91HJasedXzxupGIAUJGIqoFC7SS1xU5Wn7YqeuKyPfPMCgwx4q0pQOVHD54VNWIhoZAQD2Bzsl5mSzTkwZDZD"}).done(function(e){var t=e.title||"",o=e.description||"",e=e.image[0]?e.image[0].url:"",n=a.split("/")[2],i=t||o||e?`
                <a href="${a}" target="_BLANK">
                    <img src="${e}"/>
                    <div>
                        <h4>${t}</h4>
                        <p>${o}</p>
                        <span>${n}</span>
                    </div>
                </a>
            `:"<p>No preview available.</p>";$("#review").html(i),r={url:a,title:t,description:o,image:e,domain:n}}).fail(function(){$("#review").html("<p>Error fetching preview.</p>")})):$("#review").css("display","none")},50)})});
//# sourceMappingURL=post.js.map
