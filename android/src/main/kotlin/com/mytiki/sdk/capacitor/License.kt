package com.mytiki.sdk.capacitor

import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall

class License {
    fun echo(call: PluginCall) {
        val value = call.getString("value")
        val ret = JSObject()
        ret.put("value", value)
        call.resolve(ret)
    }
}