
<template>
  <div class="card overflow-x-auto">
      <OrganizationChart :value="data">
          <template #default="slotProps">
              <span>{{ slotProps.node.label }}</span>
          </template>
      </OrganizationChart>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import OrganizationChart from 'primevue/organizationchart';


const data = ref({
    key: '0',
    type: 'person',
    data: {
        image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
        name: 'Amy Elsner',
        title: 'CEO'
    },
    children: [
        {
            key: '0_0',
            type: 'person',
            data: {
                image: 'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
                name: 'Anna Fali',
                title: 'CMO'
            },
            children: [
                {
                    key: '0_0_0',
                    label: 'Sales'
                },
                {
                    key: '0_0_"1',
                    label: 'Marketing'
                }
            ]
        },
        {
            key: '0_1',
            type: 'person',
            data: {
                image: 'https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png',
                name: 'Stephen Shaw',
                title: 'CTO'
            },
            children: [
                {
                    key: '0_1_0',
                    label: 'Development'
                },
                {
                    key: '0_1_1',
                    label: 'UI/UX Design'
                }
            ]
        }
    ]
});

</script>
