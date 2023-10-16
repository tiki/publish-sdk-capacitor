<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
import RecordId from '@/components/record-id.vue'
import { ref } from 'vue'
import { instance, Tag, Usecase } from '@mytiki/tiki-sdk-capacitor'
import { v4 as uuidv4 } from 'uuid'

const address = ref('pending')
const titleId = ref('pending')
const licenseId = ref('pending')
const payableId = ref('pending')
const receiptId = ref('pending')

const init = () => {
  instance.initialize(uuidv4(), 'be19730a-00d5-45f5-b18e-2e19eb25f311').then(async (initRsp) => {
    address.value = initRsp.address
    const titleRsp = await instance.createTitle(uuidv4(), [Tag.custom('test')])
    titleId.value = titleRsp.id
    const licenseRsp = await instance.createLicense(
      titleRsp.id,
      [
        {
          usecases: [Usecase.custom('test')]
        }
      ],
      'No terms. Example.'
    )
    licenseId.value = licenseRsp.id
    const payableRsp = await instance.createPayable(licenseRsp.id, '1', 'test')
    payableId.value = payableRsp.id
    const receiptRsp = await instance.createReceipt(payableRsp.id, '1')
    receiptId.value = receiptRsp.id
  })
}
</script>

<template>
  <div class="center">
    <div class="body">
      <h1>TIKI SDK</h1>
      <button @click="init">Initialize</button>
      <record-id :id="address" class="record" name="Address" />
      <record-id :id="titleId" class="record" name="Title" />
      <record-id :id="licenseId" class="record" name="License" />
      <record-id :id="payableId" class="record" name="Payable" />
      <record-id :id="receiptId" class="record" name="Receipt" />
    </div>
  </div>
</template>

<style scoped>
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  margin: 0;
  width: 100%;
}

.body {
  position: relative;
  margin: 0 1em;
}

.record {
  padding: 0.5em 0;
  word-break: break-all;
}
</style>
