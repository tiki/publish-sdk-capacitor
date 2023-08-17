/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

package com.mytiki.sdk.capacitor

import android.content.Context
import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import com.mytiki.tiki_sdk_android.channel.Channel
import com.mytiki.tiki_sdk_android.trail.rsp.RspInitialize
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.async

class TikiSdk {
    private val channel: Channel = Channel()
    val trail: Trail = Trail(channel)
    val idp: Idp = Idp(channel)

    private var id: String? = null
    private var address: String? = null

    fun id(call: PluginCall) {
        val ret = JSObject()
        ret.put("id", id)
        call.resolve(ret)
    }

    fun address(call: PluginCall) {
        val ret = JSObject()
        ret.put("address", address)
        call.resolve(ret)
    }

    fun isInitialized(call: PluginCall) {
        val ret = JSObject()
        ret.put("isInitialized", address != null)
        call.resolve(ret)
    }

    fun initialize(call: PluginCall, context: Context) {
        val deferred = MainScope().async {
            val rsp: RspInitialize = channel.initialize(
                call.getString("id")!!,
                call.getString("publishingId")!!,
                context
            ).await()
            id = rsp.id
            address = rsp.address
            val ret = JSObject()
            ret.put("id", id)
            ret.put("address", address)
            call.resolve(ret)
        }
    }
}