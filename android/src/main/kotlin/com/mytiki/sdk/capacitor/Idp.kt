/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

package com.mytiki.sdk.capacitor

import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import com.mytiki.tiki_sdk_android.channel.Channel
import com.mytiki.tiki_sdk_android.channel.req.ReqDefault
import com.mytiki.tiki_sdk_android.idp.IdpMethod
import com.mytiki.tiki_sdk_android.idp.rsp.RspToken
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.async

class Idp(private val channel: Channel) {
    fun token(call: PluginCall) {
        val deferred = MainScope().async {
            val rsp: RspToken = channel.request(IdpMethod.TOKEN, ReqDefault()) { args ->
                RspToken.from(args)
            }.await()
            val ret = JSObject()
            ret.put("accessToken", rsp.accessToken)
            ret.put("tokenType", rsp.tokenType)
            ret.put("expires", rsp.expires?.time)
            ret.put("refreshToken", rsp.refreshToken)
            ret.put("scope", JSArray.from(rsp.scope ?: emptyArray<String>()))
            call.resolve(ret)
        }
    }
}