package com.mytiki.sdk.capacitor

import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall

class License {
    fun echo(call: PluginCall) {
        val value: Int = call.getInt("value") ?: 0
        val ret = JSObject()
        ret.put("value", value + 1)
        call.resolve(ret)
    }
}
