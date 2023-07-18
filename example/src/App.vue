<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import RecordId from '@/components/RecordId.vue'
import { ref } from 'vue'
import { Tag, tiki, Usecase } from '@mytiki/tiki-sdk-capacitor'
import { v4 as uuidv4 } from 'uuid'

const address = ref('pending')
const titleId = ref('pending')
const licenseId = ref('pending')
const payableId = ref('pending')
const receiptId = ref('pending')

tiki.initialize(uuidv4(), 'be19730a-00d5-45f5-b18e-2e19eb25f311').then(async (initRsp) => {
  address.value = initRsp.address
  const titleRsp = await tiki.createTitle(uuidv4(), [Tag.custom('test')])
  titleId.value = titleRsp.id
  const licenseRsp = await tiki.createLicense(
    titleRsp.id,
    [
      {
        usecases: [Usecase.custom('test')]
      }
    ],
    'No terms. Example.'
  )
  licenseId.value = licenseRsp.id
  const payableRsp = await tiki.createPayable(licenseRsp.id, '1', 'test')
  payableId.value = payableRsp.id
  const receiptRsp = await tiki.createReceipt(payableRsp.id, '1')
  receiptId.value = receiptRsp.id
})
</script>

<template>
  <div>
    <h1>TIKI SDK</h1>
    <p>initializing... {{ address }}</p>
    <record-id class="record" name="Title" :id="titleId" />
    <record-id class="record" name="License" :id="licenseId" />
    <record-id class="record" name="Payable" :id="payableId" />
    <record-id class="record" name="Receipt" :id="receiptId" />
  </div>
</template>

<style scoped>
.record {
  padding: 0.5em 0;
}
</style>
