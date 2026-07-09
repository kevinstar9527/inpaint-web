<template>
  <a :href="href" class="font-black underline">
    <slot />
  </a>
</template>

<script setup lang="ts">
interface Props {
  href: string
}

defineProps<Props>()
</script>
