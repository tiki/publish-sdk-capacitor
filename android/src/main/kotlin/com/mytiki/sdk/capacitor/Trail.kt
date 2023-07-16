package com.mytiki.sdk.capacitor

import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import com.mytiki.tiki_sdk_android.channel.Channel
import com.mytiki.tiki_sdk_android.trail.TrailMethod
import com.mytiki.tiki_sdk_android.trail.Usecase
import com.mytiki.tiki_sdk_android.trail.req.ReqGuard
import com.mytiki.tiki_sdk_android.trail.rsp.RspGuard
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.async

class Trail(private val channel: Channel) {
    val title: Title = Title(channel)
    val license: License = License(channel)
    val payable: Payable = Payable(channel)
    val receipt: Receipt = Receipt(channel)

    fun guard(call: PluginCall) {
        val deferred = MainScope().async {
            val usecases: List<Usecase> =
                call.getArray("usecases").toList<String>().map { usecase -> Usecase.from(usecase) }
            val destinations: List<String> = call.getArray("destinations").toList()
            val rsp: RspGuard = channel.request(
                TrailMethod.GUARD,
                ReqGuard(call.getString("ptr")!!, usecases, destinations)
            ) { args ->
                RspGuard.from(args)
            }.await()
            val ret = JSObject()
            ret.put("success", rsp.success)
            ret.put("reason", rsp.reason)
            call.resolve(ret)
        }
    }
}