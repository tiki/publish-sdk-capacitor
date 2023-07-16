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
import com.mytiki.tiki_sdk_android.trail.req.ReqPayable
import com.mytiki.tiki_sdk_android.trail.req.ReqPayableAll
import com.mytiki.tiki_sdk_android.trail.req.ReqPayableGet
import com.mytiki.tiki_sdk_android.trail.rsp.RspPayable
import com.mytiki.tiki_sdk_android.trail.rsp.RspPayables
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.async
import java.util.Date

class Payable(private val channel: Channel) {
    fun create(call: PluginCall) {
        val deferred = MainScope().async {
            val expiry: Long? = call.getLong("expiry")
            val rsp: RspPayable = channel.request(
                TrailMethod.PAYABLE_CREATE,
                ReqPayable(
                    call.getString("licenseId")!!,
                    call.getString("amount")!!,
                    call.getString("type")!!,
                    if (expiry != null) Date(expiry) else null,
                    call.getString("description"),
                    call.getString("reference")
                )
            ) { args ->
                RspPayable.from(args)
            }.await()
            call.resolve(toJS(rsp))
        }
    }

    fun get(call: PluginCall) {
        val deferred = MainScope().async {
            val rsp: RspPayable = channel.request(
                TrailMethod.PAYABLE_GET,
                ReqPayableGet(call.getString("id")!!)
            ) { args ->
                RspPayable.from(args)
            }.await()
            call.resolve(toJS(rsp))
        }
    }

    fun all(call: PluginCall) {
        val deferred = MainScope().async {
            val rsp: RspPayables = channel.request(
                TrailMethod.PAYABLE_ALL,
                ReqPayableAll(call.getString("licenseId")!!)
            ) { args ->
                RspPayables.from(args)
            }.await()
            val payables: List<JSObject> =
                rsp.payables?.map { payable -> toJS(payable) } ?: emptyList()
            val ret = JSObject()
            ret.put("payables", JSArray(payables))
            call.resolve(ret)
        }
    }

    companion object {
        fun toJS(payable: RspPayable): JSObject {
            val ret = JSObject()
            ret.put("id", payable.id)
            ret.put(
                "license",
                if (payable.license != null) License.toJS(payable.license!!) else null
            )
            ret.put("amount", payable.amount)
            ret.put("type", payable.type)
            ret.put("description", payable.description)
            ret.put("expiry", payable.expiry?.time)
            ret.put("reference", payable.reference)
            return ret;
        }
    }
}