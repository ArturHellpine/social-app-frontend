import React from "react"
import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postsApi"
import Card from "../../components/card"
import GoBack from "../../components/go-back"
import CreateComment from "../../components/create-comment";
import {Comment} from "../../app/types";

const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params?.id ?? "")

  if (!data) {
    return <h2>Пост не знайдений</h2>
  }

  const {
    content,
    id,
    authorId,
    comments,
    likes,
    author,
    likedByUser,
    createdAt,
  } = data
  return (
    <>
      <GoBack />
      <Card
        id={id}
        likedByUser={likedByUser}
        createdAt={createdAt}
        avatarUrl={author.avatarUrl ?? ""}
        name={author.name ?? ""}
        authorId={authorId}
        content={content}
        cardFor="current-post"
        likesCount={likes.length}
        commentsCount={comments.length}
      />
      <div className='mt-10'>
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map((comment: Comment) => (
              <Card
                cardFor="comment"
                key={comment.id}
                avatarUrl={comment.user.avatarUrl ?? ""}
                content={comment.content}
                name={comment.user.name ?? ""}
                authorId={comment.userId}
                commentId={comment.id}
                id={id}
              />
            ))
          : null}
      </div>
    </>
  )
}

export default CurrentPost
