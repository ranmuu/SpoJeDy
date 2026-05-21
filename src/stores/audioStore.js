import { defineStore } from 'pinia'

// Declare the native Audio instance as a singleton outside the reactive store.
// This prevents Vue from proxy-wrapping the HTML5 audio engine and ensures smooth streaming.
let nativeAudio = null

export const useAudioStore = defineStore('audio', {
  state: () => ({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: Number(localStorage.getItem('spoJedy_volume')) || 0.5,
    currentSong: null,
    
    // Unified database for all songs to prevent mismatched properties
    songsList: [
      { 
        id: '1', 
        title: "About You", 
        artist: "The 1975", 
        cover: "https://ik.imagekit.io/ranmu/about%20you%20cover.png", 
        audioSrc: "https://ik.imagekit.io/ranmu/The%201975%20-%20About%20You%20(Official)%20(1).mp3" 
      },
      { 
        id: '2', 
        title: "You're All I Want", 
        artist: "Cigarettes After Sex", 
        cover: "https://ik.imagekit.io/ranmu/youre%20all%20i%20want.jpg", 
        audioSrc: "https://ik.imagekit.io/ranmu/You're%20All%20I%20Want%20-%20Cigarettes%20After%20Sex.mp3" 
      },
      { 
        id: '3', 
        title: "Confident", 
        artist: "Justin Bieber", 
        cover: "https://ik.imagekit.io/ranmu/confident.jpg", 
        audioSrc: "https://ik.imagekit.io/ranmu/Justin%20Bieber%20Confident.mp3" 
      },
      { 
        id: '4', 
        title: "My Jealousy", 
        artist: "vivi baby, ovg!", 
        cover: "https://ik.imagekit.io/ranmu/my%20jealousy.jpg", 
        audioSrc: "https://ik.imagekit.io/ranmu/vivi%20baby%20&%20ovg!%20-%20MY%20JEALOUSY%20(Official%20MV).mp3" 
      },
      { 
        id: '5', 
        title: "Can I Call You Tonight?", 
        artist: "Dayglow", 
        cover: "https://ik.imagekit.io/ranmu/CICYT.jpg", 
        audioSrc: "https://ik.imagekit.io/ranmu/Can%20I%20Call%20You%20Tonight_.mp3" 
      },
      {
        id: '6',
        title: "BIRDS OF A FEATHER",
        artist: "Billie Eilish",
        cover: "https://ik.imagekit.io/ranmu/birdsofafeather.jpg",
        audioSrc: "https://ik.imagekit.io/ranmu/Billie%20Eilish%20-%20BIRDS%20OF%20A%20FEATHER%20(Official%20Lyric%20Video).mp3"
      }
    ]
  }),

  actions: {
    // Initializes or switches the current active track
    loadSong(id, autoplay = false) {
      const found = this.songsList.find(s => s.id === String(id))
      if (!found) return

      // If it's already the loaded song, just keep playing it!
      if (this.currentSong && this.currentSong.id === found.id) {
        if (autoplay && nativeAudio) {
          nativeAudio.play()
            .then(() => { this.isPlaying = true })
            .catch(() => { this.isPlaying = false })
        }
        return
      }

      // If another song was playing, pause it first
      if (nativeAudio) {
        nativeAudio.pause()
      }

      this.currentSong = found
      this.isPlaying = false
      this.currentTime = 0

      // Create a fresh audio controller
      nativeAudio = new Audio(found.audioSrc)
      nativeAudio.volume = this.volume

      // Connect native events directly to Pinia global state
      nativeAudio.ontimeupdate = () => {
        this.currentTime = nativeAudio.currentTime
      }
      nativeAudio.onloadedmetadata = () => {
        this.duration = nativeAudio.duration
      }
      nativeAudio.onended = () => {
        this.changeSong(1) // Auto-advance to next song on finish
      }
      nativeAudio.onerror = () => {
        this.isPlaying = false
        alert("Streaming Error: Failed to play track.")
      }

      if (autoplay) {
        nativeAudio.play()
          .then(() => { this.isPlaying = true })
          .catch(() => { this.isPlaying = false })
      }
    },

    togglePlay() {
      if (!nativeAudio) return

      if (this.isPlaying) {
        nativeAudio.pause()
        this.isPlaying = false
      } else {
        nativeAudio.play()
          .then(() => {
            this.isPlaying = true
          })
          .catch((err) => {
            console.error("Autoplay prevention:", err)
            alert("Browser blocked audio. Click anywhere on the screen first, then press play!")
          })
      }
    },

    seek(time) {
      const targetTime = Number(time)
      this.currentTime = targetTime
      if (nativeAudio) {
        nativeAudio.currentTime = targetTime
      }
    },

    setVolume(val) {
      this.volume = val
      localStorage.setItem('spoJedy_volume', val)
      if (nativeAudio) {
        nativeAudio.volume = val
      }
    },

    changeSong(direction) {
      if (!this.currentSong) return
      
      const currentIndex = this.songsList.findIndex(s => s.id === String(this.currentSong.id))
      let newIndex = currentIndex + direction

      if (newIndex >= this.songsList.length) newIndex = 0
      if (newIndex < 0) newIndex = this.songsList.length - 1

      // Auto-play the next loaded track
      const nextSong = this.songsList[newIndex]
      this.loadSong(nextSong.id)
      
      // Auto-play action
      if (nativeAudio) {
        nativeAudio.play()
          .then(() => { this.isPlaying = true })
          .catch(() => { this.isPlaying = false })
      }
    }
  }
})