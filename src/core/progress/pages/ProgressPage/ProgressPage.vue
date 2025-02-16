<script setup lang="ts">
import Page from "../../../_components/_ui-kit/Page/Page.vue";
import { computed, inject, onMounted } from "vue";
import { getMathTypeFormat } from "../../../../helpers/utils/utils.ts";
import {
  months,
  monthsDeclensions,
} from "../../../../helpers/consts/consts.ts";
import AppButton from "../../../_components/_ui-kit/AppButton/AppButton.vue";
import {
  LOGS_PER_PAGE,
  LogsOperation,
} from "../../../../helpers/operations/logsOperation.ts";
import PaginationNumeric from "../../../_components/_ui-kit/PaginationNumeric.vue";

const progressLogs = inject<any>("progressLogs");

const handleFilterLogs = (page: number) => {
  LogsOperation.filterLogs({ page }).then(
    ({ logs, links }) =>
      (progressLogs.value = {
        ...progressLogs.value,
        logs,
        links,
      })
  );
};

onMounted(() => {
  handleFilterLogs(1);
});

const hashLogs = computed(() =>
  progressLogs.value.logs.reduce((res: any, log: any) => {
    const date = new Date(log.createdAt);
    // получаем год
    const year = date.getFullYear();
    // Получаем номер месяца (от 0 до 11)
    const month = date.getMonth();

    res[year] = {
      ...res[year],
      [month]: [...(res[year]?.[month] || []), log],
    };

    return res;
  }, {})
);

</script>

<template>
  <Page class="progress-page">
    <div class="year" v-for="year in Object.keys(hashLogs).sort((a, b) => b - a)" :key="year">
      <template v-if="+year < new Date().getFullYear()">
        <AppButton isButtonTag :style="{ margin: '1rem auto' }">
          {{ year }} год
        </AppButton>
      </template>

      <div
        class="month"
        v-for="month in Object.keys(hashLogs[year]).sort((a: string, b: string) => +b - +a)"
        :key="`${year} - ${month}`"
      >
        <div>
          <AppButton isButtonTag :style="{ margin: '1rem auto' }">
            {{ months[month as any] }}
          </AppButton>

          <table class="log-table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Имя</th>
                <th>Тест</th>
                <th>Время</th>
                <th>Ошибки</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="log in hashLogs[year][month]"
                :key="log.id"
                class="log-item"
              >
                <td>
                  {{ new Date(log[`createdAt`]).getDate() }}
                  {{ monthsDeclensions[month as any] }}
                </td>
                <td>{{ log.name }}</td>
                <td>{{ getMathTypeFormat(log[`mathType`]) }}</td>
                <td>{{ log[`timeString`] }}</td>
                <td>{{ log[`incorrectAnswersCount`] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <PaginationNumeric
        :links="progressLogs.links"
        :handlePage="handleFilterLogs"
        :perPage="LOGS_PER_PAGE"
    />
  </Page>
</template>

<style scoped lang="scss">
.progress-page {
  $root: &;

  .year {
    margin-bottom: 10px;
  }

  .month {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .log-table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      font-weight: normal;
      font-size: 14px;
    }

    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #ddd;
    }
  }
}
</style>
