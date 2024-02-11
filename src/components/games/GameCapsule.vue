<template>
  <div class="cursor-pointer w-full">
    <div v-if="props.type === 'large'" style="background-color: #2b004c" class="border-round m-1">
      <div class="border-round-top image h-8rem" :style="imageClass" />
      <div class="h-7rem flex flex-column justify-content-between pb-2">
        <p class="m-0 font-bold mx-2">{{ props.game.name }}</p>
        <div class="flex w-full justify-content-between">
          <div class="flex flex-column bg-gray-900 pl-2 pr-3 border-round-right-3xl">
            <div class="text-xs text-gray-300 line-through">
              ${{ formatePrice(props.game.original_price) }} {{ props.game.currency }}
            </div>
            <div class="text-xl text-green-500 font-bold">
              ${{ formatePrice(props.game.final_price) }} {{ props.game.currency }}
            </div>
          </div>
          <div
            class="px-2 py-1 font-italic font-bold text-3xl bg-green-700 text-yellow flex align-items-center border-round-left-3xl"
          >
            -{{ props.game.discount_percent }}%
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="props.type === 'long'"
      style="background-color: #2b004c; max-width: 40rem"
      class="border-round m-1 flex"
    >
      <div class="w-13rem h-6rem border-round-left" :style="imageClassLong" />
      <div class="flex p-1 align-items-center align-content-between w-full justify-content-between">
        <div class="">
          <p class="m-0 font-bold">{{ props.game.name }}</p>
          <div class="flex justify-content-start gap-1">
            <font-awesome-icon v-if="props.game.windows_available" :icon="['fab', 'windows']" />
            <font-awesome-icon v-if="props.game.mac_available" :icon="['fab', 'mac']" />
            <font-awesome-icon v-if="props.game.linux_available" :icon="['fab', 'linux']" />
          </div>
        </div>
        <div class="mr-2">
          <div
            v-if="props.game.discount_percent > 0"
            class="flex gap-2 justify-content-end align-items-center"
          >
            <div
              class="px-2 font-italic font-bold text-xl bg-green-700 text-yellow flex align-items-center"
            >
              -{{ props.game.discount_percent }}%
            </div>
            <div class="flex flex-column">
              <span class="text-xs text-gray-300 line-through">
                ${{ formatePrice(props.game.original_price) }} {{ props.game.currency }}
              </span>
              <div class="text-green-500 font-bold">
                ${{ formatePrice(props.game.final_price) }} {{ props.game.currency }}
              </div>
            </div>
          </div>
          <div
            v-else-if="props.game.final_price === props.game.original_price"
            class="flex justify-content-end"
          >
            <div class="text-white">
              ${{ formatePrice(props.game.original_price) }} {{ props.game.currency }}
            </div>
          </div>
          <div v-else-if="props.game.final_price === 0" class="flex justify-content-end">
            <div class="text-white">Fere to play</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// interfaces
import type { Game } from '@/models/steam'
import type { PropType } from 'vue'

type TypeProp = 'large' | 'long'

const props = defineProps({
  game: {
    required: true,
    type: Object as PropType<Game>
  },
  width: {
    required: false,
    type: String
  },
  type: {
    required: false,
    type: String as PropType<TypeProp>,
    default: 'large',
    validator: (value: TypeProp) => ['large', 'long'].includes(value)
  }
})

const imageClass = ref<string>(
  `
  background: linear-gradient(180deg, rgba(9, 9, 121, 0) 90%, rgba(43, 0, 76, 1) 100%),url('${props.game.header_image}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  `
)

const imageClassLong = ref<string>(
  `
  background: linear-gradient(90deg, rgba(9, 9, 121, 0) 70%, rgba(43, 0, 76, 1) 100%),url('${props.game.large_capsule_image}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  `
)

function formatePrice(price?: number): string {
  if (!price!!) return '?'
  return (price / 100).toFixed(2)
}
</script>

<style scoped></style>
