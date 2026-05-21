<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between gap-4 px-9 py-4 bg-white/20
     dark:bg-slate-800/10 text-slate-900 dark:text-white border-b border-white/10 dark:border-white/10 
     backdrop-blur-2xl shadow-2xl shadow-black/10"
  >
    <div class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">SpoJeDy</div>

    <div class="flex flex-wrap items-center gap-7">
      <RouterLink
        to="/"
        class="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-400 transition"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/videos"
        class="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-400 transition"
      >
        Videos
      </RouterLink>
    </div>

    <div>
      <RouterLink
        to="/profile"
        class="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 transition hover:text-emerald-400"
      >
        <span>{{ userStore.username }}</span>
        <img
          :src="userStore.profileImage || 'https://via.placeholder.com/40'"
          class="w-8 h-8 rounded-full object-cover border border-white/10"
        />
      </RouterLink>
    </div>
  </nav>
</template>
