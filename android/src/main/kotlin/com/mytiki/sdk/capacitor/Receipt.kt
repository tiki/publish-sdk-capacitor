/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

package com.mytiki.sdk.capacitor

import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import com.mytiki.tiki_sdk_android.channel.Channel
import com.mytiki.tiki_sdk_android.trail.TrailMethod
import com.mytiki.tiki_sdk_android.trail.req.ReqReceipt
import com.mytiki.tiki_sdk_android.trail.req.ReqReceiptAll
import com.mytiki.tiki_sdk_android.trail.req.ReqReceiptGet
import com.mytiki.tiki_sdk_android.trail.rsp.RspReceipt
import com.mytiki.tiki_sdk_android.trail.rsp.RspReceipts
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.async

class Receipt(private val channel: Channel) {
    fun create(call: PluginCall) {
        val deferred = MainScope().async {
            val rsp: RspReceipt = channel.request(
                TrailMethod.RECEIPT_CREATE,
                ReqReceipt(
                    call.getString("payableId")!!,
                    call.getString("amount")!!,
                    call.getString("description"),
                    call.getString("reference")
                )
            ) { args ->
                RspReceipt.from(args)
            }.await()
            call.resolve(toJS(rsp))
        }
    }

    fun get(call: PluginCall) {
        val deferred = MainScope().async {
            val rsp: RspReceipt = channel.request(
                TrailMethod.RECEIPT_GET,
                ReqReceiptGet(call.getString("id")!!)
            ) { args ->
                RspReceipt.from(args)
            }.await()
            call.resolve(toJS(rsp))
        }
    }

    fun all(call: PluginCall) {
        val deferred = MainScope().async {
            val rsp: RspReceipts = channel.request(
                TrailMethod.RECEIPT_ALL,
                ReqReceiptAll(call.getString("payableId")!!)
            ) { args ->
                RspReceipts.from(args)
            }.await()
            val receipts: List<JSObject> =
                rsp.receipts?.map { receipt -> toJS(receipt) } ?: emptyList()
            val ret = JSObject()
            ret.put("receipts", JSArray(receipts))
            call.resolve(ret)
        }
    }

    companion object {
        fun toJS(receipt: RspReceipt): JSObject {
            val ret = JSObject()
            ret.put("id", receipt.id)
            ret.put(
                "payable",
                if (receipt.payable != null) Payable.toJS(receipt.payable!!) else null
            )
            ret.put("amount", receipt.amount)
            ret.put("description", receipt.description)
            ret.put("reference", receipt.reference)
            ret.put("timestamp", receipt.timestamp?.time)
            return ret;
        }
    }
}