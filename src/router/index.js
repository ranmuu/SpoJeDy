import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import SongDetailView from '@/views/SongDetailView.vue'
import VideoDetailView from '@/views/VideoDetailView.vue'
import VideoListView from '@/views/VideoListView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/song/:id',
      name: 'song-detail',
      component: SongDetailView,
    },
    {
      path: '/video/:id',
      name: 'video-detail',
      component: VideoDetailView,
    },
    {
      path: '/videos',
      name: 'video-list',
      component: VideoListView,
    }
  ],
})

export default router
