<script setup lang="ts">
import Page from "../../../_components/Page/Page.vue";
import {ref} from "vue";

const myTable = ref(null);
let currentRowIndex = ref(-1);
let currentCellIndex = ref(-1);

const handleMouseOver = (rowIndex, cellIndex) => {
  currentRowIndex.value = rowIndex;
  currentCellIndex.value = cellIndex;
  const rows = myTable.value.rows;

  for (let i = 0; i < 1; i++) { // for (let i = 0; i < rowIndex; i++) {
    rows[i].cells[cellIndex].classList.add('highlight');
  }

  for (let j = 0; j <= 0; j++) { // for (let j = 0; j <= cellIndex; j++) {
    rows[rowIndex].cells[j].classList.add('highlight');
  }
};

const handleMouseLeave = () => {
  const rows = myTable.value.rows;

  for (let i = 0; i < currentRowIndex.value; i++) {
    rows[i].cells[currentCellIndex.value].classList.remove('highlight');
  }

  for (let j = 0; j <= currentCellIndex.value; j++) {
    rows[currentRowIndex.value].cells[j].classList.remove('highlight');
  }

  currentRowIndex.value = -1;
  currentCellIndex.value = -1;
};
</script>

<template>
  <Page>
    <p class="text-info">
      Старейшая известная таблица умножения обнаружена в Древнем Вавилоне и
      имеет возраст примерно 4000 лет. Она основана на шестидесятеричной системе
      счисления.
    </p>
    <p class="text-info">
      Старейшая десятеричная таблица умножения найдена в Древнем Китае и
      датируется 305 годом до н. э. Это так называемые бамбуковые дощечки
      Сражающихся царств, приобретённые в июле 2008 года на сянганском рынке
      культурных реликвий и хранящиеся в университете Цинхуа; всего — 2388
      дощечек, самая длинная из которых — 46 см, а самая короткая — 10 см.
    </p>
    <p class="text-info">
      Иногда изобретение таблицы умножения приписывают Пифагору, в честь
      которого она названа в различных языках, включая испанский, итальянский,
      русский и французский.
    </p>

    <div class="multiply">
      <p>Таблица Пифагора</p>
      <table ref="myTable">
        <thead>
          <tr>
            <th>*</th>
            <th v-for="n in 10" :key="`row-${n}`">{{ n }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 10" :key="`col-${i}`">
            <th>{{ i }}</th>
            <td v-for="j in 10" :key="i * j" @mouseover="handleMouseOver(i, j)" @mouseleave="handleMouseLeave">{{ i * j }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Page>
</template>

<style scoped lang="scss">
@import "../../../../common/styles/dependencies";

.text-info {
  font-size: 18px;
  font-weight: bold;
}

.multiply {
  max-width: 600px;
  max-height: 600px;

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  th,
  td {
    @include media-breakpoint-down(sm) {
      padding: 0;
    }

    border: 1px solid #ddd;
    text-align: center;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
    font-weight: normal;
    color: #666;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  th:first-child,
  td:first-child {
    text-align: center;
    padding-right: 12px;
  }
  th {
    font-weight: bold;
    color: #333;
  }
  td:hover {
    background-color: yellow;
  }
  .highlight {
    background-color: yellow;
  }
}
</style>
