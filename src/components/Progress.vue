<template>
  <div class="w-full flex items-center">
    <div class="relative flex-1 bg-black/20 h-2 mr-4">
      <div
        class="absolute left-0 top-0 h-full bg-black duration-100"
        :style="{ width: `${percent}%` }"
      />
    </div>
    <span class="w-20 text-right">{{ percent.toFixed(2) }}%</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  percent: number
}

defineProps<Props>()
</script>
