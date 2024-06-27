<script setup lang="ts"></script>

<template>
  <footer class="main-footer">
    <div class="main-footer__wrap">
      <div class="main-footer__copyright">
        <p>© savfa {{ new Date().getFullYear() }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.main-footer {
  $root: &;

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
