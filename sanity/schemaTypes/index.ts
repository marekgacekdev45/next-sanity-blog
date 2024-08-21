import { type SchemaTypeDefinition } from 'sanity'
import { post } from '../lib/schemas/post'
import { tag } from '../lib/schemas/tag'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post,tag],
}
