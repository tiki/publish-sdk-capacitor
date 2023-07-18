/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

package com.mytiki.sdk.capacitor

import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import com.mytiki.tiki_sdk_android.channel.Channel
import com.mytiki.tiki_sdk_android.trail.TrailMethod
import com.mytiki.tiki_sdk_android.trail.Use
import com.mytiki.tiki_sdk_android.trail.Usecase
import com.mytiki.tiki_sdk_android.trail.req.ReqLicense
import com.mytiki.tiki_sdk_android.trail.req.ReqLicenseAll
import com.mytiki.tiki_sdk_android.trail.req.ReqLicenseGet
import com.mytiki.tiki_sdk_android.trail.rsp.RspLicense
import com.mytiki.tiki_sdk_android.trail.rsp.RspLicenses
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.async
import org.json.JSONArray
import org.json.JSONObject
import java.util.Date

class License(private val channel: Channel) {
    fun create(call: PluginCall) {
        val deferred = MainScope().async {
            val expiry: Long? = call.getLong("expiry")
            val uses: List<Use>? =
                call.getArray("uses").toList<JSONObject>()?.map { use ->
                    val uArray: JSONArray? = use.getJSONArray("usecases");
                    val usecases = mutableListOf<Usecase>()
                    if (uArray != null) {
                        for (i in 0 until uArray.length())
                            usecases.add(Usecase.from(uArray.getString(i)))
                    }
                    val dArray: JSONArray? = use.optJSONArray("destinations");
                    var destinations: List<String>? = null
                    if (dArray != null) {
                        destinations = mutableListOf()
                        for (i in 0 until dArray.length())
                            destinations.add(dArray.getString(i))
                    }
                    Use(usecases, destinations)
                }
            val rsp: RspLicense = channel.request(
                TrailMethod.LICENSE_CREATE,
                ReqLicense(
                    call.getString("titleId")!!,
                    uses ?: emptyList(),
                    call.getString("terms")!!,
                    if (expiry != null) Date(expiry) else null,
                    call.getString("destination")
                )
            ) { args ->
                RspLicense.from(args)
            }.await()
            call.resolve(toJS(rsp))
        }
    }

    fun get(call: PluginCall) {
        val deferred = MainScope().async {
            val rsp: RspLicense = channel.request(
                TrailMethod.LICENSE_GET,
                ReqLicenseGet(call.getString("id")!!)
            ) { args ->
                RspLicense.from(args)
            }.await()
            call.resolve(toJS(rsp))
        }
    }

    fun all(call: PluginCall) {
        val deferred = MainScope().async {
            val rsp: RspLicenses = channel.request(
                TrailMethod.LICENSE_ALL,
                ReqLicenseAll(call.getString("titleId")!!)
            ) { args ->
                RspLicenses.from(args)
            }.await()
            val licenses: List<JSObject> =
                rsp.licenses?.map { license -> toJS(license) } ?: emptyList()
            val ret = JSObject()
            ret.put("licenses", JSArray(licenses))
            call.resolve(ret)
        }
    }

    companion object {
        fun toJS(license: RspLicense): JSObject {
            val ret = JSObject()
            ret.put("id", license.id)
            ret.put("title", if (license.title != null) Title.toJS(license.title!!) else null)
            ret.put("terms", license.terms)
            ret.put("description", license.description)
            ret.put("expiry", license.expiry?.time)
            ret.put(
                "uses",
                if (license.uses != null) JSArray(license.uses?.map { use -> use.map() }) else null
            )
            return ret;
        }
    }
}