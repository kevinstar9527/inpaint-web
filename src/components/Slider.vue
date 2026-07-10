<template>
  <div class="inline-flex items-center space-x-4 text-gray-700 dark:text-neutral-200">
    <span class="text-sm font-medium">{{ label }}</span>
    <input
      :class="['appearance-none rounded-lg h-2', 'bg-gray-200 dark:bg-neutral-700'].join(' ')"
      type="range"
      :step="step"
      :min="min"
      :max="max"
      :value="value"
      @pointerdown="onStart"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label?: any
  value?: number
  min?: number
  max?: number
}

interface Emits {
  (e: 'change', value: number): void
  (e: 'start'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const step = computed(() => ((props.max || 100) - (props.min || 0)) / 100)

function onChange(ev: Event) {
  ev.preventDefault()
  ev.stopPropagation()
  emit('change', parseInt((ev.target as HTMLInputElement).value, 10))
}

function onStart() {
  emit('start')
}
</script>
