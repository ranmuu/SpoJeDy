<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useAudioStore } from '@/stores/audioStore'
import { RouterView, useRouter, useRoute } from 'vue-router' // 1. Added useRoute here
import navbar from './components/navbar.vue'

const userStore = useUserStore()
const audioStore = useAudioStore()
const router = useRouter()
const route = useRoute()

const formatTime = (time) => {
  if (!time || isNaN(time)) return '0:00'
  const mins = Math.floor(time / 60)
  const secs = Math.floor(time % 60)
    .toString()
    .padStart(2, '0')
  return `${mins}:${secs}`
}

onMounted(() => {
  userStore.init()
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 pt-16 pb-40">
    <navbar />
    <div class="px-37">
      <main>
        <RouterView />
      </main>

      <div
        v-if="audioStore.currentSong && !route.path.includes('/song/')"
        class="fixed bottom-4 left-1/2 z-20 w-[min(96vw,1000px)] -translate-x-1/2 bg-white/20 dark:bg-slate-950/40 border border-white/20 dark:border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 p-4"
      >
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div
            @click="router.push('/song/' + audioStore.currentSong.id)"
            class="flex items-center gap-4 min-w-0 md:flex-1 cursor-pointer"
          >
            <img
              :src="audioStore.currentSong.cover"
              alt="Cover art"
              class="w-16 h-16 rounded-2xl object-cover border border-white/10"
            />
            <div class="min-w-0">
              <p class="text-sm font-semibold text-black dark:text-white whitespace-normal">
                {{ audioStore.currentSong.title }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 whitespace-normal">
                {{ audioStore.currentSong.artist }}
              </p>
            </div>
          </div>

          <div class="flex justify-center md:w-60">
            <div class="flex items-center justify-center gap-4">
              <button
                @click="audioStore.changeSong(-1)"
                class="text-xl text-black dark:text-white hover:text-green-500 transition"
              >
                ❮❮
              </button>
              <button
                @click="audioStore.togglePlay"
                class="w-12 h-12 flex items-center justify-center bg-green-500 hover:bg-green-400 text-white rounded-full shadow-lg transition"
              >
                <span class="text-xl">
                  {{ audioStore.isPlaying ? '❚❚' : '▶︎' }}
                </span>
              </button>
              <button
                @click="audioStore.changeSong(1)"
                class="text-xl text-black dark:text-white hover:text-green-500 transition"
              >
                ❯❯
              </button>
            </div>
          </div>

          <div class="hidden md:flex items-center gap-2 text-gray-500" style="padding-left: 175px">
            <span class="text-sm">🔈</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              :value="audioStore.volume"
              @input="(e) => audioStore.setVolume(Number(e.target.value))"
              class="w-36 h-1 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
          </div>
        </div>

        <div class="mt-4 flex items-center gap-3 text-xs text-gray-500">
          <span>{{ formatTime(audioStore.currentTime) }}</span>
          <input
            type="range"
            min="0"
            :max="audioStore.duration"
            :value="audioStore.currentTime"
            @input="(e) => audioStore.seek(e.target.value)"
            class="flex-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <span>{{ formatTime(audioStore.duration) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
