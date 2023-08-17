/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

package com.mytiki.sdk.capacitor

import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import com.mytiki.tiki_sdk_android.channel.Channel
import com.mytiki.tiki_sdk_android.trail.Tag
import com.mytiki.tiki_sdk_android.trail.TrailMethod
import com.mytiki.tiki_sdk_android.trail.req.ReqTitle
import com.mytiki.tiki_sdk_android.trail.req.ReqTitleGet
import com.mytiki.tiki_sdk_android.trail.rsp.RspTitle
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.async

class Title(private val channel: Channel) {
    fun create(call: PluginCall) {
        val deferred = MainScope().async {
            val tags: List<Tag> =
                call.getArray("tags").toList<String>().map { tag -> Tag.from(tag) }
            val title: RspTitle = channel.request(
                TrailMethod.TITLE_CREATE,
                ReqTitle(
                    call.getString("ptr")!!,
                    tags,
                    call.getString("description")
                )
            )
            { args ->
                RspTitle.from(args)
            }.await()
            call.resolve(toJS(title))
        }
    }

    fun get(call: PluginCall) {
        val deferred = MainScope().async {
            val title: RspTitle = channel.request(
                TrailMethod.TITLE_GET,
                ReqTitleGet(call.getString("ptr")!!)
            )
            { args ->
                RspTitle.from(args)
            }.await()
            call.resolve(toJS(title))
        }
    }

    companion object {
        fun toJS(title: RspTitle): JSObject {
            val ret = JSObject()
            ret.put("id", title.id)
            ret.put("hashedPtr", title.hashedPtr)
            ret.put("origin", title.origin)
            ret.put("description", title.description)
            val tags: List<String>? = title.tags?.map { tag -> tag.value }
            ret.put("tags", if (tags != null) JSArray(tags) else null)
            ret.put("timestamp", title.timestamp?.time)
            return ret;
        }
    }
}