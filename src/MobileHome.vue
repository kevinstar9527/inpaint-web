<template>
  <div class="flex h-full flex-1 flex-col items-center justify-center overflow-hidden px-3 py-8">
    <!-- File select: full width on mobile -->
    <div class="w-full h-64">
      <FileSelect @selection="handleFileSelection" />
    </div>

    <!-- Demo images: horizontal scroll, preserve aspect ratio -->
    <div class="flex flex-col items-center pt-6 w-full">
      <span class="text-gray-500 dark:text-neutral-400 text-sm mb-3 text-center whitespace-nowrap">
        {{ tryItImagesText }}
      </span>
      <div
        class="flex space-x-3 overflow-x-auto snap-x snap-mandatory pb-2 w-full px-3"
        style="max-width: 100%;"
      >
        <div
          v-for="image in demoImages"
          :key="image"
          @click="startWithDemoImage(image)"
          role="button"
          tabindex="-1"
          class="flex-shrink-0 snap-start transition-all duration-300 active:scale-95 rounded-2xl overflow-hidden"
        >
          <img
            class="rounded-2xl ring-2 ring-gray-200/50 dark:ring-neutral-700/50"
            :src="`examples/${image}.jpeg`"
            :alt="image"
            :style="{ height: '100px', width: 'auto' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FileSelect from './components/FileSelect.vue'
import * as m from './paraglide/messages'
import { stateLanguageTag } from './reactive'

interface Props {
  onFileSelection: (file: File) => void
  onDemoImage: (img: string) => void
}

const props = defineProps<Props>()

const tryItImagesText = computed(() => {
  stateLanguageTag.value
  return m.try_it_images()
})

const demoImages = ['bag', 'dog', 'car', 'bird', 'jacket', 'shoe', 'paris']

function handleFileSelection(file: File) {
  props.onFileSelection(file)
}

function startWithDemoImage(img: string) {
  props.onDemoImage(img)
}
</script>
