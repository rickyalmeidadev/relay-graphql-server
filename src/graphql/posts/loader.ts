import fs from 'fs/promises'
import path from 'path'

const loadAll = async () => {
  const stringifiedJson = await fs.readFile(
    path.resolve(__dirname, '..', '..', '..', 'data.json'),
    'utf-8'
  )
  const json = JSON.parse(stringifiedJson)
  return json.posts
}

const PostLoader = {loadAll}

export default PostLoader
