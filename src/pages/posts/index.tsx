import React from "react"
import { useGetAllPostsQuery } from "../../app/services/postsApi"
import CreatePost from "../../components/create-post"
import Card from "../../components/card"

const Posts = () => {
  const { data } = useGetAllPostsQuery()
  return (
    <>
      <div className="mb-10 w-full flex">
        <CreatePost />
      </div>
      {data && data.length > 0
        ? data.map(
            ({
              content,
              author,
              id,
              authorId,
              comments,
              likes,
              likedByUser,
              createdAt,
            }) => (
              <Card
                key={id}
                avatarUrl={author.avatarUrl ?? ""}
                name={author.name ?? ""}
                authorId={authorId}
                content={content}
                cardFor="post"
                likesCount={likes.length}
                commentsCount={comments.length}
                id={id}
                likedByUser={likedByUser}
                createdAt={createdAt}
              />
            ),
          )
        : null}
    </>
  )
}

export default Posts
