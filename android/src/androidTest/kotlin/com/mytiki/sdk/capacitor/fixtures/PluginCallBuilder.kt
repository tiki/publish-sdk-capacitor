/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

package com.mytiki.sdk.capacitor.fixtures

import com.getcapacitor.JSObject
import com.getcapacitor.MessageHandler
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginResult
import io.mockk.every
import io.mockk.mockk
import kotlinx.coroutines.CompletableDeferred
import org.json.JSONObject
import java.util.UUID


class PluginCallBuilder {
    val complete: CompletableDeferred<JSONObject> = CompletableDeferred()
    var req: JSObject? = null
        private set

    fun req(req: JSONObject): PluginCallBuilder {
        this.req = JSObject.fromJSONObject(req)
        return this
    }

    fun build(): PluginCall {
        val handler = mockk<MessageHandler>(relaxed = true)
        every { handler.sendResponseMessage(any(), any(), any()) }
            .answers { call ->
                val res = call.invocation.args[1] as PluginResult
                complete.complete(JSONObject(res.toString()))
            }
        return PluginCall(
            handler,
            UUID.randomUUID().toString(),
            UUID.randomUUID().toString(),
            UUID.randomUUID().toString(),
            req
        );
    }
}