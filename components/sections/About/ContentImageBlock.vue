<template>
    <div v-if="contentImageData !== null">
        <div v-for="(item, index) in contentImageData" :key="item.id"
            class="px-[12px] md:px-[36px] xl:px-0 mt-[70px] text-center lg:mt-[137px]">
            <!-- Dynamically rendered subtitle from Strapi -->
            <span
                class="font-chivo inline-block bg-bg-2 text-orange-900 py-[14px] px-[28px] rounded-[50px] text-[14px] leading-[14px] mb-[18px]">
                {{ item.subtitle }}
            </span>

            <!-- Dynamically rendered title from Strapi -->
            <div class="text-center mb-[40px] md:mb-[62px]">
                <h2
                    class="font-bold font-chivo mx-auto text-[35px] leading-[44px] md:text-[46px] md:leading-[52px] lg:text-heading-1 text-gray-900 mb-5 md:mb-[30px] max-w-[725px]">
                    {{ item.title }}
                </h2>
            </div>

            <!-- Dynamically rendered image from Strapi -->
            <div class="relative mx-auto max-w-[1190px]">
                <img class="h-full w-full object-cover rounded-2xl" :src="`${strapiBaseUrl}${item.image?.url}`"
                    alt="Agon" />

                <button @click="openVideo"
                    class="rounded-full bg-white grid place-items-center absolute play-video w-[60px] h-[60px] md:w-[138px] md:h-[138px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img src="/assets/images/icons/icon-play.svg" alt="play button" width="26" />
                </button>
            </div>
        </div>

        <!-- Modal Video -->
        <modal-video :channel="videoChannel" :videoId="videoId" v-model:isOpen="videoIsOpen" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import ModalVideo from "../components/elements/ModalVideo.vue";
import qs from "qs";

const contentImageData = ref([]); // Initialize as an empty array
const strapiBaseUrl = useNuxtApp().$strapiBaseUrl;
const route = useRoute();  // Get the current route object

// State for Modal
const videoIsOpen = ref(false);

// Methods
const openVideo = () => {
    videoIsOpen.value = !videoIsOpen.value;
};

// Computed properties for video
const videoChannel = computed(() => "youtube");
const videoId = computed(() => "QiqQoqtnHrk");

// Fetch data from Strapi based on the page slug
const slug = route.params.slug;
const queryParams = qs.stringify({
    filters: { PageURL: { $eq: slug } },
    populate: ['Blocks', 'Blocks.image']
});

const { data, error } = await useFetch(`${strapiBaseUrl}/api/sitemaps?${queryParams}`);

if (data.value) {
    // Filter the hero block data from the response
    const blocks = data.value.data[0]?.Blocks || [];
    // Filter the blocks to include only the content-image blocks
    contentImageData.value = blocks.filter(block => block.__component === 'page-blocks.content-image-block');
} else if (error.value) {
    console.error("Error fetching data:", error.value);
}
</script>
