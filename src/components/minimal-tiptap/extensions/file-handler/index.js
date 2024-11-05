import { Extension } from '@tiptap/react'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { filterFiles } from '../../utils'


const FileHandlePlugin = (options) => {
  const { key, editor, onPaste, onDrop, onValidationError, allowedMimeTypes, maxFileSize } = options

  return new Plugin({
    key: key || new PluginKey('fileHandler'),

    props: {
      handleDrop(view, event) {
        event.preventDefault()
        event.stopPropagation()

        const { dataTransfer } = event

        if (!dataTransfer?.files.length) {
          return
        }

        const pos = view.posAtCoords({
          left: event.clientX,
          top: event.clientY
        })

        const [validFiles, errors] = filterFiles(Array.from(dataTransfer.files), {
          allowedMimeTypes,
          maxFileSize,
          allowBase64: options.allowBase64
        })

        if (errors.length > 0 && onValidationError) {
          onValidationError(errors)
        }

        if (validFiles.length > 0 && onDrop) {
          onDrop(editor, validFiles, pos?.pos ?? 0)
        }
      },

      handlePaste(_, event) {
        event.preventDefault()
        event.stopPropagation()

        const { clipboardData } = event

        if (!clipboardData?.files.length) {
          return
        }

        const [validFiles, errors] = filterFiles(Array.from(clipboardData.files), {
          allowedMimeTypes,
          maxFileSize,
          allowBase64: options.allowBase64
        })
        const html = clipboardData.getData('text/html')

        if (errors.length > 0 && onValidationError) {
          onValidationError(errors)
        }

        if (validFiles.length > 0 && onPaste) {
          onPaste(editor, validFiles, html)
        }
      }
    }
  })
}

export const FileHandler = Extension.create({
  name: 'fileHandler',

  addOptions() {
    return {
      allowBase64: false,
      allowedMimeTypes: [],
      maxFileSize: 0
    }
  },

  addProseMirrorPlugins() {
    return [
      FileHandlePlugin({
        key: new PluginKey(this.name),
        editor: this.editor,
        ...this.options
      })
    ]
  }
})
