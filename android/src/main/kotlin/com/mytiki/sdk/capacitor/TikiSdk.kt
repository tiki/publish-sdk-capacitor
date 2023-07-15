package com.mytiki.sdk.capacitor

import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "TikiSdk")
class TikiSdk : Plugin() {
    private val trail: Trail = Trail()

    @PluginMethod
    fun echo(call: PluginCall) = trail.license.echo(call)
}
