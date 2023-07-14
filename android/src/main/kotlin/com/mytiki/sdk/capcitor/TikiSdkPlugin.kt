package com.mytiki.sdk.capcitor

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "TikiSdk")
class TikiSdkPlugin : Plugin() {
    private val implementation: TikiSdkCjs = TikiSdkCjs()
    @PluginMethod
    fun echo(call: PluginCall) {
        val value: String = call.getString("value") ?: ""
        val ret = JSObject()
        ret.put("value", implementation.echo(value))
        call.resolve(ret)
    }
}
