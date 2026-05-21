<script setup>
import { useRouter } from 'vue-router'
import { useAudioStore } from '@/stores/audioStore'

const router = useRouter()
const audioStore = useAudioStore()

const songs = [
  {
    id: '1',
    title: 'About You',
    artist: 'The 1975',
    cover: 'https://ik.imagekit.io/ranmu/about%20you%20cover.png',
  },
  {
    id: '2',
    title: "You're All I Want",
    artist: 'Cigarettes After Sex',
    cover: 'https://ik.imagekit.io/ranmu/youre%20all%20i%20want.jpg',
  },
  {
    id: '3',
    title: 'Confident',
    artist: 'Justin Bieber',
    cover: 'https://ik.imagekit.io/ranmu/confident.jpg',
  },

  {
    id: '4',
    title: 'My Jealousy',
    artist: 'vivi baby, ovg!',
    cover: 'https://ik.imagekit.io/ranmu/my%20jealousy.jpg',
  },
  {
    id: '5',
    title: 'Can I Call You Tonight?',
    artist: 'Dayglow',
    cover: 'https://ik.imagekit.io/ranmu/CICYT.jpg',
  },
  {
    id: '6',
    title: 'BIRDS OF A FEATHER',
    artist: 'Billie Eilish',
    cover: 'https://ik.imagekit.io/ranmu/birdsofafeather.jpg',
  },
]

const selectSong = (id) => {
  audioStore.loadSong(id, true)
  router.push('/song/' + id)
}
</script>

<template>
  <!-- 1. Ambient Background Glowing Orbs -->

  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      class="absolute left-30 top-30 w-96 h-96 rounded-full bg-emerald-600/20 dark:bg-emerald-400/15 blur-3xl -translate-x-1/2 -translate-y-1/2"
    ></div>
    <div
      class="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl translate-x-1/4 translate-y-1/4"
    ></div>
  </div>
  <div class="relative min-h-[70vh] py-6">
    <div class="relative z-10">
      <!-- Header Section -->
      <div class="mb-10 max-w-2xl">
        <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-black dark:text-white">
          Your Music Library
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
          INILAH SAAATNYA CIHUYYYYq
        </p>
      </div>

      <!-- 2. Refined Glassmorphism Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 max-w-6xl mx-auto">
        <div
          v-for="song in songs"
          :key="song.id"
          @click="selectSong(song.id)"
          class="group relative bg-white/10 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-4xl p-4 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/15 dark:hover:shadow-emerald-500/5 hover:-translate-y-2 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 ease-out cursor-pointer overflow-hidden"
        >
          <!-- Shiny light reflection highlight on hover -->
          <div
            class="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          ></div>

          <!-- Modern Floating Art Container (Nested rounded frame with outer gap padding) -->
          <div
            class="relative overflow-hidden aspect-square rounded-2xl border border-white/10 bg-black/5 dark:bg-white/5 shadow-md shadow-black/10"
          >
            <img
              :src="song.cover"
              alt="Cover Art"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            <!-- hover animation -->
            <div
              class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
            >
              <div
                class="w-14 h-14 text-emerald-600 rounded-full shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300"
              ></div>
            </div>
          </div>

          <!-- Metadata Section -->
          <div class="pt-4 pb-2 px-1 flex justify-between items-center">
            <div class="min-w-0 flex-1">
              <h2
                class="font-bold text-lg text-black dark:text-white tracking-tight truncate group-hover:text-green-600 dark:group-hover:text-emerald-400 transition-colors duration-300"
              >
                {{ song.title }}
              </h2>
              <p class="text-gray-500 dark:text-gray-400 text-sm mt-0.5 font-semibold truncate">
                {{ song.artist }}
              </p>
            </div>

            <!-- Small play state design detail on the right -->
            <span
              class="text-xs text-green-600 dark:text-emerald-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2"
            >
              Play →
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
