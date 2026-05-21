<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useAudioStore } from '@/stores/audioStore'

const route = useRoute()
const router = useRouter()
const audioStore = useAudioStore()

const isZoomed = ref(false)

// Load the song immediately in setup to prevent any player flickering on page mount
audioStore.loadSong(route.params.id)

// Watch if the route ID changes (e.g. user clicks another track in the sidebar catalog)
watch(
  () => route.params.id,
  (newId) => {
    audioStore.loadSong(newId)
  },
)

// Update global volume state from local slider input
const updateVolume = (event) => {
  audioStore.setVolume(Number(event.target.value))
}

const selectSong = (id) => {
  audioStore.loadSong(id, true)
  router.push('/song/' + id)
}

const formatTime = (time) => {
  if (!time || isNaN(time)) return '0:00'
  const mins = Math.floor(time / 60)
  const secs = Math.floor(time % 60)
    .toString()
    .padStart(2, '0')
  return `${mins}:${secs}`
}

const goToVideo = (id) => {
  router.push('/video/' + id) // Assumes your video route uses a similar id parameter pattern
}
</script>

<template>
<div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        class="absolute left-30 top-30 w-96 h-96 rounded-full bg-emerald-600/20 dark:bg-emerald-400/15 blur-3xl -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        class="absolute left-190 top-90 w-96 h-96 rounded-full bg-emerald-400/25 dark:bg-emerald-400/15 blur-3xl -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        class="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl translate-x-1/4 translate-y-1/4"
      ></div>
    </div>


  <!-- Fullscreen Cover Art Zoom Modal -->
  <div
    v-if="isZoomed"
    @click="isZoomed = false"
    class="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fade-in"
  >
    <img
      v-if="audioStore.currentSong"
      :src="audioStore.currentSong.cover"
      class="max-h-[80vh] max-w-full rounded-3xl shadow-2xl border border-white/10"
    />
    <p class="text-white/60 mt-4 text-sm tracking-wider uppercase font-medium">
      Click anywhere to return
    </p>
  </div>

  <div
    class="relative min-h-[90vh] overflow-hidden text-black dark:text-white transition-colors duration-300"
  >
    <!-- Fullscreen ambient glow spotlights in the background (perfectly matches VideoDetailView) -->
    
    <!-- Main Layout Grid (2 Columns on Large Screens) -->
    <div class="relative max-w-8xl mx-auto p-15 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[20vh]">
      <!-- LEFT PANEL: Premium Audio Control Station (Takes up 2/3 of screen width) -->
      <div
        v-if="audioStore.currentSong"
        class="lg:col-span-2 flex flex-col bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl items-center justify-center"
      >
        <!-- Back Navigation Link -->
        <div class="w-full mb-6 flex items-center justify-between">
          <RouterLink
            to="/"
            class="text-gray-500 hover:text-green-500 dark:hover:text-emerald-400 transition font-semibold text-sm flex items-center gap-1 group"
          >
            <span class="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Library
          </RouterLink>

          <button
            @click="goToVideo(audioStore.currentSong.id)"
            class="text-gray-500 hover:text-green-500 dark:hover:text-emerald-400 transition font-semibold text-sm flex items-center gap-1 group"
          >
            <span class="group-hover:translate-x-0.5 transition-transform">See Music Video </span>
          </button>
        </div>

        

        <!-- Artwork Image -->
        <div
          class="relative group cursor-zoom-in mb-8 rounded-2xl overflow-hidden border border-white/10 bg-white/10 dark:bg-white/5 shadow-2xl"
          @click="isZoomed = true"
        >
          <img
            :src="audioStore.currentSong.cover"
            class="w-64 h-64 object-cover rounded-2xl group-hover:opacity-90 transition duration-300"
          />
          <div
            class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-medium rounded-2xl transition duration-300 text-sm"
          >
              View Fullscreen
          </div>
        </div>

        <!-- Song Metadata -->
        <div class="text-center mb-8 w-full">
          <h1 class="text-2xl md:text-3xl font-bold tracking-tight">
            {{ audioStore.currentSong.title }}
          </h1>
          <p class="text-lg text-green-600 dark:text-emerald-400 font-semibold">
            {{ audioStore.currentSong.artist }}
          </p>
        </div>

        <!-- Custom Spotify-Style Controls Assembly -->
        <div
          class="w-full max-w-md flex flex-col gap-5 bg-white/25 dark:bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-lg"
        >
          <!-- Timeline Progress Slider -->
          <div class="flex items-center gap-3 text-xs text-gray-500">
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

          <div class="flex items-center justify-between">
            <div class="w-24"></div>

            <!-- Playback Action Buttons -->
            <div class="flex items-center gap-6">
              <button
                @click="audioStore.changeSong(-1)"
                class="text-xl hover:text-green-500 dark:hover:text-emerald-400 transition active:scale-95"
              >
                ❮❮
              </button>
              <button
                @click="audioStore.togglePlay"
                class="w-12 h-12 flex items-center justify-center bg-green-500 hover:bg-green-400 text-white rounded-full shadow-lg transition transform hover:scale-105 active:scale-95"
              >
                <span class="text-xl pl-0.5">{{ audioStore.isPlaying ? '❚❚' : '▶︎' }}</span>
              </button>
              <button
                @click="audioStore.changeSong(1)"
                class="text-xl hover:text-green-500 dark:hover:text-emerald-400 transition active:scale-95"
              >
                ❯❯
              </button>
            </div>

            <!-- Volume Slider -->
            <div class="w-24 flex items-center gap-2 text-gray-500 justify-end">
              <span class="text-sm">🔈</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                :value="audioStore.volume"
                @input="updateVolume"
                class="w-full h-1 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT PANEL: Glassmorphic Sidebar Audio Catalog (Takes up 1/3 of screen width) -->
      <div
        class="lg:col-span-1 bg-white/30 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 p-6 rounded-3xl shadow-2xl h-fit"
      >
        <h2 class="text-lg font-bold mb-4 border-b pb-2 border-black/10 dark:border-white/10">
          Track Catalog
        </h2>

        <div class="flex flex-col gap-3">
          <!-- Loop through all available songs -->
          <div
            v-for="song in audioStore.songsList"
            :key="song.id"
            @click="selectSong(song.id)"
            class="flex flex-col p-4 rounded-2xl border transition duration-300 cursor-pointer"
            :class="
              audioStore.currentSong && song.id === audioStore.currentSong.id
                ? 'bg-green-500/10 border-green-500/40 shadow-lg shadow-green-500/5'
                : 'bg-white/10 dark:bg-transparent border-transparent hover:border-black/10 dark:hover:border-white/10 hover:bg-white/40 dark:hover:bg-white/5'
            "
          >
            <div class="flex justify-between items-start gap-3">
              <div class="flex items-center gap-3">
                <img
                  :src="song.cover"
                  alt="Song cover"
                  class="w-12 h-12 rounded-xl object-cover border border-white/10"
                />
                <div>
                  <h3
                    class="font-bold text-sm transition-colors duration-200"
                    :class="
                      audioStore.currentSong && song.id === audioStore.currentSong.id
                        ? 'text-green-600 dark:text-emerald-400'
                        : ''
                    "
                  >
                    {{ song.title }}
                  </h3>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ song.artist }}</p>
                </div>
              </div>
              <span
                v-if="audioStore.currentSong && song.id === audioStore.currentSong.id"
                class="bg-green-500/20 text-green-600 dark:bg-emerald-400/20 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full"
                :class="audioStore.isPlaying ? 'animate-pulse' : ''"
              >
                {{ audioStore.isPlaying ? 'Playing' : 'Paused' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
