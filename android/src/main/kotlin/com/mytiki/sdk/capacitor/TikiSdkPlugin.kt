package com.mytiki.sdk.capacitor

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "TikiSdk")
class TikiSdkPlugin : Plugin() {
    private val trail: Trail = Trail()

    @PluginMethod
    fun createTitle(call: PluginCall) = trail.title.create(call)
    @PluginMethod
    fun getTitle(call: PluginCall) = trail.title.get(call)
}