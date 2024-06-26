<script setup lang="ts">
import Page from "../../../_components/Page/Page.vue";
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
      <table>
        <thead>
          <tr>
            <th>*</th>
            <th v-for="n in 10" :key="`row-${n}`">{{ n }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 10" :key="`col-${i}`">
            <th>{{ i }}</th>
            <td v-for="j in 10" :key="i * j">{{ i * j }}</td>
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
    background-color: #ddd;
  }
}
</style>
