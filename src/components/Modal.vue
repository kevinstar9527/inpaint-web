<template>
  <div
    :class="[
      'absolute w-full h-full flex justify-center items-center',
      'bg-black/40 dark:bg-black/60 backdrop-filter backdrop-blur-md',
    ].join(' ')"
  >
    <div class="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-12 max-w-4xl shadow-2xl">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
