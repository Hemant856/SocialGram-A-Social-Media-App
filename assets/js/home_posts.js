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
              
                deletePost($(' .delete-post-button', new_post));

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
    // method to delete a post 

let deletePost = (deleteLink) => {
    $(deleteLink).click((event) => {
        event.preventDefault();

        $.ajax({
            type: 'GET',
            url: $(deleteLink).prop('href'),
            success: (data) => {
                $(`#post_${data.data.post_id}`).remove();
                noty_flash('success', 'Post deleted Successfully')



            },
            error: (error) => {
                console.log(error.responseText);
                noty_flash('error', 'Error in deleting the Post!')

            }
        })
    })

}

let apply_dynamic_delete_to_existing_posts = function() {
    for (let link of $('.delete-post-button')) {
        deletePost(link);
    }
}



apply_dynamic_delete_to_existing_posts();
create_post();

///////////********* */
// comment functionality

let comment_creator = function(new_comment_form) {
   
    new_comment_form.submit((event) => {
        event.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/comments/create',
            data: new_comment_form.serialize(),
            success: (data) => {
                console.log(data);
                let new_comment = new_comment_dom(data.data);
                $(`#post-comments-${data.data.post_id}`).prepend(new_comment);
                $(`#post_${data.data.post_id} .new-comment-form input`)[0].value = "";
                noty_flash('success', 'Comment posted Successfully');
                delete_comment($(' .delete-comment-button', new_comment));



            },
            error: (error) => {
                noty_flash('error', 'Error in posting comment')
                console.log(error.responseText);
            }
        })
    })
}

// created comment dom

let new_comment_dom = (data) => {
    return $(`<div id="comment_id_${data.comment_id}">
    <!-- user will only be able to delete his own comments -->
        <div class="dropdown">
            <a class="float-right" href="" id="more_options_${data.comment_id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-h"></i>
            </a>
            <div class="dropdown-menu" aria-labelledby="more_options_${data.comment_id}">
                <a class="dropdown-item delete-comment-button" href="/comments/destroy/${data.comment_id}"><i
                    class="fas fa-trash-alt"></i>
                Delete</a>
            </div>
        </div>
            <b>${data.user_name}</b>
            <p>
            ${data.comment_content}
            </p>
            <div class="align-middle action-buttons">
                <!-- like button on post -->
                <!-- comment button on post -->
                <a data-toggle="collapse" href="#collapse${data.comment_id}" role="button" aria-expanded="false" aria-controls="collapse${data.comment_id}"><i class="far fa-comment"></i></a>&nbsp
                <!-- send button on post -->
                <a href=""><i class="fas fa-paper-plane"></i></a>
            </div>
            <hr>
</div>`)
}

let delete_comment = (deleteLink) => {
    $(deleteLink).click((event) => {
        event.preventDefault();

        $.ajax({
            type: 'GET',
            url: $(deleteLink).prop('href'),
            success: (data) => {
                $(`#comment_id_${data.data.comment_id}`).remove();
                noty_flash('success', 'Comment deleted Successfully')

            },
            error: (error) => {
                console.log(error.responseText)
                noty_flash('error', 'Error in deleting the Comment!')

            }
        })
    })
}

let apply_dynamic_comment_delete_to_existing_comments = (link) => {
    delete_comment(link);
}


for (let link of $('.delete-comment-button')) {
    apply_dynamic_comment_delete_to_existing_comments(link);
}

/* applying dynamic comment creation on all the posts of the page */


for (let new_comment_form of $('.new-comment-form')) {
    comment_creator($(new_comment_form));
}