<template>
    <ul class="navbar flex flex-col justify-center font-chivo gap-[34px] lg:flex-row">
        <!-- Render navigation items dynamically -->
        <li v-for="(item, index) in navigationItems" :key="item.id" class="flex items-center group">
            <!-- Internal Links -->
            <NuxtLink v-if="item.type === 'INTERNAL'" :to="`/${item.path}`"
                class="hover:text-green-900 text-base font-inter menu-link lg:text-heading-6 mr-[7px]"
                active-class="text-green-900" exact>
                {{ item.title }}
            </NuxtLink>

            <!-- External Links -->
            <a v-else-if="item.type === 'EXTERNAL'" :href="item.externalPath" target="_blank" rel="noopener noreferrer"
                class="hover:text-green-900 text-base font-inter menu-link lg:text-heading-6 mr-[7px]">
                {{ item.title }}
            </a>
        </li>

        <!-- Fallback message if no items are available -->
        <li v-if="!navigationItems.length && !loading" class="text-gray-500">
            No menu items available
        </li>
    </ul>
</template>



<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const navigationItems = ref([]);
const loading = ref(true);
const strapiBaseUrl = useNuxtApp().$strapiBaseUrl;

// Get current route
const route = useRoute();

// Method to check if the current route matches the item's path
const isActive = (path) => {
    return route.path === `/${path}`;
};

// Fetch navigation items
const { data, error } = await useAsyncData('menuData', () => {
    return $fetch(`${strapiBaseUrl}/api/navigation/render/navigation`);
});

if (data.value && data.value.length > 0) {
    navigationItems.value = data.value.map((item) => ({
        id: item.id,
        title: item.title,
        type: item.type,
        path: item.path,
        externalPath: item.externalPath || null,
    }));
} else {
    console.warn('No navigation data found.');
}

loading.value = false;
</script>
