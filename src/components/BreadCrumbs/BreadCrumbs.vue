<template>
  <nav class="breadcrumbs">
    <ul>
      <li v-for="crumb in $store.state.breadCrumbs" :key="crumb.short_name">
        {{ crumb.short_name }}
      </li>
    </ul>
  </nav>
</template>

<script></script>

<style>
.breadcrumbs {
  display: block;
  margin-bottom: 1.5%;
}

.breadcrumbs ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumbs li {
  display: inline-block;
  font-size: 12px;
}

.breadcrumbs li:not(:last-child):after {
  content: "/";
  margin: 0 8px;
}

.breadcrumbs a {
  text-decoration: none;
  color: #007bff;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}
</style>
