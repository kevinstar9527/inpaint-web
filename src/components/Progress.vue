<template>
  <div class="w-full flex items-center">
    <div class="relative flex-1 bg-gray-200 dark:bg-neutral-700 h-2 mr-4 rounded-full overflow-hidden">
      <div
        class="absolute left-0 top-0 h-full bg-primary duration-100 transition-all ease-out"
        :style="{ width: `${percent}%` }"
      />
    </div>
    <span class="w-20 text-right text-sm font-medium text-gray-700 dark:text-neutral-300">{{ percent.toFixed(2) }}%</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  percent: number
}

defineProps<Props>()
</script>
