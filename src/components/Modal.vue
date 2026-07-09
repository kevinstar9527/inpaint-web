<template>
  <div
    :class="[
      'absolute w-full h-full flex justify-center items-center',
      'bg-white bg-opacity-40 backdrop-filter backdrop-blur-md',
    ].join(' ')"
  >
    <div class="bg-primary p-16 max-w-4xl">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
