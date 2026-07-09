<template>
  <label
    :for="uploadElemId"
    class="block w-full h-full group relative cursor-pointer rounded-md font-medium focus-within:outline-none"
  >
    <div
      :class="dropZoneClass"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
    >
      <input
        :id="uploadElemId"
        :name="uploadElemId"
        type="file"
        class="sr-only"
        @change="handleFileChange"
        accept="image/png, image/jpeg, image/webp"
      />
      <p>{{ dropZoneText }}</p>
    </div>
  </label>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import * as m from '../paraglide/messages'

interface Props {
  onSelection: (file: File) => void
}

const props = defineProps<Props>()

const dragHover = ref(false)
const uploadElemId = `file-upload-${Math.random().toString()}`

const dropZoneText = m.drop_zone()

const dropZoneClass = computed(() => {
  return [
    'w-full h-full flex items-center justify-center px-6 pt-5 pb-6 text-xl',
    'border-4 border-dashed rounded-md',
    'hover:border-black hover:bg-primary',
    'text-center',
    dragHover.value ? 'border-black bg-primary' : 'bg-gray-100 border-gray-300',
  ].join(' ')
})

function onFileSelected(file: File) {
  if (!file) {
    return
  }
  const isImage = file.type.match('image.*')
  if (!isImage) {
    return
  }
  try {
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('file too large')
    }
    props.onSelection(file)
  } catch (e) {
    alert(`error: ${(e as any).message}`)
  }
}

async function getFile(entry: any): Promise<File> {
  return new Promise((resolve) => {
    entry.file((file: File) => resolve(file))
  })
}

async function getAllFileEntries(items: DataTransferItemList) {
  const fileEntries: Array<File> = []
  const queue = []
  for (let i = 0; i < items.length; i += 1) {
    queue.push(items[i].webkitGetAsEntry())
  }
  while (queue.length > 0) {
    const entry = queue.shift()
    if (entry?.isFile) {
      const file = await getFile(entry)
      fileEntries.push(file)
    } else if (entry?.isDirectory) {
      queue.push(...(await readAllDirectoryEntries((entry as any).createReader())))
    }
  }
  return fileEntries
}

async function readAllDirectoryEntries(directoryReader: any) {
  const entries = []
  let readEntries = await readEntriesPromise(directoryReader)
  while (readEntries.length > 0) {
    entries.push(...readEntries)
    readEntries = await readEntriesPromise(directoryReader)
  }
  return entries
}

async function readEntriesPromise(directoryReader: any): Promise<any> {
  return new Promise((resolve, reject) => {
    directoryReader.readEntries(resolve, reject)
  })
}

async function handleDrop(ev: DragEvent) {
  ev.preventDefault()
  const items = await getAllFileEntries(ev.dataTransfer!.items)
  dragHover.value = false
  onFileSelected(items[0])
}

function handleDragOver(ev: DragEvent) {
  ev.stopPropagation()
  ev.preventDefault()
  dragHover.value = true
}

function handleDragLeave() {
  dragHover.value = false
}

function handleFileChange(ev: Event) {
  const file = (ev.target as HTMLInputElement).files?.[0]
  if (file) {
    onFileSelected(file)
  }
}
</script>
