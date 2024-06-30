<template>
  <div class="tw-mx-6">
    <ais-instant-search index-name="Product" :search-client="searchClient">
      <ais-search-box placeholder="نام آگهی را جست و جو کنید">
        <template #submit-icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            width="16"
            height="16"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.67"
              transform="translate(1 1)"
            >
              <circle cx="7.11" cy="7.11" r="7.11" />
              <path d="M16 16l-3.87-3.87" />
            </g>
          </svg>
        </template>
      </ais-search-box>
      <div class="tw-flex tw-flex-row tw-gap-5">
        <div class="tw-basis-1/4 tw-shadow-lg tw-rounded-lg tw-p-5">
          <ais-hierarchical-menu
            :attributes="[
              'categories.lvl0',
              'categories.lvl1',
              'categories.lvl2',
              'categories.lvl3',
            ]"
          />
          <ais-refinement-list
            attribute="brand"
            searchable
            searchable-placeholder="Search for brands…"
          />

        </div>
        <div class="tw-basis-3/4">
          <ais-hits>
            <template v-slot="{ items }">
              <div class="tw-grid tw-grid-cols-4 tw-gap-4 tw-mt-5">
                <q-card
                  v-for="(item, index) in items"
                  :key="index"
                  class="my-card"
                >
                  <q-img :src="'http://localhost:3001/storage/' + item.image">
                    <div class="absolute-bottom text-h6">
                      {{ item.name }}
                    </div>
                  </q-img>
                  <q-card-actions>
                    <q-btn color="warning" class="tw-m-3">ویرایش</q-btn>
                    <q-btn color="red" @click="deleteProduct(item.id)">حذف</q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </template>
          </ais-hits>
        </div>
      </div>
    </ais-instant-search>
  </div>
</template>

<script setup>
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import '../../css/price-slider.scss';
import '../../css/typesense.scss';
import { watch, ref } from 'vue';
import { deleteProduct } from 'src/composables/product/Product.api';
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'ZPKzDdH53v0dWMC5p5k5ypqhv4Y3pQSPi1prLBt5cyEuNuKT',
    nodes: [
      {
        host: 'localhost',
        port: '8108',
        protocol: 'http',
      },
    ],
  },
  additionalSearchParameters: {
    query_by: 'name',
    filter_by: 'user:==superadmin'
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
const rangeValue = ref([20, 0]);
const test = ref([20, 0]);
const toValue = (value, range) => {
  test.value = [
    typeof value.min === 'number' ? Math.max(value.min, 20) : Math.max(range.min, 20),
    typeof value.max === 'number' ? value.max : range.max,
  ];
};

</script>
