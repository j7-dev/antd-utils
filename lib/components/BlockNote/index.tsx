import { FC } from 'react'
import '@blocknote/core/fonts/inter.css'
import { BlockNoteView } from '@blocknote/mantine'
import { BlockNoteViewProps } from '@blocknote/react'
import {
  DefaultStyleSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
} from '@blocknote/core'
import '@blocknote/mantine/style.css'

export * from './useBlockNote'

export const BlockNote: FC<
  BlockNoteViewProps<
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema
  >
> = (blockNoteViewProps) => {
  return <BlockNoteView {...blockNoteViewProps} />
}
