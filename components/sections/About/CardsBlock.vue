<template>
    <div v-if="cardBlockData.length" class="px-[12px] md:px-[36px] xl:px-0 mt-[70px] lg:mt-[150px]">
        <div v-for="(item, index) in cardBlockData" :key="item.id">
            <div class="text-center mb-[40px] lg:mb-[90px]">
                <h2
                    class="font-bold font-chivo mx-auto text-[35px] leading-[44px] md:text-[46px] md:leading-[52px] lg:text-heading-1 text-gray-900 mb-5 md:mb-[30px] w-full">
                    {{ item.title }}</h2>
                <p class="text-quote md:text-lead-lg text-gray-600 mx-auto md:max-w-[50ch]">
                    {{ item.content }}
                </p>
            </div>

            <div v-if="item.ItemRepeater && item.ItemRepeater.length">
                <div class="lg:flex lg:items-center gap-[30px]">
                    <div v-for="(item2, index) in item.ItemRepeater" :key="item2.id"
                        class="flex items-start gap-5 transition-all duration-300 hover:translate-y-[-3px] border-b border-gray-200 pb-[50px]">
                        <img class="h-full w-full object-cover max-w-[64px]" :src="`${strapiBaseUrl}${item2.icon?.url}`"
                            alt="icon" />
                        <div>
                            <h3 class="font-bold font-chivo text-[20px] leading-[26px] md:text-heading-4 mb-[14px]">{{
                                index + 1 }}.
                                {{ item2.title }}</h3>
                            <p class="text-excerpt">{{ item2.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import qs from "qs";

const cardBlockData = ref([]);
const strapiBaseUrl = useNuxtApp().$strapiBaseUrl;
const route = useRoute();


// Fetch data from Strapi based on the page slug
const slug = route.params.slug;
const queryParams = qs.stringify({
    filters: {
        PageURL: { $eq: slug }
    },
    populate: ["Blocks.ItemRepeater.icon"]
});
const { data, error } = await useFetch(`${strapiBaseUrl}/api/sitemaps?${queryParams}`);

if (data.value) {
    const blocks = data.value.data[0]?.Blocks || [];
    cardBlockData.value = blocks.filter(block => block.__component === "page-blocks.cards-block");
} else if (error.value) {
    console.error("Error fetching card block data:", error.value);
}

</script>
