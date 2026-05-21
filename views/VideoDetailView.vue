<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

const route = useRoute()
const router = useRouter()
const videoId = ref(route.params.id)

// 1. Master Video Database
const videosList = [
  {
    id: "1",
    title: "About You",
    artist: "The 1975",
    videoSrc: "https://www.youtube.com/embed/iqGAW57EudQ", 
    description: "The 1975 performs 'About You' from their album 'Being Funny in a Foreign Language'. The video encapsulates a cinematic, dreamy landscape reflecting the track's shoegaze revival textures."
  },
  {
    id: "2",
    title: "You're All I Want",
    artist: "Cigarettes After Sex",
    videoSrc: "https://www.youtube.com/embed/oQoJIciVu_M",
    description: "Cigarettes After Sex delivers a moody, ambient visual experience for 'You're All I Want', blending dark, intimate noir stylings with their signature slowcore dream-pop atmosphere."
  },
  {
    id: "3",
    title: "Confident",
    artist: "Justin Bieber",
    videoSrc: "https://www.youtube.com/embed/47YClVMlthI",
    description: "Justin Bieber stars in the high-energy, narrative-driven music video for 'Confident' featuring Chance the Rapper, showcasing incredible choreography and a sleek industrial visual tone."
  },

  {
    id: "4",
    title: "My Jealousy",
    artist: "vivi baby, ovg!",
    videoSrc: "https://www.youtube.com/embed/sfgPTRPM7qY",
    description: "vivi baby and ovg! create a surreal, pastel-hued visual world for 'My Jealousy', blending whimsical animation with lo-fi aesthetics to match the track's playful yet introspective vibe."
  },
  {
    id: "5",
    title: "Can I Call You Tonight?",
    artist: "Dayglow",
    videoSrc: "https://www.youtube.com/embed/hh1WeQxfCX0",
    description: "Dayglow's 'Can I Call You Tonight?' music video is a stylish, narrative-driven piece that combines sleek cinematography with a storyline of romantic tension and self-reflection, perfectly complementing the song's sultry R&B groove."
  },
  {
    id: "6",
    title: "BIRDS OF A FEATHER",
    artist: "Billie Eilish",
    videoSrc: "https://www.youtube.com/embed/V9PVRfjEBTI",
    description: "Billie Eilish's 'BIRDS OF A FEATHER' music video is a visually striking piece that combines surreal imagery with a narrative of self-discovery and empowerment."
  }
]

// 2. Dynamic Finder Logic
const videoData = ref({})

const loadVideoData = (id) => {
  const found = videosList.find(v => v.id === String(id))
  if (found) {
    videoData.value = found
  } else {
    // Safe fallback to first video
    videoData.value = videosList[0]
  }
}

// Initial load
loadVideoData(route.params.id)

// Watch if the route ID changes (e.g. user clicks another video in the sidebar)
watch(() => route.params.id, (newId) => {
  videoId.value = newId
  loadVideoData(newId)
})

const goToSongDetails = (id) => {
  if (id) {
    router.push('/song/' + id)
  }
}
</script>

<template>
  
  <div>
    <!-- Fullscreen ambient glow spotlights in the background -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute top-10 left-10 w-80 h-80 rounded-full bg-emerald-400/10 dark:bg-emerald-400/5 blur-3xl -translate-x-1/4 -translate-y-1/4"></div>
      <div class="absolute bottom-30 right-10 w-96 h-96 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl translate-x-1/4 translate-y-1/4"></div>
    </div>
    

    <!-- Main Layout Grid (2 Columns on Large Screens) -->
    <div class="relative max-w-7xl text-black dark:text-white mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[80vh]">
      
      <!-- LEFT PANEL: Cinema Video Station (Takes up 2/3 of the screen width) -->
      <div class="lg:col-span-2 flex flex-col  bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl">
        
        <!-- Back Navigation Link -->
        <div class="w-full mb-6 flex items-center justify-between">
          <RouterLink to="/videos" class="text-gray-500 hover:text-green-500 dark:hover:text-emerald-400 transition font-semibold text-sm flex items-center gap-1 group">
            <span class="group-hover:-translate-x-0.5 transition-transform">←</span> Back to Videos
          </RouterLink>

          <button
            @click="goToSongDetails(videoData.id)"
            class="text-gray-500 hover:text-green-500 dark:hover:text-emerald-400 transition font-semibold text-sm flex items-center gap-1 group"
          >
            <span class="group-hover:translate-x-0.5 transition-transform">See Music Details </span>
          </button>
        </div>

        <!-- Youtube Video Player Section -->
        <div class="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video border border-white/10 relative group">
          <iframe 
            class="w-full h-full"
            :src="videoData.videoSrc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <!-- Video Information Meta-Data Card -->
        <div class="mt-8 flex flex-col gap-2">
          <h1 class="text-2xl md:text-3xl font-extrabold tracking-tight">{{ videoData.title }}</h1>
          <p class="text-lg text-green-600 dark:text-emerald-400 font-semibold mb-4">{{ videoData.artist }}</p>
          
          <div class="border-t border-black/10 dark:border-white/10 pt-4">
            <h3 class="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">About this video</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              {{ videoData.description }}
            </p>
          </div>
        </div>

      </div>

      <!-- RIGHT PANEL: Interactive Sidebar Video Catalog (Takes up 1/3 of the screen width) -->
      <div class="lg:col-span-1 bg-white/30 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 p-6 rounded-3xl shadow-2xl h-fit">
        <h2 class="text-lg font-bold mb-4 border-b pb-2 border-black/10 dark:border-white/10">Video Catalog</h2>
        
        <div class="flex flex-col gap-3">
          <!-- Loop through all available music videos -->
          <div 
            v-for="video in videosList" 
            :key="video.id"
            @click="router.push('/video/' + video.id)"
            class="flex flex-col p-4 rounded-2xl border transition duration-300 cursor-pointer"
            :class="video.id === videoData.id 
              ? 'bg-green-500/10 border-green-500/40 shadow-lg shadow-green-500/5' 
              : 'bg-white/10 dark:bg-transparent border-transparent hover:border-black/10 dark:hover:border-white/10 hover:bg-white/40 dark:hover:bg-white/5'"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 
                  class="font-bold text-sm transition-colors duration-200"
                  :class="video.id === videoData.id ? 'text-green-600 dark:text-emerald-400' : ''"
                >
                  {{ video.title }}
                </h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ video.artist }}</p>
              </div>
              <span 
                v-if="video.id === videoData.id" 
                class="bg-green-500/20 text-green-600 dark:bg-emerald-400/20 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse"
              >
                Now Watching
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>