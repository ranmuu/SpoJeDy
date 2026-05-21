<script setup>
import { RouterLink } from 'vue-router'

// Your assignment requires dummy data for at least 2 music videos
// Note: You MUST use your own CDN links (like ImageKit) as requested
const videoList = [
  {
    id: 1,
    title: 'About You',
    artist: 'The 1975',
    cover: 'https://ik.imagekit.io/ranmu/about%20you%20cover.png', // Replace with your CDN link
  },
  {
    id: 2,
    title: "You're All I Want",
    artist: 'Cigarettes After Sex',
    cover: 'https://ik.imagekit.io/ranmu/youre%20all%20i%20want.jpg', // Replace with your CDN link
  },
  {
    id: 3,
    title: 'Confident',
    artist: 'Justin Bieber',
    cover: 'https://ik.imagekit.io/ranmu/confident.jpg', // Replace with your CDN link
  },
  
  {
    id: 4,
    title: 'My Jealousy',
    artist: 'vivi baby, ovg!',
    cover: 'https://ik.imagekit.io/ranmu/my%20jealousy.jpg', // Replace with your CDN link
  },
  {
    id: 5,
    title: 'Can I Call You Tonight?',
    artist: 'Dayglow',
    cover: 'https://ik.imagekit.io/ranmu/CICYT.jpg', // Replace with your CDN link
  },
  {
    id: 6,
    title: 'BIRDS OF A FEATHER',
    artist: 'Billie Eilish',
    cover: 'https://ik.imagekit.io/ranmu/birdsofafeather.jpg', // Replace with your CDN link
  }


]
</script>

<template>

  
  <div>
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute left-30 top-30 w-96 h-96 rounded-full bg-emerald-600/20 dark:bg-emerald-400/15 blur-3xl -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        class="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl"
      ></div>
    </div>

    <div class="mb-10 max-w-2xl">
        <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-black dark:text-white" style="padding-top: 24px">
          Music Videos
        </h1>
      </div>

    <div class="relative z-10 px-10 py-1 max-w-6xl mx-auto">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <RouterLink
          v-for="video in videoList"
          :key="video.id"
          :to="'/video/' + video.id"
          class="group relative bg-white/20 dark:bg-slate-950/40 backdrop-blur-2xl border border-white/10 dark:border-white/10 rounded-2xl p-4 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div
            class="relative overflow-hidden aspect-video rounded-2xl border border-white/10 bg-black/5 dark:bg-white/5 shadow-md shadow-black/10 mb-4"
          >
            <img
              :src="video.cover"
              :alt="video.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div>
            <h2 class="text-xl font-bold text-black dark:text-white mb-1">{{ video.title }}</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ video.artist }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
