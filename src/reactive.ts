import { ref } from 'vue'
import { onSetLanguageTag, languageTag } from './paraglide/runtime.js'

export const stateLanguageTag = ref<'en' | 'zh'>(languageTag() as 'en' | 'zh')

onSetLanguageTag((tag) => {
  stateLanguageTag.value = tag as 'en' | 'zh'
})
