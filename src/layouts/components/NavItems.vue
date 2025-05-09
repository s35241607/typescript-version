<script lang="ts" setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavGroup
    :item="{
      title: 'Dashboards',
      badgeContent: '5',
      badgeClass: 'bg-error',
      icon: 'ri-home-smile-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Analytics',
        to: '/dashboard',
      }"
    />
  </VerticalNavGroup>

  <!-- 👉 Front Pages -->
  <VerticalNavGroup
    :item="{
      title: 'External',
      icon: 'ri-file-copy-line',
      badgeContent: 'Pro',
      badgeClass: 'bg-light-primary text-primary',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Github',
        href: 'https://github.com/s35241607/typescript-version',
        target: '_blank',
      }"
    />
  </VerticalNavGroup>

  <!-- 👉 Apps & Pages -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Apps & Pages',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Users',
      icon: 'ri-user-line',
      to: '/users',
    }"
  />

  <!-- New NavLink for Price Review Dashboard -->
  <VerticalNavLink
    :item="{
      title: 'Price Review',
      icon: 'ri-file-list-2-line', // Example icon
      to: '/price-review-dashboard', // Matches the route path
    }"
  />
  <!-- End of New NavLink -->

  <VerticalNavGroup
    :item="{
      title: 'Test Pages',
      icon: 'ri-test-tube-line',
      badgeContent: 'Test',
      badgeClass: 'bg-light-primary text-primary',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Test',
        to: '/test',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'PriceTable',
        to: '/test/price-table',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'RFQ Template Download',
        to: '/test/rfq-download', // Match the route path
        icon: 'ri-download-cloud-2-line', // Added an icon
      }"
    />
  </VerticalNavGroup>

  <VerticalNavLink
    :item="{
      title: 'Account Settings',
      icon: 'ri-user-settings-line',
      to: '/account-settings',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Login',
      icon: 'ri-login-box-line',
      to: '/login',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Register',
      icon: 'ri-user-add-line',
      to: '/register',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Error',
      icon: 'ri-information-line',
      to: '/no-existence',
    }"
  />

  <!-- 👉 User Interface -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'User Interface',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Typography',
      icon: 'ri-text',
      to: '/typography',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Icons',
      icon: 'ri-remixicon-line',
      to: '/icons',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Cards',
      icon: 'ri-bar-chart-box-line',
      to: '/cards',
    }"
  />

  <!-- 👉 Forms & Tables -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Forms & Tables',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Layouts',
      icon: 'ri-layout-4-line',
      to: '/form-layouts',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Tables',
      icon: 'ri-table-alt-line',
      to: '/tables',
    }"
  />

  <!-- 👉 Others -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Others',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Documentation',
      icon: 'ri-article-line',
      href: 'https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/documentation/',
      target: '_blank',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Raise Support',
      href: 'https://github.com/themeselection/materio-vuetify-vuejs-admin-template-free/issues',
      icon: 'ri-lifebuoy-line',
      target: '_blank',
    }"
  />
</template>

<style lang="scss" scoped>
.layout-vertical-nav {
  .nav-item-title,
  .nav-section-title .title-text {
    transition: opacity 0.2s;
  }
  // 收合時隱藏標題
  .layout-vertical-nav-collapsed & {
    .nav-item-title,
    .nav-section-title .title-text {
      opacity: 0;
      width: 0;
      min-width: 0;
      max-width: 0;
      padding: 0;
      margin: 0;
      overflow: hidden;
      display: inline-block;
    }
    &.hovered {
      .nav-item-title,
      .nav-section-title .title-text {
        opacity: 1 !important;
        width: initial !important;
        min-width: initial !important;
        max-width: initial !important;
        padding: initial !important;
        margin: initial !important;
        overflow: initial !important;
        display: inline-block !important;
      }
    }
  }
}
</style>
