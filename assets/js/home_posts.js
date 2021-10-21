// method to submit data form using ajax
function noty_flash(type, message) {
    new Noty({
        theme: 'metroui',
        text: message,
        type: type,
        layout: 'topRight',
        timeout: 1500,
    }).show();
}


let create_post = () => {
    let new_post_form = $('#new-post-form');
    new_post_form.submit((event) => {
        event.preventDefault();


        $.ajax({
            type: 'POST',
            url: '/posts/create',
            data: new_post_form.serialize(),
            success: (data) => {
                console.log(data);
                let new_post = new_post_dom(data.data);
                $('#posts-container').prepend(new_post);


                noty_flash('success', 'Post created Successfully!');
                $('textarea')[0].value = ""; /* clearing the text area */


            },

            error: (error) => {
                console.log(error.responseText);
            }
        });

    });
}

let new_post_dom = (data) => {
    return $(`<div class="card w-100 mt-3 mb-2" id="post_${data.post_id}">
            <div class="card-body">
        
                <!-- options to delete a post and stuff -->
                    <div class="dropdown">
                        <a class="float-right" href="" id="more_options_${data.post_id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-h"></i>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="more_options_${data.post_id}">
                            <a class="dropdown-item delete-post-button" href="/posts/destroy/${data.post_id}"><i class="fas fa-trash-alt"></i> Delete
                                </a>
                        </div>
                    </div>
        
                        <div class="card-title">
                            <div class="post-user-profile">
                                <img class="profile-img" src="/images/image-1.jpg" alt="">
        
                            </div>
                            <div class="post-user-name">
                                ${data.user_name}
                                    <small class="post-time">${data.updatedAt.toString().substr(14,5)}</small>
        
        
                            </div>
        
        
        
        
                        </div>
                        <p class="card-text">
                        ${data.post_content}
                        </p>
                        <div class="card-text mt-2"><small style="font-weight: 600;">${data.updatedAt.toString().substr(0, 10)}</small></div>
                        <hr>
        
                        <div class="align-middle action-buttons">
                            <!-- like button on post -->
        
                            <!-- comment button on post -->
                            <a data-toggle="collapse" href="#collapse_${data.post_id}" role="button" aria-expanded="false" aria-controls="collapse${data.post_id}"><i class="far fa-comment"></i></a>&nbsp&nbsp&nbsp
                            <!-- send button on post -->
                            <a href=""><i class="fas fa-paper-plane"></i></a>
                        </div>
        
        
            </div>
            <div class="collapse post-comments mr-2 ml-2" id="collapse_${data.post_id}">
                    <form action="/comments/create" method="POST" class="new-comment-form">
                        <input type="text" class="form-control" placeholder="Add a new Comment..." aria-label="Username" aria-describedby="basic-addon1" name="content" required>
                        <input type="hidden" name="post" value="${data.post_id}">
                        <button type="submit" class="btn btn-primary btn-sm mt-2 mb-2 mr-2">Add Comment</button>
                    </form>
                    <!-- comments list container -->
                    <hr>
                    <div class="post-comments-lister-list pl-4 pr-4">
                        <div id="post-comments-${data.post_id}">
                            
                        </div>
                    </div>
            </div>
        </div>`)
}


create_post();