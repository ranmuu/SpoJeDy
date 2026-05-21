import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: 'Guest',
    profileImage: null, 
    theme: 'light' 
  }),

  actions: {
    // Save everything to Local Storage in one simple step
    saveToLocalStorage() {
      const data = {
        name: this.username,
        image: this.profileImage,
        mode: this.theme
      }
      localStorage.setItem('spoJedy_data', JSON.stringify(data))
    },

    // Load data back when the app starts
    loadFromLocalStorage() {
      const saved = localStorage.getItem('spoJedy_data')
      if (saved) {
        const parsed = JSON.parse(saved)
        this.username = parsed.name
        this.profileImage = parsed.image
        this.theme = parsed.mode
        this.applyTheme() // Make sure the screen color matches the saved mode
      }
    },

    updateUsername(newName) {
      this.username = newName
      this.saveToLocalStorage()
    },

    updateProfileImage(newImage) {
      this.profileImage = newImage
      this.saveToLocalStorage()
    },

    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.applyTheme()
      this.saveToLocalStorage()
    },

    applyTheme() {
      if (this.theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
})