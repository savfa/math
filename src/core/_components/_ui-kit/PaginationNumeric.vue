<script setup lang="ts">
import { useWindowSize } from "../../../helpers/hooks/useWindowSize.ts";
import { computed } from "vue";

const props = defineProps<{
  links: any;
  handlePage: any;
  perPage: number;
}>();

const { width: currentWindowWidth }: { width: any } = useWindowSize();

const isDesktop = computed(() => currentWindowWidth.value >= 1024);

const defaultPaginationCount = computed(() => {
  return isDesktop.value ? 11 : 7; // isDesktop
});

const pagesCount = computed(() =>
  Math.ceil((props.links.objectsCount || 0) / props.perPage)
);

const defaultNums = computed(() =>
  Array.from({ length: pagesCount.value }).map((_it, i: number) => i + 1)
);

const paginationNumbers = computed(() => {
  // возвращает максимум 11/7 элементов, если больше, то замена на ...

  if (defaultNums.value.length > defaultPaginationCount.value) {
    // если в интервале, то соответствующий спред не нужен
    const isInLeftInterval =
      props.links.currentPage >= 1 &&
      (isDesktop.value
        ? props.links.currentPage + 2 <= 8
        : props.links.currentPage + 1 <= 5);
    const isInRightInterval =
      props.links.currentPage >= pagesCount.value - (isDesktop.value ? 5 : 3) &&
      props.links.currentPage <= pagesCount.value;
    const leftSpreadIndex = isDesktop.value ? 2 : 1; // если текущая страница входит в левый интервал (1-9/5)
    const rightSpreadIndex =
      defaultPaginationCount.value - (isDesktop.value ? 3 : 2); // если текущая страница входит в правый интервал (pagesCount - 9/5 - pagesCount)
    const currentPageIndex = defaultNums.value.findIndex(
      (it) => it === props.links.currentPage
    );

    const spreadCount =
      (isInLeftInterval ? 0 : 1) + (isInRightInterval ? 0 : 1);

    // если текущая страница не входит в оба интервала от левой границы и правой границы - то 2 спреда
    return spreadCount === 1
      ? [
          ...defaultNums.value.slice(
            0,
            isInLeftInterval ? rightSpreadIndex : leftSpreadIndex
          ),
          `...`,
          ...defaultNums.value.slice(
            // eslint-disable-next-line no-nested-ternary
            isInLeftInterval
              ? isDesktop.value
                ? -2
                : -1
              : isDesktop.value
                ? -8
                : -5
          ),
        ]
      : [
          ...defaultNums.value.slice(0, leftSpreadIndex),
          `...`,
          ...defaultNums.value.slice(
            defaultNums.value.findIndex(
              (it) =>
                it ===
                defaultNums.value[currentPageIndex - (isDesktop.value ? 2 : 1)]
            ),
            defaultNums.value.findIndex(
              (it) =>
                it ===
                defaultNums.value[currentPageIndex + (isDesktop.value ? 3 : 2)]
            )
          ),
          `...`,
          ...defaultNums.value.slice(isDesktop.value ? -2 : -1),
        ];
  }

  return defaultNums.value;
});

const isHidePagination = computed(() => pagesCount.value < 2);
</script>

<template>
  <div class="pagination" v-if="!isHidePagination">
    <div class="pagination__numbers">
      <div
        class="pagination__number"
        :class="{
          active: links.currentPage === num,
          spread: Number.isNaN(+num),
        }"
        v-for="num in paginationNumbers"
        :key="num"
        @click="
          () =>
            !Number.isNaN(+num) && links.currentPage !== num
              ? handlePage(num)
              : null
        "
      >
        {{ num }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../../common/styles/dependencies";

.pagination {
  $root: &;

  padding: 1rem 0;

  &__numbers {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }

  &__number {
    min-width: 32px;
    min-height: 32px;
    border: 1px solid black;
    border-radius: 4px;
    margin-right: 4px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 12px;
    cursor: pointer;

    &:hover {
      background-color: $color-velvet-tertiary !important;
      border-color: $color-velvet-tertiary !important;
      color: $color-white;
    }

    &.active {
      color: $color-white !important;
      background-color: $color-velvet-primary;
      border-color: $color-velvet-tertiary;
      cursor: default;

      &:hover {
        background-color: $color-velvet-primary !important;
      }
    }

    &.spread {
      cursor: default;

      &:hover {
        border-color: black !important;
        background-color: inherit !important;
        color: inherit !important;
      }
    }
  }
}
</style>
