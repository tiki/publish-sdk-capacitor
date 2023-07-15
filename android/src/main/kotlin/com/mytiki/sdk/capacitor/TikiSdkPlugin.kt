package com.mytiki.sdk.capacitor

import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.mytiki.tiki_sdk_android.channel.Channel

@CapacitorPlugin(name = "TikiSdk")
class TikiSdkPlugin : Plugin() {
    private val channel: Channel = Channel()
    private val trail: Trail = Trail(channel)

    @PluginMethod
    fun createTitle(call: PluginCall) = trail.title.create(call)

    @PluginMethod
    fun getTitle(call: PluginCall) = trail.title.get(call)

    fun initialize(call: PluginCall) {}
    fun isInitialized(call: PluginCall) {}
}