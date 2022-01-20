<template>
  <!-- navbar -->
  <nav class="bg-gray-100">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between px-4">
        <div class="flex space-x-5">
          <!-- primary nav -->
          <div class="hidden md:flex items-center space-x-1">
            <h1 class="uppercase">Ticket Management System</h1>
          </div>
        </div>

        <!-- secondary nav -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link to="/" class="py-5 px-3 text-gray-700 hover:text-gray-900">
            Report
          </router-link>
          <router-link to="/ticket" class="py-5 px-3 text-gray-700 hover:text-gray-900">
            Ticket
          </router-link>
        </div>

        <!-- mobile button -->
        <div class="md:hidden flex items-center">
          <button @click="isHidden = !isHidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- mobile menu -->
    <transition name="list">
      <div v-show="!isHidden" class="md:hidden pb-3">
          <router-link to="/" class="block py-2 px-4 text-sm hover:bg-gray-200">Report</router-link>
          <router-link to="/ticket" class="block py-2 px-4 text-sm hover:bg-gray-200">Ticket</router-link>
      </div>
    </transition>
  </nav>
  
  <div class="flex flex-col h-screen justify-between">
    <!-- content -->
    <div class="flex-glow">
      <router-view v-slot="{ Component }">
          <transition name="route" mode="out-in">
              <component :is="Component" />
          </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const isHidden = ref(true);
    return { isHidden };
  },
};
</script>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active {
  transition: all 0.3s ease-in;
}

.list-enter-from, .list-leave-to {
  transform: translateX(-100px);
}
.list-enter-to, .list-leave-from {
  transform: translateX(0)
}
.list-enter-active, .list-leave-active {
  transition: all 0.4s ease;
}

</style>
