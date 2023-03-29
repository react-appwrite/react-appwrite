import { Comment as CommentType } from '../types'
import { Avatar } from './Avatar'

function Comment(props: CommentType) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Avatar
          {...props}
        />

        <span className="font-semibold">
          {props.name}
        </span>
      </div>

      <p className="mt-1">
        {props.content}
      </p>
    </div>
  )
}

export { Comment }