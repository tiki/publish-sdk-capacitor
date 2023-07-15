package com.mytiki.sdk.capacitor

import com.getcapacitor.PluginCall
import com.mytiki.tiki_sdk_android.channel.Channel

class Trail(private val channel: Channel) {
    val title: Title = Title(channel)
    val license: License = License(channel)
    val payable: Payable = Payable(channel)
    val receipt: Receipt = Receipt(channel)

    fun id(call: PluginCall) {}
    fun address(call: PluginCall) {}
    fun guard(call: PluginCall) {}
}