package com.mytiki.sdk.capacitor

import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import com.mytiki.tiki_sdk_android.channel.Channel
import com.mytiki.tiki_sdk_android.trail.rsp.RspLicense

class Receipt(private val channel: Channel) {
    fun create(call: PluginCall) {}
    fun get(call: PluginCall) {}
    fun all(call: PluginCall) {}

    private fun toJS(license: RspLicense): JSObject {}
}