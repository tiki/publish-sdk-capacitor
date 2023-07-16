# @mytiki/tiki-sdk-capacitor

Add TIKI's zero-party data monetization infrastructure to your CapacitorJS app

## Install

```bash
npm install @mytiki/tiki-sdk-capacitor
npx cap sync
```

## API

<docgen-index>

* [`id()`](#id)
* [`address()`](#address)
* [`isInitialized()`](#isinitialized)
* [`initialize(...)`](#initialize)
* [`guard(...)`](#guard)
* [`createTitle(...)`](#createtitle)
* [`getTitle(...)`](#gettitle)
* [`createLicense(...)`](#createlicense)
* [`getLicense(...)`](#getlicense)
* [`getLicenses(...)`](#getlicenses)
* [`createPayable(...)`](#createpayable)
* [`getPayable(...)`](#getpayable)
* [`getPayables(...)`](#getpayables)
* [`createReceipt(...)`](#createreceipt)
* [`getReceipt(...)`](#getreceipt)
* [`getReceipts(...)`](#getreceipts)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### id()

```typescript
id() => Promise<{ id: string; }>
```

**Returns:** <code>Promise&lt;{ id: string; }&gt;</code>

--------------------


### address()

```typescript
address() => Promise<{ address: string; }>
```

**Returns:** <code>Promise&lt;{ address: string; }&gt;</code>

--------------------


### isInitialized()

```typescript
isInitialized() => Promise<{ isInitialized: boolean; }>
```

**Returns:** <code>Promise&lt;{ isInitialized: boolean; }&gt;</code>

--------------------


### initialize(...)

```typescript
initialize(options: { id: string; publishingId: string; }) => Promise<{ id: string; address: string; }>
```

| Param         | Type                                               |
| ------------- | -------------------------------------------------- |
| **`options`** | <code>{ id: string; publishingId: string; }</code> |

**Returns:** <code>Promise&lt;{ id: string; address: string; }&gt;</code>

--------------------


### guard(...)

```typescript
guard(options: { ptr: string; usecases: string[]; destinations?: string[]; }) => Promise<{ success: boolean; reason?: string; }>
```

| Param         | Type                                                                       |
| ------------- | -------------------------------------------------------------------------- |
| **`options`** | <code>{ ptr: string; usecases: string[]; destinations?: string[]; }</code> |

**Returns:** <code>Promise&lt;{ success: boolean; reason?: string; }&gt;</code>

--------------------


### createTitle(...)

```typescript
createTitle(options: { ptr: string; tags: string[]; description?: string; }) => Promise<TitleRecord>
```

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code>{ ptr: string; tags: string[]; description?: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#titlerecord">TitleRecord</a>&gt;</code>

--------------------


### getTitle(...)

```typescript
getTitle(options: { ptr: string; }) => Promise<TitleRecord>
```

| Param         | Type                          |
| ------------- | ----------------------------- |
| **`options`** | <code>{ ptr: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#titlerecord">TitleRecord</a>&gt;</code>

--------------------


### createLicense(...)

```typescript
createLicense(options: { titleId: string; uses: Use[]; terms: string; expiry?: number; description?: string; }) => Promise<LicenseRecord>
```

| Param         | Type                                                                                                 |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ titleId: string; uses: Use[]; terms: string; expiry?: number; description?: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#licenserecord">LicenseRecord</a>&gt;</code>

--------------------


### getLicense(...)

```typescript
getLicense(options: { id: string; }) => Promise<LicenseRecord>
```

| Param         | Type                         |
| ------------- | ---------------------------- |
| **`options`** | <code>{ id: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#licenserecord">LicenseRecord</a>&gt;</code>

--------------------


### getLicenses(...)

```typescript
getLicenses(options: { titleId: string; }) => Promise<LicenseRecord[]>
```

| Param         | Type                              |
| ------------- | --------------------------------- |
| **`options`** | <code>{ titleId: string; }</code> |

**Returns:** <code>Promise&lt;LicenseRecord[]&gt;</code>

--------------------


### createPayable(...)

```typescript
createPayable(options: { licenseId: string; amount: string; type: string; expiry?: number; description?: string; reference?: string; }) => Promise<PayableRecord>
```

| Param         | Type                                                                                                                         |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ licenseId: string; amount: string; type: string; expiry?: number; description?: string; reference?: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#payablerecord">PayableRecord</a>&gt;</code>

--------------------


### getPayable(...)

```typescript
getPayable(options: { id: string; }) => Promise<PayableRecord>
```

| Param         | Type                         |
| ------------- | ---------------------------- |
| **`options`** | <code>{ id: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#payablerecord">PayableRecord</a>&gt;</code>

--------------------


### getPayables(...)

```typescript
getPayables(options: { licenseId: string; }) => Promise<PayableRecord[]>
```

| Param         | Type                                |
| ------------- | ----------------------------------- |
| **`options`** | <code>{ licenseId: string; }</code> |

**Returns:** <code>Promise&lt;PayableRecord[]&gt;</code>

--------------------


### createReceipt(...)

```typescript
createReceipt(options: { payableId: string; amount: string; description?: string; reference?: string; }) => Promise<ReceiptRecord>
```

| Param         | Type                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ payableId: string; amount: string; description?: string; reference?: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#receiptrecord">ReceiptRecord</a>&gt;</code>

--------------------


### getReceipt(...)

```typescript
getReceipt(options: { id: string; }) => Promise<ReceiptRecord>
```

| Param         | Type                         |
| ------------- | ---------------------------- |
| **`options`** | <code>{ id: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#receiptrecord">ReceiptRecord</a>&gt;</code>

--------------------


### getReceipts(...)

```typescript
getReceipts(options: { payableId: string; }) => Promise<ReceiptRecord[]>
```

| Param         | Type                                |
| ------------- | ----------------------------------- |
| **`options`** | <code>{ payableId: string; }</code> |

**Returns:** <code>Promise&lt;ReceiptRecord[]&gt;</code>

--------------------


### Interfaces


#### TitleRecord

| Prop              | Type                  |
| ----------------- | --------------------- |
| **`id`**          | <code>string</code>   |
| **`hashedPtr`**   | <code>string</code>   |
| **`tags`**        | <code>string[]</code> |
| **`origin`**      | <code>string</code>   |
| **`description`** | <code>string</code>   |


#### LicenseRecord

| Prop              | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`id`**          | <code>string</code>                                 |
| **`title`**       | <code><a href="#titlerecord">TitleRecord</a></code> |
| **`uses`**        | <code>Use[]</code>                                  |
| **`terms`**       | <code>string</code>                                 |
| **`description`** | <code>string</code>                                 |
| **`expiry`**      | <code>number</code>                                 |


#### Use

| Prop               | Type                  |
| ------------------ | --------------------- |
| **`usecases`**     | <code>string[]</code> |
| **`destinations`** | <code>string[]</code> |


#### PayableRecord

| Prop              | Type                                                    |
| ----------------- | ------------------------------------------------------- |
| **`id`**          | <code>string</code>                                     |
| **`license`**     | <code><a href="#licenserecord">LicenseRecord</a></code> |
| **`amount`**      | <code>string</code>                                     |
| **`type`**        | <code>string</code>                                     |
| **`description`** | <code>string</code>                                     |
| **`expiry`**      | <code>number</code>                                     |
| **`reference`**   | <code>string</code>                                     |


#### ReceiptRecord

| Prop              | Type                                                    |
| ----------------- | ------------------------------------------------------- |
| **`id`**          | <code>string</code>                                     |
| **`payable`**     | <code><a href="#payablerecord">PayableRecord</a></code> |
| **`amount`**      | <code>string</code>                                     |
| **`description`** | <code>string</code>                                     |
| **`reference`**   | <code>string</code>                                     |


### Enums


#### CommonTags

| Members                   | Value                              |
| ------------------------- | ---------------------------------- |
| **`EMAIL_ADDRESS`**       | <code>"email_address"</code>       |
| **`PHONE_NUMBER`**        | <code>"phone_number"</code>        |
| **`PHYSICAL_ADDRESS`**    | <code>"physical_address"</code>    |
| **`CONTACT_INFO`**        | <code>"contact_info"</code>        |
| **`HEALTH`**              | <code>"health"</code>              |
| **`FITNESS`**             | <code>"fitness"</code>             |
| **`PAYMENT_INFO`**        | <code>"payment_info"</code>        |
| **`CREDIT_INFO`**         | <code>"credit_info"</code>         |
| **`FINANCIAL_INFO`**      | <code>"financial_info"</code>      |
| **`PRECISE_LOCATION`**    | <code>"precise_location"</code>    |
| **`COARSE_LOCATION`**     | <code>"coarse_location"</code>     |
| **`SENSITIVE_INFO`**      | <code>"sensitive_info"</code>      |
| **`CONTACTS`**            | <code>"contacts"</code>            |
| **`MESSAGES`**            | <code>"messages"</code>            |
| **`PHOTO_VIDEO`**         | <code>"photo_video"</code>         |
| **`AUDIO`**               | <code>"audio"</code>               |
| **`GAMEPLAY_CONTENT`**    | <code>"gameplay_content"</code>    |
| **`CUSTOMER_SUPPORT`**    | <code>"customer_support"</code>    |
| **`USER_CONTENT`**        | <code>"user_content"</code>        |
| **`BROWSING_HISTORY`**    | <code>"browsing_history"</code>    |
| **`SEARCH_HISTORY`**      | <code>"search_history"</code>      |
| **`USER_ID`**             | <code>"user_id"</code>             |
| **`DEVICE_ID`**           | <code>"device_id"</code>           |
| **`PURCHASE_HISTORY`**    | <code>"purchase_history"</code>    |
| **`PRODUCT_INTERACTION`** | <code>"product_interaction"</code> |
| **`ADVERTISING_DATA`**    | <code>"advertising_data"</code>    |
| **`USAGE_DATA`**          | <code>"usage_data"</code>          |
| **`CRASH_DATA`**          | <code>"crash_data"</code>          |
| **`PERFORMANCE_DATA`**    | <code>"performance_data"</code>    |
| **`DIAGNOSTIC_DATA`**     | <code>"diagnostic_data"</code>     |


#### CommonUsecases

| Members               | Value                          |
| --------------------- | ------------------------------ |
| **`ATTRIBUTION`**     | <code>'attribution'</code>     |
| **`RETARGETING`**     | <code>'retargeting'</code>     |
| **`PERSONALIZATION`** | <code>'personalization'</code> |
| **`AI_TRAINING`**     | <code>'ai_training'</code>     |
| **`DISTRIBUTION`**    | <code>'distribution'</code>    |
| **`ANALYTICS`**       | <code>'analytics'</code>       |
| **`SUPPORT`**         | <code>'support'</code>         |

</docgen-api>
