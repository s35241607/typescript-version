<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'

// Stats for top cards
const stats = ref([
  {
    count: 42,
    label: 'On route vehicles',
    change: 18.2,
    trend: 'up',
    icon: 'ri-truck-line',
    color: 'primary',
  },
  {
    count: 8,
    label: 'Vehicles with errors',
    change: -8.7,
    trend: 'down',
    icon: 'ri-alert-line',
    color: 'warning',
  },
  {
    count: 27,
    label: 'Deviated from route',
    change: 4.3,
    trend: 'up',
    icon: 'ri-route-line',
    color: 'error',
  },
  {
    count: 13,
    label: 'Late vehicles',
    change: -2.5,
    trend: 'down',
    icon: 'ri-time-line',
    color: 'info',
  },
])

// Vehicles overview data
const vehiclesOverview = ref({
  statusBreakdown: [
    { name: 'On the way', value: 39.7, time: '2hr 10min', icon: 'ri-truck-line', color: 'grey-darken-3' },
    { name: 'Unloading', value: 28.3, time: '3hr 15min', icon: 'ri-inbox-unarchive-line', color: 'purple' },
    { name: 'Loading', value: 17.4, time: '1hr 24min', icon: 'ri-inbox-archive-line', color: 'info' },
    { name: 'Waiting', value: 14.6, time: '5hr 19min', icon: 'ri-time-line', color: 'grey' },
  ],
})

// Shipment statistics data
const months = ref(['January', 'February', 'March', 'April', 'May', 'June'])
const selectedMonth = ref('January')

const shipmentData = ref([
  { day: '1 Jan', shipment: 25, delivery: 22 },
  { day: '2 Jan', shipment: 38, delivery: 30 },
  { day: '3 Jan', shipment: 22, delivery: 18 },
  { day: '4 Jan', shipment: 30, delivery: 25 },
  { day: '5 Jan', shipment: 27, delivery: 23 },
  { day: '6 Jan', shipment: 40, delivery: 35 },
  { day: '7 Jan', shipment: 32, delivery: 28 },
  { day: '8 Jan', shipment: 36, delivery: 30 },
  { day: '9 Jan', shipment: 25, delivery: 22 },
  { day: '10 Jan', shipment: 32, delivery: 29 },
])

const totalDeliveries = computed(() => {
  return '23.8k'
})

// Delivery performance metrics
const deliveryMetrics = ref([
  {
    label: 'Packages in transit',
    value: '10k',
    change: 25.8,
    trend: 'up',
    icon: 'ri-box-3-line',
    color: 'purple',
  },
  {
    label: 'Packages out for delivery',
    value: '5k',
    change: 4.3,
    trend: 'up',
    icon: 'ri-truck-line',
    color: 'blue',
  },
  {
    label: 'Packages delivered',
    value: '15k',
    change: -12.5,
    trend: 'down',
    icon: 'ri-check-circle-line',
    color: 'green',
  },
  {
    label: 'Delivery success rate',
    value: '95%',
    change: 35.6,
    trend: 'up',
    icon: 'ri-shield-check-line',
    color: 'amber',
  },
  {
    label: 'Average delivery time',
    value: '2.5 Days',
    change: -2.15,
    trend: 'down',
    icon: 'ri-time-line',
    color: 'grey',
  },
  {
    label: 'Customer satisfaction',
    value: '4.5/5',
    change: 5.7,
    trend: 'up',
    icon: 'ri-user-heart-line',
    color: 'red',
  },
])

// Delivery exceptions data
const exceptionTypes = ref([
  { name: 'Incorrect address', color: '#4CAF50' },
  { name: 'Weather conditions', color: '#8BC34A' },
  { name: 'Federal Holidays', color: '#4CAF50' },
  { name: 'Damage during transit', color: '#8BC34A' },
])

const exceptionsPercentage = ref(30)

// Orders by countries
const orders = ref([
  {
    status: 'New',
    sender: {
      name: 'Myrtle Ullrich',
      address: '101 Boulder, California(CA), 95959',
    },
    receiver: {
      name: 'Barry Schowalter',
      address: '939 Orange, California(CA), 92118',
    },
  },
  {
    status: 'New',
    sender: {
      name: 'Veronica Herman',
      address: '162 Windsor, California(CA), 95492',
    },
    receiver: {
      name: 'Helen Jacobs',
      address: '487 Sunset, California(CA), 94043',
    },
  },
])

// Tabs state for orders
const tab = ref('New')

const theme = useTheme()

theme.global.name.value = 'dark'
</script>

<template>
  <VContainer
    fluid
    class="pa-6"
  >
    <!-- Top stats cards -->
    <VRow>
      <VCol
        v-for="(stat, i) in stats"
        :key="i"
        cols="12"
        sm="6"
        md="3"
      >
        <VCard
          class="pa-4"
          height="100%"
          :style="{ borderBottom: `2px solid rgba(var(--v-theme-${stat.color}), 0.8)` }"
        >
          <div class="d-flex align-center">
            <VAvatar
              :color="stat.color"
              size="44"
              class="mr-3"
              rounded="lg"
              variant="tonal"
            >
              <VIcon
                size="28"
                color="white"
              >
                {{ stat.icon }}
              </VIcon>
            </VAvatar>
            <div class="d-flex flex-column">
              <span class="text-h5">{{ stat.count }}</span>
              <div class="text-caption">
                <span :class="stat.trend === 'up' ? 'text-success' : 'text-error'">
                  {{ stat.trend === 'up' ? '+' : '' }}{{ stat.change }}%
                </span>
                <span class="ml-1">than last week</span>
              </div>
            </div>
          </div>
          <div class="text-subtitle-1 mt-2">
            {{ stat.label }}
          </div>
        </VCard>
      </VCol>
    </VRow>

    <!-- Middle section with vehicles overview and shipment statistics -->
    <VRow class="mt-6">
      <!-- Vehicles overview -->
      <VCol
        cols="12"
        md="7"
      >
        <VCard
          height="360"
          class="card-background"
        >
          <VCardTitle class="d-flex justify-space-between">
            <span>Vehicles Overview</span>
            <VBtn
              icon="ri-more-2-line"
              variant="text"
            />
          </VCardTitle>
          <VCardText>
            <!-- Status Bars -->
            <div class="d-flex justify-space-between my-3">
              <span class="text-caption">On the way</span>
              <span class="text-caption">Unloading</span>
              <span class="text-caption">Loading</span>
              <span class="text-caption">Waiting</span>
            </div>

            <VProgressLinear
              rounded
              height="30"
            >
              <template #default>
                <div
                  class="d-flex"
                  style="width: 100%"
                >
                  <div
                    :style="`width: ${vehiclesOverview.statusBreakdown[0].value}%; background-color: ${vehiclesOverview.statusBreakdown[0].color}`"
                    class="py-1 text-center text-white"
                  >
                    {{ vehiclesOverview.statusBreakdown[0].value }}%
                  </div>
                  <div
                    :style="`width: ${vehiclesOverview.statusBreakdown[1].value}%; background-color: #9c27b0`"
                    class="py-1 text-center text-white"
                  >
                    {{ vehiclesOverview.statusBreakdown[1].value }}%
                  </div>
                  <div
                    :style="`width: ${vehiclesOverview.statusBreakdown[2].value}%; background-color: #03a9f4`"
                    class="py-1 text-center text-white"
                  >
                    {{ vehiclesOverview.statusBreakdown[2].value }}%
                  </div>
                  <div
                    :style="`width: ${vehiclesOverview.statusBreakdown[3].value}%; background-color: #424242`"
                    class="py-1 text-center text-white"
                  >
                    {{ vehiclesOverview.statusBreakdown[3].value }}%
                  </div>
                </div>
              </template>
            </VProgressLinear>

            <!-- Status Details -->
            <VList
              density="compact"
              class="mt-6 bg-transparent"
            >
              <VListItem
                v-for="(status, i) in vehiclesOverview.statusBreakdown"
                :key="i"
              >
                <template #prepend>
                  <VIcon :color="status.color === 'grey-darken-3' ? 'grey' : status.color">
                    {{ status.icon }}
                  </VIcon>
                </template>
                <VListItemTitle>{{ status.name }}</VListItemTitle>
                <template #append>
                  <div class="d-flex">
                    <span class="mr-8">{{ status.time }}</span>
                    <span>{{ status.value }}%</span>
                  </div>
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Shipment statistics -->
      <VCol
        cols="12"
        md="5"
      >
        <VCard
          height="360"
          class="card-background"
        >
          <VCardTitle class="d-flex justify-space-between align-center">
            <div>
              <div class="text-h6">
                Shipment statistics
              </div>
              <div class="text-caption">
                Total number of deliveries {{ totalDeliveries }}
              </div>
            </div>
            <VSelect
              v-model="selectedMonth"
              :items="months"
              variant="outlined"
              density="compact"
              hide-details
              class="month-select"
              style="max-width: 120px;"
            />
          </VCardTitle>
          <VCardText>
            <VChart
              style="width: 100%; height: 250px;"
              :option="{
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  top: '10%',
                  containLabel: true,
                },
                xAxis: {
                  type: 'category',
                  data: shipmentData.map(item => item.day),
                  axisLine: {
                    lineStyle: {
                      color: '#666',
                    },
                  },
                },
                yAxis: {
                  type: 'value',
                  axisLine: {
                    lineStyle: {
                      color: '#666',
                    },
                  },
                  splitLine: {
                    lineStyle: {
                      color: '#333',
                    },
                  },
                },
                series: [
                  {
                    name: 'Shipment',
                    type: 'bar',
                    data: shipmentData.map(item => item.shipment),
                    itemStyle: {
                      color: '#FFB300',
                    },
                  },
                  {
                    name: 'Delivery',
                    type: 'line',
                    data: shipmentData.map(item => item.delivery),
                    symbolSize: 8,
                    lineStyle: {
                      color: '#9c27b0',
                    },
                    itemStyle: {
                      color: '#9c27b0',
                    },
                  },
                ],
                tooltip: {
                  trigger: 'axis',
                },
                legend: {
                  data: ['Shipment', 'Delivery'],
                  bottom: 0,
                  textStyle: {
                    color: '#fff',
                  },
                },
              }"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Bottom section -->
    <VRow class="mt-6">
      <!-- Delivery performance -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          height="400"
          class="card-background"
        >
          <VCardTitle class="d-flex justify-space-between">
            <div>
              <div class="text-h6">
                Delivery performance
              </div>
              <div class="text-caption">
                12% increase in this month
              </div>
            </div>
            <VBtn
              icon="ri-more-2-line"
              variant="text"
            />
          </VCardTitle>
          <VCardText>
            <VList
              density="compact"
              class="bg-transparent"
            >
              <VListItem
                v-for="(metric, i) in deliveryMetrics"
                :key="i"
                class="mb-3"
              >
                <template #prepend>
                  <VAvatar
                    :color="metric.color"
                    size="40"
                    class="mr-3"
                  >
                    <VIcon color="white">
                      {{ metric.icon }}
                    </VIcon>
                  </VAvatar>
                </template>
                <VListItemTitle>{{ metric.label }}</VListItemTitle>
                <template #append>
                  <div class="d-flex flex-column align-end">
                    <span class="text-h6">{{ metric.value }}</span>
                    <div class="d-flex align-center">
                      <VIcon
                        size="small"
                        :color="metric.trend === 'up' ? 'success' : 'error'"
                      >
                        {{ metric.trend === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line' }}
                      </VIcon>
                      <span
                        :class="metric.trend === 'up' ? 'text-success' : 'text-error'"
                        class="text-caption"
                      >
                        {{ Math.abs(metric.change) }}%
                      </span>
                    </div>
                  </div>
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Delivery exceptions -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          height="400"
          class="card-background"
        >
          <VCardTitle class="d-flex justify-space-between">
            <span>Delivery exceptions</span>
            <VBtn
              icon="ri-more-2-line"
              variant="text"
            />
          </VCardTitle>
          <VCardText class="d-flex justify-center align-center flex-column">
            <VProgressCircular
              :rotate="-90"
              :size="200"
              :width="12"
              :model-value="exceptionsPercentage"
              color="#4CAF50"
            >
              <div class="text-center">
                <div class="text-h3">
                  {{ exceptionsPercentage }}%
                </div>
                <div class="text-caption">
                  AVG. Exceptions
                </div>
              </div>
            </VProgressCircular>

            <div class="d-flex flex-wrap justify-center mt-6">
              <div
                v-for="(type, i) in exceptionTypes"
                :key="i"
                class="d-flex align-center mx-2 my-1"
              >
                <VIcon
                  :color="type.color"
                  size="small"
                  class="mr-1"
                >
                  ri-circle-fill
                </VIcon>
                <span class="text-caption">{{ type.name }}</span>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Orders by countries -->
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          height="400"
          class="card-background"
        >
          <VCardTitle class="d-flex justify-space-between">
            <div>
              <div class="text-h6">
                Orders by countries
              </div>
              <div class="text-caption">
                62 deliveries in progress
              </div>
            </div>
            <VBtn
              icon="ri-more-2-line"
              variant="text"
            />
          </VCardTitle>
          <VCardText>
            <VTabs
              v-model="tab"
              color="primary"
              bg-color="transparent"
            >
              <VTab value="New">
                New
              </VTab>
              <VTab value="Preparing">
                Preparing
              </VTab>
              <VTab value="Shipping">
                Shipping
              </VTab>
            </VTabs>

            <VWindow v-model="tab">
              <VWindowItem value="New">
                <div
                  v-for="(order, i) in orders"
                  :key="i"
                  class="my-5"
                >
                  <div class="d-flex align-center mb-2">
                    <VIcon
                      color="success"
                      class="mr-2"
                    >
                      ri-check-circle-line
                    </VIcon>
                    <div class="text-caption text-success">
                      SENDER
                    </div>
                  </div>
                  <div class="ml-8 mb-3">
                    <div class="text-subtitle-1">
                      {{ order.sender.name }}
                    </div>
                    <div class="text-caption">
                      {{ order.sender.address }}
                    </div>
                  </div>

                  <div class="d-flex align-center mb-2">
                    <VIcon
                      color="purple"
                      class="mr-2"
                    >
                      ri-map-pin-line
                    </VIcon>
                    <div class="text-caption text-purple">
                      RECEIVER
                    </div>
                  </div>
                  <div class="ml-8 mb-4">
                    <div class="text-subtitle-1">
                      {{ order.receiver.name }}
                    </div>
                    <div class="text-caption">
                      {{ order.receiver.address }}
                    </div>
                  </div>

                  <VDivider v-if="i < orders.length - 1" />
                </div>
              </VWindowItem>
            </VWindow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
.v-card {
  border-radius: 8px;
  border: none;
}

.card-background {
  /* Example: background-color: rgb(var(--v-theme-surface-variant)); */
  /* If default surface is fine, you might not need this class */
}

.month-select :deep(.v-field__outline) {
  border-color: rgba(255, 255, 255, 0.15) !important;
}

.text-success {
  color: #4CAF50 !important;
}

.text-error {
  color: #F44336 !important;
}

.text-purple {
  color: #9c27b0 !important;
}
</style>
