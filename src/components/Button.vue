<template>
  <div
    role="button"
    @keydown="onKeyDown"
    @click="onClick"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    tabindex="-1"
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
    return 'bg-primary hover:bg-black hover:text-white'
  }
  if (active.value) {
    return 'bg-black text-white'
  }
  return 'hover:bg-primary'
})

const buttonClass = computed(() => {
  return [
    'inline-flex space-x-3 py-3 px-5 rounded-md cursor-pointer',
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
