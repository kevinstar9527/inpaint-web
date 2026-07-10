<template>
  <div
    role="button"
    @keydown="onKeyDown"
    @click="onClick"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    tabindex="0"
    :class="buttonClass"
    :style="style"
  >
    <slot name="icon" />
    <span class="whitespace-nowrap select-none">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  className?: string
  primary?: boolean
  style?: Record<string, string>
}

interface Emits {
  (e: 'click'): void
  (e: 'down'): void
  (e: 'up'): void
  (e: 'enter'): void
  (e: 'leave'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const active = ref(false)

const background = computed(() => {
  if (props.primary) {
    return 'bg-primary hover:bg-primary/90 text-white'
  }
  if (active.value) {
    return 'bg-gray-200 dark:bg-neutral-700 text-gray-900 dark:text-white'
  }
  return 'hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-neutral-200'
})

const buttonClass = computed(() => {
  return [
    'inline-flex space-x-3 py-2.5 px-4 rounded-lg cursor-pointer',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900',
    'active:scale-95',
    background.value,
    props.className || '',
  ].join(' ')
})

function onKeyDown() {
  emit('down')
}

function onClick() {
  emit('click')
}

function onPointerDown() {
  active.value = true
  emit('down')
}

function onPointerUp() {
  active.value = false
  emit('up')
}

function onPointerEnter() {
  emit('enter')
}

function onPointerLeave() {
  emit('leave')
}
</script>
