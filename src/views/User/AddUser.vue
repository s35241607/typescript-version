<script lang="ts" setup>
import userService from '@/api/services/userService'
import type { CreateUserRequest } from '@/api/services/userType'
import { useSnackbarStore } from '@/stores/useSnackbarStore'
import { useUserStore } from '@/stores/useUserStore'

const dialog = ref(false)
const loading = ref<boolean>(false)
const snackbarStore = useSnackbarStore()
const userStore = useUserStore()

const form = ref<CreateUserRequest>({
  username: '',
  email: '',
  password: '',
})

const createUser = async () => {
  try {
    loading.value = true
    await userService.createUser(form.value)
    snackbarStore.show('User created successfully!', 'success')
    await userStore.fetch()
    dialog.value = false
  }
  catch (err: any) {
    console.error(err)
    snackbarStore.show(err?.response?.data?.message || err.message)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <VDialog
    v-model="dialog"
    max-width="600px"
    persistent
  >
    <template
      #activator="
        {
          props:
            activatorProps,
        }"
    >
      <VBtn v-bind="activatorProps">
        Create User
      </VBtn>
    </template>
    <VCard>
      <VCardItem>
        <VCardTitle>Create User</VCardTitle>
      </VCardItem>
      <VCardText>
        <VForm>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                label="Username"
                placeholder="Enter username"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                placeholder="Enter email"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="Enter password"
                type="password"
              />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
      <VDivider />
      <VCardActions class="pa-2">
        <VBtn
          color="error"
          @click="dialog = false"
        >
          Cancel
        </VBtn>
        <VBtn
          color="primary"
          variant="elevated"
          @click="createUser"
        >
          Create
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
