package com.mytiki.sdk.capacitor

import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "TikiSdk")
class TikiSdkPlugin : Plugin() {
    private val tiki: TikiSdk = TikiSdk()

    @PluginMethod
    fun id(call: PluginCall) = tiki.id(call)

    @PluginMethod
    fun address(call: PluginCall) = tiki.address(call)

    @PluginMethod
    fun initialize(call: PluginCall) = tiki.initialize(call, context)

    @PluginMethod
    fun isInitialized(call: PluginCall) = tiki.isInitialized(call)

    @PluginMethod
    fun guard(call: PluginCall) = tiki.trail.guard(call)

    @PluginMethod
    fun createTitle(call: PluginCall) = tiki.trail.title.create(call)

    @PluginMethod
    fun getTitle(call: PluginCall) = tiki.trail.title.get(call)

    @PluginMethod
    fun createLicense(call: PluginCall) = tiki.trail.license.create(call)

    @PluginMethod
    fun getLicense(call: PluginCall) = tiki.trail.license.get(call)

    @PluginMethod
    fun getLicenses(call: PluginCall) = tiki.trail.license.all(call)

    @PluginMethod
    fun createPayable(call: PluginCall) = tiki.trail.payable.create(call)

    @PluginMethod
    fun getPayable(call: PluginCall) = tiki.trail.payable.get(call)

    @PluginMethod
    fun getPayables(call: PluginCall) = tiki.trail.payable.all(call)

    @PluginMethod
    fun createReceipt(call: PluginCall) = tiki.trail.receipt.create(call)

    @PluginMethod
    fun getReceipt(call: PluginCall) = tiki.trail.receipt.get(call)

    @PluginMethod
    fun getReceipts(call: PluginCall) = tiki.trail.receipt.all(call)
}