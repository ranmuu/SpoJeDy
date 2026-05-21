<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const isUploading = ref(false)
const previewImage = ref(null)
const newName = ref(userStore.username)

const currentImage = computed(() => {
  return previewImage.value || userStore.profileImage || 'https://via.placeholder.com/100'
})

// 1. Update Username
const updateName = () => {
  userStore.updateUsername(newName.value)
  alert('Name saved!')
}

// 2. Simple Image Upload & Compression
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  isUploading.value = true
  previewImage.value = null

  const reader = new FileReader()
  reader.readAsDataURL(file)

  reader.onload = (e) => {
    const imageDataUrl = e.target.result
    previewImage.value = imageDataUrl

    const img = new Image()
    img.src = imageDataUrl

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.4)

      setTimeout(() => {
        userStore.updateProfileImage(compressedBase64)
        previewImage.value = compressedBase64
        isUploading.value = false
      }, 1000)
    }
  }
}
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      class="absolute left-12 top-0 w-64 h-64 rounded-full bg-emerald-400/20 dark:bg-emerald-400/10 blur-3xl"
    ></div>
    <div
      class="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl"
    ></div>
  </div>
  <div class="relative min-h-[75vh] py-10 overflow-hidden">
    <div class="relative z-10 max-w-3xl mx-auto px-4">
      <div
        class="bg-white/20 dark:bg-slate-950/50 border border-white/15 dark:border-white/10 backdrop-blur-2xl rounded-4xl shadow-2xl shadow-black/10 p-8"
      >
        <div class="mb-8">
          <h1 class="text-3xl font-black tracking-tight text-black dark:text-white mb-2">
            Profile Settings
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Update your username, switch themes, and manage your profile photo.
          </p>
        </div>

        <div class="grid gap-8">
          <div
            class="bg-white/70 dark:bg-slate-900/80 border border-white/20 dark:border-white/10 rounded-3xl p-6 shadow-lg"
          >
            <h2 class="text-lg font-semibold text-black dark:text-white mb-4">Username</h2>
            <div class="flex flex-col gap-3">
              <input
                v-model="newName"
                type="text"
                class="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-500/20"
              />
              <button
                @click="updateName"
                class="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
              >
                Save Name
              </button>
            </div>
          </div>

          <div
            class="bg-white/70 dark:bg-slate-900/80 border border-white/20 dark:border-white/10 rounded-3xl p-6 shadow-lg"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Current Theme</p>
                <p class="font-semibold text-black dark:text-white capitalize">
                  {{ userStore.theme }}
                </p>
              </div>
              <button
                @click="userStore.toggleTheme()"
                class="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                Switch Theme
              </button>
            </div>
          </div>

          <div
            class="bg-white/70 dark:bg-slate-900/80 border border-white/20 dark:border-white/10 rounded-3xl p-6 shadow-lg"
          >
            <h2 class="text-lg font-semibold text-black dark:text-white mb-4">Profile Picture</h2>
            <div class="flex flex-col sm:flex-row sm:items-center gap-4">
              <img
                :src="currentImage"
                class="w-24 h-24 rounded-full object-cover border border-white/20 shadow-lg profile-avatar"
                :class="{ 'profile-avatar--loading': isUploading }"
              />
              <div class="flex-1">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Upload a new image to update your profile photo.
                </p>
                <input
                  type="file"
                  @change="handleFileUpload"
                  accept="image/*"
                  class="text-sm text-black dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-avatar {
  transition:
    filter 0.5s ease,
    opacity 0.5s ease,
    transform 0.5s ease;
  filter: blur(0);
  opacity: 1;
}

.profile-avatar--loading {
  transition:
    filter 0s ease,
    opacity 0.1s ease,
    transform 0s ease;
  filter: blur(18px);
  opacity: 0.72;
}
</style>
