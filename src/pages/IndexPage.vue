<template>
  <q-page class="q-pa-lg flex flex-center">
    <q-card flat bordered style="max-width: 560px; width: 100%">
      <q-card-section>
        <div class="text-h6">Basic Form</div>
        <div class="text-subtitle2">6704101328-Tinnapob-Puangmala</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" ref="formRef" class="q-gutter-md">
          <q-input
            v-model="form.firstName"
            label="First name"
            outlined
            dense
            :rules="[v => !!v || 'Required']"
          />
          <q-input
            v-model="form.lastName"
            label="Last name"
            outlined
            dense
            :rules="[v => !!v || 'Required']"
          />
          <q-input
            v-model="form.email"
            type="email"
            label="Email"
            outlined
            dense
            :rules="[v => /.+@.+\..+/.test(v) || 'Invalid email']"
          />
          <q-input
            v-model="form.note"
            type="textarea"
            label="Note"
            outlined
            autogrow
          />

          <div class="row q-gutter-sm">
            <q-btn label="Submit" type="submit" color="primary" unelevated />
            <q-btn label="Reset" type="reset" color="grey-7" flat />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref(null)
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  note: ''
})

function onSubmit () {
  formRef.value.validate().then(valid => {
    if (valid) {
      console.log('Submitted:', form.value)
    }
  })
}

function onReset () {
  form.value = { firstName: '', lastName: '', email: '', note: '' }
}
</script>

